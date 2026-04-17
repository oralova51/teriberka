import { useId, type FormEvent } from "react";
import { Button } from "../../../shared/ui/Button";
import { CloseIcon } from "../../../shared/ui/CloseIcon";
import { IconButton } from "../../../shared/ui/IconButton";
import { Input } from "../../../shared/ui/Input";
import type { UseVirtualAssistantChatOptions } from "../model/types";
import { useVirtualAssistantChat } from "../model/useVirtualAssistantChat";
import styles from "./VirtualAssistantChat.module.css";

export type VirtualAssistantChatProps = UseVirtualAssistantChatOptions;

export function VirtualAssistantChat(props: VirtualAssistantChatProps) {
  const titleId = useId();
  const {
    phase,
    messages,
    inputValue,
    assistantName,
    isAssistantTyping,
    close,
    sendMessage,
    setInputValue,
  } = useVirtualAssistantChat(props);

  if (phase !== "visible") {
    return null;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage();
  };


  return (
    <div
      className={styles.root}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className={styles.header}>
        <img src='/photo_2026-04-17 15.03.17.jpeg' className={styles.avatar}></img>
        <h2 className={styles.title} id={titleId}>
          {assistantName}
        </h2>
        <IconButton
          type="button"
          className={styles.close}
          aria-label="Закрыть чат"
          onClick={close}
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
          onChange={(event) => setInputValue(event.target.value)}
        />
        <Button type="submit" className={styles.send} disabled={isAssistantTyping}>
          {isAssistantTyping ? "Печатает..." : "Отправить"}
        </Button>
      </form>
    </div>
  );
}
