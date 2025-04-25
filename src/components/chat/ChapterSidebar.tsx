
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/store/chat-store";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export const ChapterSidebar = () => {
  const { chapters, selectedProject, selectedChapter, setSelectedChapter, addChapter } = useChatStore();
  const [newChapter, setNewChapter] = useState({ name: "" });
  const [isOpen, setIsOpen] = useState(false);

  const projectChapters = chapters.filter((chapter) => chapter.projectId === selectedProject?.id);
  const isDisabled = !selectedProject;

  const handleCreateChapter = () => {
    if (!selectedProject) return;
    const chapter = {
      id: Math.random().toString(),
      projectId: selectedProject.id,
      name: newChapter.name,
    };
    addChapter(chapter);
    setNewChapter({ name: "" });
    setIsOpen(false);
  };

  return (
    <div className={`w-64 h-full bg-white border-r p-4 ${isDisabled ? "opacity-50" : ""}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Chapters</h2>
        <Dialog open={isDisabled ? false : isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" disabled={isDisabled}>
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Chapter</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Chapter Name</Label>
                <Input
                  id="name"
                  value={newChapter.name}
                  onChange={(e) => setNewChapter({ name: e.target.value })}
                />
              </div>
              <Button onClick={handleCreateChapter} className="w-full">
                Create Chapter
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-2">
        {projectChapters.map((chapter) => (
          <Button
            key={chapter.id}
            variant={selectedChapter?.id === chapter.id ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setSelectedChapter(chapter)}
            disabled={isDisabled}
          >
            {chapter.name}
          </Button>
        ))}
      </div>
    </div>
  );
};
