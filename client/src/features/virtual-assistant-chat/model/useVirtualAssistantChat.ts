import { useCallback, useEffect, useState } from "react";
import type {
  ChatMessage,
  UseVirtualAssistantChatOptions,
  VirtualAssistantChatPhase,
  ChatAPIBody,
} from "./types";
import type { AxiosResponse } from "axios";
import { axiosInstance } from "../../../shared/lib/axiosInstance";

const DEFAULT_OPEN_DELAY_MS = 1_000;
const DEFAULT_ASSISTANT_NAME = "Ассистент Териберки";
const DEFAULT_STUB_REPLY =
  "Привет, странник! Я Леви, виртуальный гид по Териберке. Чем могу я помочь тебе?";

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

  const sendMessage = useCallback(() => {
    const trimmed = inputValue.trim();
    if (trimmed === "") {
      return;
    }

    setMessages((previous) => [
      ...previous,
      createMessage("user", trimmed),
    ]);
    axiosInstance.post<ChatAPIBody>("/ai/chat", {
      message: trimmed,
    })
    .then((response: AxiosResponse<ChatAPIBody>) => {
      setMessages((previous) => [
        ...previous,
        createMessage("assistant", response.data.data?.content ?? ""),
      ]);
    })
    .catch((error: Error) => {
      console.error(error);
    })

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
