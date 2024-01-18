import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import { Bot } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

type MessageProps = {
  message: Pick<Message, "role" | "content">;
};

export default function ChatMessage({
  message: { role, content },
}: MessageProps) {
  const { data: session } = useSession();
  const isAIMsg = role === "assistant";

  return (
    <div
      className={cn(
        "mb-3 flex items-center",
        isAIMsg ? "me-5 justify-start" : "me-5 justify-end",
      )}
    >
      {isAIMsg && <Bot className="mr-2 shrink-0" />}
      <p
        className={cn(
          "whitespace-pre-line rounded-md border px-1 py-2",
          isAIMsg ? "bg-secondary" : "bg-primary text-primary-foreground",
        )}
      >
        {content}
      </p>
      {!isAIMsg && session?.user.image && (
        <Image
          src={session.user.image}
          alt="User Image"
          width={100}
          height={100}
          className="ml-2 h-10 w-10 rounded-full object-cover"
        />
      )}
    </div>
  );
}
