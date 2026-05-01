import type { UseVirtualAssistantChatOptions } from "../model/types";
import { useVirtualAssistantChat } from "../model/useVirtualAssistantChat";
import { useVirtualAssistantChatController } from "../model/useVirtualAssistantChatController";
import { ChatLauncher } from "./ChatLauncher";
import { ChatModal } from "./ChatModal";

export type VirtualAssistantChatProps = UseVirtualAssistantChatOptions;

export function VirtualAssistantChat(props: VirtualAssistantChatProps) {
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
  const { isMobileViewport, isModalOpen, openModal, closeModal } =
    useVirtualAssistantChatController(phase);

  if (phase !== "visible") {
    return null;
  }

  const handleClose = () => {
    if (isMobileViewport) {
      closeModal();
      return;
    }
    close();
  };

  return (
    <>
      {isMobileViewport && <ChatLauncher onOpen={openModal} />}
      {isModalOpen && (
        <ChatModal
          assistantName={assistantName}
          messages={messages}
          inputValue={inputValue}
          isAssistantTyping={isAssistantTyping}
          onClose={handleClose}
          onSendMessage={sendMessage}
          onInputChange={setInputValue}
        />
      )}
    </>
  );
}
