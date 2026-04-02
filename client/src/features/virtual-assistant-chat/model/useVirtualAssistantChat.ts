import { useCallback, useEffect, useState } from "react";
import type {
  ChatMessage,
  UseVirtualAssistantChatOptions,
  VirtualAssistantChatPhase,
} from "./types";

const DEFAULT_OPEN_DELAY_MS = 10_000;
const DEFAULT_ASSISTANT_NAME = "Ассистент Териберки";
const DEFAULT_STUB_REPLY =
  "Спасибо за сообщение! Я виртуальный помощник и пока отвечаю шаблоном — скоро здесь будет полноценный ответ.";

function createMessage(
  role: ChatMessage["role"],
  text: string,
): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role,
    text,
    createdAt: Date.now(),
  };
}

export function useVirtualAssistantChat(
  options: UseVirtualAssistantChatOptions = {},
) {
  const {
    assistantName = DEFAULT_ASSISTANT_NAME,
    stubReply = DEFAULT_STUB_REPLY,
    openDelayMs = DEFAULT_OPEN_DELAY_MS,
  } = options;

  const [phase, setPhase] = useState<VirtualAssistantChatPhase>("waiting");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setPhase((previous) =>
        previous === "waiting" ? "visible" : previous,
      );
    }, openDelayMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [openDelayMs]);

  const close = useCallback(() => {
    setPhase("dismissed");
  }, []);

  const sendMessage = useCallback(() => {
    const trimmed = inputValue.trim();
    if (trimmed === "") {
      return;
    }

    setMessages((previous) => [
      ...previous,
      createMessage("user", trimmed),
      createMessage("assistant", stubReply),
    ]);
    setInputValue("");
  }, [inputValue, stubReply]);

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  return {
    phase,
    messages,
    inputValue,
    assistantName,
    close,
    sendMessage,
    setInputValue: handleInputChange,
  };
}
