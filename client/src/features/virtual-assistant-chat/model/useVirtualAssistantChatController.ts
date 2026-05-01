import { useEffect, useState } from "react";
import type { VirtualAssistantChatPhase } from "./types";

const MOBILE_BREAKPOINT_PX = 950;
const MOBILE_MEDIA_QUERY = `(max-width: ${MOBILE_BREAKPOINT_PX - 0.02}px)`;

function getIsMobileViewport() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(MOBILE_MEDIA_QUERY).matches;
}

export function useVirtualAssistantChatController(phase: VirtualAssistantChatPhase) {
  const [isMobileViewport, setIsMobileViewport] = useState(() =>
    getIsMobileViewport(),
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobileViewport(event.matches);
    };

    setIsMobileViewport(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (phase !== "visible") {
      setIsModalOpen(false);
      return;
    }

    if (!isMobileViewport) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [isMobileViewport, phase]);

  return {
    isMobileViewport,
    isModalOpen,
    openModal: () => setIsModalOpen(true),
    closeModal: () => setIsModalOpen(false),
  };
}
