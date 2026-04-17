import { useCallback, useEffect, useState } from "react";
import type {
  ChatMessage,
  UseVirtualAssistantChatOptions,
  VirtualAssistantChatPhase,
  ChatAPIBody,
} from "./types";
import { axiosInstance } from "../../../shared/lib/axiosInstance";

const DEFAULT_OPEN_DELAY_MS = 1_000;
const DEFAULT_ASSISTANT_NAME = "Проводник по Териберке";
const DEFAULT_STUB_REPLY =
  "Привет, странник! Я Леви, виртуальный гид по Териберке. Чем могу я помочь тебе?";
const TYPING_CHAR_DELAY_MS = 24;

function createMessage(
  role: ChatMessage["role"],
  content: string,
): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
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
  const [isAssistantTyping, setIsAssistantTyping] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setPhase((previous) =>
        previous === "waiting" ? "visible" : previous,
      );
      setMessages((previous) => [
        ...previous,
        createMessage("assistant", stubReply),
      ]);
    }, openDelayMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [openDelayMs]);


  const close = useCallback(() => {
    setPhase("dismissed");
  }, []);

  const typeAssistantMessage = useCallback(async (text: string) => {
    const assistantMessageId = crypto.randomUUID();
    const createdAt = Date.now();
    const fullText = text.trim();

    setMessages((previous) => [
      ...previous,
      {
        id: assistantMessageId,
        role: "assistant",
        content: "",
        createdAt,
      },
    ]);

    for (let index = 1; index <= fullText.length; index += 1) {
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, TYPING_CHAR_DELAY_MS);
      });

      setMessages((previous) =>
        previous.map((message) =>
          message.id === assistantMessageId
            ? { ...message, content: fullText.slice(0, index) }
            : message,
        ),
      );
    }
  }, []);

  const sendMessage = useCallback(async () => {
    const trimmed = inputValue.trim();
    if (trimmed === "" || isAssistantTyping) {
      return;
    }

    setMessages((previous) => [
      ...previous,
      createMessage("user", trimmed),
    ]);

    setInputValue("");
    setIsAssistantTyping(true);

    try {
      const response = await axiosInstance.post<ChatAPIBody>("/ai/chat", {
        message: trimmed,
      });
      await typeAssistantMessage(response.data.data?.content ?? stubReply);
    } catch (error) {
      console.error(error);
      await typeAssistantMessage(
        "Не получилось получить ответ. Попробуйте отправить сообщение еще раз.",
      );
    } finally {
      setIsAssistantTyping(false);
    }
  }, [inputValue, isAssistantTyping, stubReply, typeAssistantMessage]);

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  return {
    phase,
    messages,
    inputValue,
    assistantName,
    isAssistantTyping,
    close,
    sendMessage,
    setInputValue: handleInputChange,
  };
}
