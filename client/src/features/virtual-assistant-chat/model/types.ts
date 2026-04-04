export type ChatResponse = {
  data: {
    data: ChatMessage,
    error: Error | null;
    statusCode: number;
    message: string | null;
  };
};

export type ChatMessageRole = "user" | "assistant";

export type ChatMessage = {
  content: string;
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
