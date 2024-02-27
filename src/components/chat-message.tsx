"use client";

import { cn } from "~/lib/utils";
import { Message } from "ai/react";
import { Bot } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { If } from "~/utils/if";

type MessageProps = {
  message: Pick<Message, "role" | "content">;
};

export default function ChatMessage({ message }: MessageProps) {
  const { data: session } = useSession();
  const isAIMsg = message.role === "assistant";

  return (
    <div
      className={cn(
        "mb-3 flex items-center",
        isAIMsg ? "me-5 justify-start" : "me-5 justify-end",
      )}
    >
      <If isTrue={isAIMsg}>
        <Bot className="mr-2 shrink-0" />
      </If>
      <p
        className={cn(
          "whitespace-pre-line rounded-md border px-1 py-2",
          isAIMsg ? "bg-secondary" : "bg-primary text-primary-foreground",
        )}
      >
        {message.content}
      </p>

      <If isTrue={(!isAIMsg && session?.user.image) as boolean}>
        <Image
          src={session?.user.image!}
          alt="User Image"
          width={100}
          height={100}
          className="ml-2 h-10 w-10 rounded-full object-cover"
        />
      </If>
    </div>
  );
}
