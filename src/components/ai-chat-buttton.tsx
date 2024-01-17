import { useState } from "react";
import AIChatBox from "./ai-chatbox";
import { Button } from "./ui/button";
import { Bot } from "lucide-react";

function AIChatButton() {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  return (
    <>
      <Button>
        <Bot size={20} className="mr-2" onClick={() => setChatBoxOpen(true)} />
        AI Chat
      </Button>
      <AIChatBox open={chatBoxOpen} onClose={() => setChatBoxOpen(false)} />
    </>
  );
}

export default AIChatButton;
