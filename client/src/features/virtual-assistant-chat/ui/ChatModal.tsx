import { useId, type FormEvent } from "react";
import { Button } from "../../../shared/ui/Button";
import { CloseIcon } from "../../../shared/ui/CloseIcon";
import { IconButton } from "../../../shared/ui/IconButton";
import { Input } from "../../../shared/ui/Input";
import type { ChatMessage } from "../model/types";
import styles from "./VirtualAssistantChat.module.css";

type ChatModalProps = {
  assistantName: string;
  messages: ChatMessage[];
  inputValue: string;
  isAssistantTyping: boolean;
  onClose: () => void;
  onSendMessage: () => Promise<void>;
  onInputChange: (value: string) => void;
};

export function ChatModal({
  assistantName,
  messages,
  inputValue,
  isAssistantTyping,
  onClose,
  onSendMessage,
  onInputChange,
}: ChatModalProps) {
  const titleId = useId();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void onSendMessage();
  };

  return (
    <div
      className={styles.root}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className={styles.header}>
        <img
          src="/photo_2026-04-17 15.03.17.jpeg"
          className={styles.avatar}
          alt="Аватар ассистента"
        />
        <h2 className={styles.title} id={titleId}>
          {assistantName}
        </h2>
        <IconButton
          type="button"
          className={styles.close}
          aria-label="Закрыть чат"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </div>

      <div className={styles.messages}>
        {messages.length === 0 ? (
          <p className={styles.empty}>
            Напишите сообщение — ассистент ответит автоматически (демо-режим).
          </p>
        ) : (
          <ul className={styles.list}>
            {messages.map((message) => (
              <li
                key={message.id}
                className={[
                  styles.bubble,
                  message.role === "user"
                    ? styles.bubbleUser
                    : styles.bubbleAssistant,
                ].join(" ")}
              >
                {message.content}
              </li>
            ))}
            {isAssistantTyping && (
              <li className={[styles.bubble, styles.bubbleAssistant].join(" ")}>
                <span className={styles.typing}>Леви печатает...</span>
              </li>
            )}
          </ul>
        )}
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          className={styles.field}
          value={inputValue}
          placeholder="Ваше сообщение…"
          autoComplete="off"
          aria-label="Текст сообщения"
          disabled={isAssistantTyping}
          onChange={(event) => onInputChange(event.target.value)}
        />
        <Button type="submit" className={styles.send} disabled={isAssistantTyping}>
          {isAssistantTyping ? "Печатает..." : "Отправить"}
        </Button>
      </form>
    </div>
  );
}
