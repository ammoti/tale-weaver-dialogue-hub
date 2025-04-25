
import { useChatStore } from "@/store/chat-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Gamepad, SendHorizontal } from "lucide-react";

export const ChatArea = () => {
  const { selectedNPC } = useChatStore();
  const [message, setMessage] = useState("");

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1A1F2C] bg-opacity-95 p-4">
      {!selectedNPC ? (
        <div className="flex-1 flex items-center justify-center text-center p-8">
          <div className="max-w-md space-y-6 animate-fade-in">
            <div className="flex justify-center">
              <Gamepad className="w-16 h-16 text-[#9b87f5]" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#D946EF] bg-clip-text text-transparent">
              Welcome to Fantasy Chat
            </h2>
            <p className="text-gray-400 text-lg">
              Start your adventure by creating or selecting a project and chapter.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 mb-4 rounded-lg bg-[#22272E] p-4 overflow-y-auto">
            {/* Chat messages will go here */}
          </div>
          <div className="flex gap-2 relative">
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-[#22272E] border-[#9b87f5] text-white placeholder-gray-400"
            />
            <Button 
              disabled={!message}
              className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white min-w-[100px]"
            >
              <SendHorizontal className="w-4 h-4 mr-2" />
              Send
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
