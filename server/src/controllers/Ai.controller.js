const formatResponse = require("../utils/formatResponse");
const AIService = require("../services/AI.service");

const MAX_SESSION_ID_LENGTH = 128;

/**
 * Контроллер для анонимного AI-ассистента чата студии красоты.
 * Без аутентификации и без записи в БД; опциональный sessionId связывает
 * сообщения в рамках одной сессии в памяти сервера.
 */
class AiController {
  /**
   * GET /api/ai/history?sessionId=...
   * Возвращает историю сообщений для анонимной сессии (только из памяти).
   */
  static getChatHistory(req, res) {
    const sessionId = req.query.sessionId;

    if (!sessionId || typeof sessionId !== "string") {
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            "Укажите sessionId в query",
            null,
            "sessionId is required",
          ),
        );
    }

    const trimmed = sessionId.trim();
    if (!trimmed) {
      return res
        .status(400)
        .json(
          formatResponse(400, "sessionId не может быть пустым", null, "sessionId empty"),
        );
    }

    if (trimmed.length > MAX_SESSION_ID_LENGTH) {
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            `sessionId не длиннее ${MAX_SESSION_ID_LENGTH} символов`,
            null,
            "sessionId too long",
          ),
        );
    }

    const messages = AIService.getSessionHistory(trimmed);
    return res
      .status(200)
      .json(formatResponse(200, "История чата", { messages }, null));
  }

  /**
   * POST /api/ai/chat
   * Тело: { message: string, sessionId?: string }
   * sessionId генерирует клиент (например UUID), чтобы сохранялся контекст в памяти.
   */
  static async sendMessage(req, res) {
    const { message, sessionId } = req.body;

    if (!message || typeof message !== "string") {
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            "Сообщение обязательно и должно быть строкой",
            null,
            "message is required",
          ),
        );
    }

    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            "Сообщение не может быть пустым",
            null,
            "message must not be empty",
          ),
        );
    }

    const MAX_MESSAGE_LENGTH = 2000;
    if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            `Сообщение не должно превышать ${MAX_MESSAGE_LENGTH} символов`,
            null,
            "message too long",
          ),
        );
    }

    let effectiveSessionId;
    if (sessionId !== undefined && sessionId !== null) {
      if (typeof sessionId !== "string") {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              "sessionId должен быть строкой",
              null,
              "sessionId must be a string",
            ),
          );
      }
      const trimmedSid = sessionId.trim();
      if (!trimmedSid) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              "sessionId не может быть пустой строкой",
              null,
              "sessionId must not be empty",
            ),
          );
      }
      if (trimmedSid.length > MAX_SESSION_ID_LENGTH) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              `sessionId не длиннее ${MAX_SESSION_ID_LENGTH} символов`,
              null,
              "sessionId too long",
            ),
          );
      }
      effectiveSessionId = trimmedSid;
    }

    try {
      const assistantContent = await AIService.chat(trimmedMessage, effectiveSessionId);

      return res
        .status(200)
        .json(
          formatResponse(200, "Ответ получен", { content: assistantContent }, null),
        );
    } catch (error) {
      console.error("==== AiController.sendMessage ====");
      console.error(error);
      return res
        .status(500)
        .json(
          formatResponse(
            500,
            "Ошибка при обработке сообщения",
            null,
            error.message,
          ),
        );
    }
  }
}

module.exports = AiController;
