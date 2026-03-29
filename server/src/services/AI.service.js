const axios = require('axios');
const https = require('https');
const oAuth = require('../utils/gigaChatAuth');
const { gigaChatUrl } = require('../configs/aiConfig');

const SYSTEM_PROMPT = `
Ты — виртуальный гид по имени Леви, помогаешь клиентам проконсультироваться по путешествую в Териберку.
`;

/** Максимум сообщений (user+assistant) на одну анонимную сессию в памяти */
const MAX_MESSAGES_PER_SESSION = 40;
/** Ограничение числа активных сессий, чтобы не раздувать RAM */
const MAX_SESSIONS = 2000;

/** @type {Map<string, Array<{ role: string, content: string }>>} */
const sessions = new Map();

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

function evictOldestSessionIfNeeded() {
  while (sessions.size >= MAX_SESSIONS) {
    const firstKey = sessions.keys().next().value;
    if (firstKey === undefined) break;
    sessions.delete(firstKey);
  }
}

function getOrCreateSession(sessionId) {
  if (!sessionId) return null;
  if (!sessions.has(sessionId)) {
    evictOldestSessionIfNeeded();
    sessions.set(sessionId, []);
  }
  return sessions.get(sessionId);
}

function trimHistory(history) {
  if (history.length <= MAX_MESSAGES_PER_SESSION) return history;
  return history.slice(history.length - MAX_MESSAGES_PER_SESSION);
}

class AIService {
  /**
   * История чата для анонимной сессии (только в памяти процесса).
   * @param {string} sessionId
   * @returns {Array<{ role: string, content: string }>}
   */
  static getSessionHistory(sessionId) {
    if (!sessionId || typeof sessionId !== 'string') return [];
    const list = sessions.get(sessionId);
    return list ? [...list] : [];
  }

  /**
   * @param {string} userMessage
   * @param {string | undefined} sessionId — опционально; без него запрос без контекста и без сохранения в памяти
   * @returns {Promise<string>}
   */
  static async chat(userMessage, sessionId) {
    const history = sessionId ? trimHistory(getOrCreateSession(sessionId) || []) : [];

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.map(({ role, content }) => ({ role, content })),
      { role: 'user', content: userMessage },
    ];

    const tokenData = await oAuth();
    const access_token = tokenData?.access_token;
    if (!access_token) {
      const errMsg =
        tokenData?.message || tokenData?.response?.data || 'Не удалось получить токен GigaChat';
      throw new Error(typeof errMsg === 'string' ? errMsg : JSON.stringify(errMsg));
    }

    const response = await axios.post(
      gigaChatUrl,
      { model: 'GigaChat', messages },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        httpsAgent,
      },
    );

    const assistantContent = response.data.choices[0].message.content;

    if (sessionId) {
      const list = getOrCreateSession(sessionId);
      if (list) {
        list.push({ role: 'user', content: userMessage });
        list.push({ role: 'assistant', content: assistantContent });
        sessions.set(sessionId, trimHistory(list));
      }
    }

    return assistantContent;
  }
}

module.exports = AIService;
