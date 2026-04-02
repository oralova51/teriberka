export type ChatMessageRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatMessageRole;
  text: string;
  createdAt: number;
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
