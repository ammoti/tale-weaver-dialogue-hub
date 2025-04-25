
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/store/chat-store";
import { Plus, PenLine } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const NPCSidebar = () => {
  const { npcs, selectedChapter, selectedNPC, setSelectedNPC, addNPC } = useChatStore();
  const [newMode, setNewMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newNPC, setNewNPC] = useState({ name: "", description: "" });

  const chapterNPCs = npcs.filter((npc) => npc.chapterId === selectedChapter?.id);
  const isDisabled = !selectedChapter;

  const handleCreateNPC = () => {
    if (!selectedChapter || !newNPC.name.trim()) return;
    const npc = {
      id: Math.random().toString(),
      chapterId: selectedChapter.id,
      ...newNPC,
    };
    addNPC(npc);
    setNewNPC({ name: "", description: "" });
    setNewMode(false);
  };

  const getAvatarFallback = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className={`w-full h-full bg-[#023430] border-r border-[#0a4b45] p-4 ${isDisabled ? "opacity-50" : ""}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-300">NPCs</h2>
        <Button 
          variant="ghost" 
          size="icon" 
          disabled={isDisabled}
          className="text-gray-300 hover:text-white hover:bg-[#0a4b45]"
          onClick={() => setNewMode(true)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-2">
        {newMode && (
          <div className="space-y-2 bg-[#0a4b45] p-2 rounded-md">
            <Input
              placeholder="NPC name"
              value={newNPC.name}
              onChange={(e) => setNewNPC({ ...newNPC, name: e.target.value })}
              className="bg-[#023430] border-[#0a4b45]"
            />
            <Textarea
              placeholder="Description"
              value={newNPC.description}
              onChange={(e) => setNewNPC({ ...newNPC, description: e.target.value })}
              className="bg-[#023430] border-[#0a4b45]"
            />
            <div className="flex gap-2">
              <Button 
                onClick={handleCreateNPC}
                className="flex-1 bg-[#FF69B4] hover:bg-[#ff45a0]"
              >
                Create
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => {
                  setNewMode(false);
                  setNewNPC({ name: "", description: "" });
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
        {chapterNPCs.map((npc) => (
          <div
            key={npc.id}
            className={`group relative ${
              selectedNPC?.id === npc.id 
                ? "bg-[#0a4b45] text-white" 
                : "text-gray-300 hover:bg-[#0a4b45] hover:text-white"
            } rounded-md`}
          >
            {editingId === npc.id ? (
              <div className="p-2 space-y-2">
                <Input
                  value={npc.name}
                  onChange={(e) => addNPC({ ...npc, name: e.target.value })}
                  className="bg-[#023430] border-[#0a4b45]"
                />
                <Textarea
                  value={npc.description}
                  onChange={(e) => addNPC({ ...npc, description: e.target.value })}
                  className="bg-[#023430] border-[#0a4b45]"
                />
                <div className="flex gap-2">
                  <Button 
                    onClick={() => setEditingId(null)}
                    className="flex-1 bg-[#FF69B4] hover:bg-[#ff45a0]"
                  >
                    Save
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => setEditingId(null)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 group"
                onClick={() => setSelectedNPC(npc)}
                disabled={isDisabled}
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${npc.name}`} />
                  <AvatarFallback>{getAvatarFallback(npc.name)}</AvatarFallback>
                </Avatar>
                <span>{npc.name}</span>
                <PenLine
                  className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity ml-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingId(npc.id);
                  }}
                />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
