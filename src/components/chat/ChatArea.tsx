
import { useChatStore } from "@/store/chat-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Gamepad, SendHorizontal } from "lucide-react";

export const ChatArea = () => {
  const { selectedNPC } = useChatStore();
  const [message, setMessage] = useState("");

  return (
    <div className="flex-1 flex flex-col h-full bg-[#023430]">
      {!selectedNPC ? (
        <div className="flex-1 flex items-center justify-center text-center p-8">
          <div className="max-w-md space-y-6 animate-fade-in">
            <div className="flex justify-center">
              <Gamepad className="w-16 h-16 text-[#FF69B4]" />
            </div>
            <h2 className="text-3xl font-bold text-[#FF69B4]">
              Welcome to Fantasy Chat
            </h2>
            <p className="text-gray-400 text-lg">
              Start your adventure by creating or selecting a project and chapter.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 mb-4 overflow-y-auto">
            {/* Chat messages will go here */}
          </div>
          <div className="p-4 border-t border-[#0a4b45]">
            <div className="flex gap-2">
              <Input
                placeholder="Message OLMo..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-[#0a4b45] border-[#0a4b45] text-white placeholder-gray-400 focus-visible:ring-[#FF69B4] focus-visible:ring-offset-0"
              />
              <Button 
                disabled={!message}
                className="bg-[#FF69B4] hover:bg-[#ff45a0] text-white min-w-[100px]"
              >
                <SendHorizontal className="w-4 h-4 mr-2" />
                Send
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">Always fact-check your results. OLMo is primarily designed to handle English queries.</p>
          </div>
        </>
      )}
    </div>
  );
};
