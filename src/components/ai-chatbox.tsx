"use client";

import { cn } from "@/lib/utils";
import { useChat } from "ai/react";

type AIChatBoxProps = {
  open: boolean;
  onClose: () => void;
};

function AIChatBox({ open, onClose }: AIChatBoxProps) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat();

  return (
    <>
      <div
        className={cn(
          "bottom-0 right-0 z-10 w-full max-w-[500px] p-1 xl:right-36",
          open ? "fixed" : "hidden",
        )}
      >
        Chatbox
      </div>
    </>
  );
}

export default AIChatBox;
