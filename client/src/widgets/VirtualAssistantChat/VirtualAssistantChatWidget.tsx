import { VirtualAssistantChat } from "../../features/virtual-assistant-chat";

/**
 * Виджет уровня страницы: подключает фичу виртуального ассистента без дополнительной логики.
 * При необходимости сюда можно добавить пропсы маршрута, A/B-флаги и т.д.
 */
export function VirtualAssistantChatWidget() {
  return <VirtualAssistantChat />;
}
