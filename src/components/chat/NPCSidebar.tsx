
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/store/chat-store";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export const NPCSidebar = () => {
  const { npcs, selectedChapter, selectedNPC, setSelectedNPC, addNPC } = useChatStore();
  const [newNPC, setNewNPC] = useState({ name: "", description: "" });
  const [isOpen, setIsOpen] = useState(false);

  const chapterNPCs = npcs.filter((npc) => npc.chapterId === selectedChapter?.id);
  const isDisabled = !selectedChapter;

  const handleCreateNPC = () => {
    if (!selectedChapter) return;
    const npc = {
      id: Math.random().toString(),
      chapterId: selectedChapter.id,
      ...newNPC,
    };
    addNPC(npc);
    setNewNPC({ name: "", description: "" });
    setIsOpen(false);
  };

  return (
    <div className={`w-64 h-full bg-white border-r p-4 ${isDisabled ? "opacity-50" : ""}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">NPCs</h2>
        <Dialog open={isDisabled ? false : isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" disabled={isDisabled}>
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New NPC</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">NPC Name</Label>
                <Input
                  id="name"
                  value={newNPC.name}
                  onChange={(e) => setNewNPC({ ...newNPC, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newNPC.description}
                  onChange={(e) => setNewNPC({ ...newNPC, description: e.target.value })}
                />
              </div>
              <Button onClick={handleCreateNPC} className="w-full">
                Create NPC
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-2">
        {chapterNPCs.map((npc) => (
          <Button
            key={npc.id}
            variant={selectedNPC?.id === npc.id ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setSelectedNPC(npc)}
            disabled={isDisabled}
          >
            {npc.name}
          </Button>
        ))}
      </div>
    </div>
  );
};
