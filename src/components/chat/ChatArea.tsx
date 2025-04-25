
import { useChatStore } from "@/store/chat-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const ChatArea = () => {
  const { selectedNPC } = useChatStore();
  const [message, setMessage] = useState("");

  const isDisabled = !selectedNPC;

  return (
    <div className="flex-1 flex flex-col h-full bg-secondary p-4">
      {!selectedNPC ? (
        <div className="flex-1 flex items-center justify-center text-center p-8">
          <div className="max-w-md space-y-4">
            <h2 className="text-2xl font-semibold text-gray-700">Welcome to Fantasy Chat</h2>
            <p className="text-gray-600">
              Select or create a project, chapter, and NPC to start your conversation.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 mb-4">
            {/* Chat messages will go here */}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isDisabled}
            />
            <Button disabled={isDisabled || !message}>Send</Button>
          </div>
        </>
      )}
    </div>
  );
};
