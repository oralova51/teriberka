import styles from "./VirtualAssistantChat.module.css";

type ChatLauncherProps = {
  onOpen: () => void;
};

export function ChatLauncher({ onOpen }: ChatLauncherProps) {
  return (
    <button
      type="button"
      className={styles.launcher}
      aria-label="Открыть чат с ассистентом"
      onClick={onOpen}
    >
      ?
    </button>
  );
}
