export type ChatResponse<T> = {
    data: T | null,
    error: string | null;
    statusCode: number;
    message: string | null;
};

export type ChatResponseData = {
  content: string;
};

export type ChatAPIBody= ChatResponse<ChatResponseData>;

export type ChatMessageRole = "user" | "assistant";

export type ChatMessage = {
  content: string;
  role: ChatMessageRole;
  createdAt: number;
  id: string;
};

export type VirtualAssistantChatPhase = "waiting" | "visible" | "dismissed";

export type UseVirtualAssistantChatOptions = {
  /** Имя ассистента в шапке чата */
  assistantName?: string;
  /** Текст автоответа-заглушки после сообщения пользователя */
  stubReply?: string;
  /** Задержка появления чата после монтирования, мс */
  openDelayMs?: number;
};
