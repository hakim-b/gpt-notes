"use client";

import { cn } from "~/lib/utils";
import { useChat } from "ai/react";
import { Bot, Trash, XCircle } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ChatMessage from "./chat-message";
import { useEffect, useRef } from "react";

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
  } = useChat(); // request to /api/chat

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const lastMsgFromUser = messages.at(-1)?.role === "user";

  return (
    <>
      <div
        className={cn(
          "bottom-0 right-0 z-10 w-full max-w-[500px] p-1 xl:right-36",
          open ? "fixed" : "hidden",
        )}
      >
        <div className="relative flex h-[600px] flex-col rounded-lg border bg-background shadow-xl">
          <button onClick={onClose} className="ms-auto block">
            <XCircle size={30} />
          </button>
          <div className="mt-3 h-full overflow-y-auto px-3" ref={scrollRef}>
            {messages.map((message) => (
              <ChatMessage message={message} key={message.id} />
            ))}
            {isLoading && lastMsgFromUser && (
              <>
                <ChatMessage
                  message={{ role: "assistant", content: "Thinking..." }}
                />
              </>
            )}
            {error && (
              <ChatMessage
                message={{
                  role: "assistant",
                  content: "Something went wrong. Please try again.",
                }}
              />
            )}
            {!error && messages.length === 0 && (
              <div className="flex h-full items-center justify-center gap-3">
                <Bot />
                Ask the AI a question about your notes
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="m-3 flex gap-1">
            <Button
              title="Clear chat"
              variant="destructive"
              size="icon"
              className="shrink-0"
              type="button"
              onClick={() => setMessages([])}
            >
              <Trash />
            </Button>
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Say something..."
              ref={inputRef}
            />
            <Button type="submit">Send</Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AIChatBox;
