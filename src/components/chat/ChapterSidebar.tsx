
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/store/chat-store";
import { Plus, PenLine } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const ChapterSidebar = () => {
  const { chapters, selectedProject, selectedChapter, setSelectedChapter, addChapter } = useChatStore();
  const [newMode, setNewMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newChapter, setNewChapter] = useState({ name: "" });

  const projectChapters = chapters.filter((chapter) => chapter.projectId === selectedProject?.id);
  const isDisabled = !selectedProject;

  const handleCreateChapter = () => {
    if (!selectedProject || !newChapter.name.trim()) return;
    const chapter = {
      id: Math.random().toString(),
      projectId: selectedProject.id,
      name: newChapter.name,
    };
    addChapter(chapter);
    setNewChapter({ name: "" });
    setNewMode(false);
  };

  return (
    <div className={`w-full h-full bg-[#023430] border-r border-[#0a4b45] p-4 ${isDisabled ? "opacity-50" : ""}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-300">Chapters</h2>
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
              placeholder="Chapter name"
              value={newChapter.name}
              onChange={(e) => setNewChapter({ name: e.target.value })}
              className="bg-[#023430] border-[#0a4b45]"
            />
            <div className="flex gap-2">
              <Button 
                onClick={handleCreateChapter}
                className="flex-1 bg-[#FF69B4] hover:bg-[#ff45a0]"
              >
                Create
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => {
                  setNewMode(false);
                  setNewChapter({ name: "" });
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
        {projectChapters.map((chapter) => (
          <div
            key={chapter.id}
            className={`group relative ${
              selectedChapter?.id === chapter.id 
                ? "bg-[#0a4b45] text-white" 
                : "text-gray-300 hover:bg-[#0a4b45] hover:text-white"
            } rounded-md`}
          >
            {editingId === chapter.id ? (
              <div className="p-2 space-y-2">
                <Input
                  value={chapter.name}
                  onChange={(e) => addChapter({ ...chapter, name: e.target.value })}
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
                className="w-full justify-between group"
                onClick={() => setSelectedChapter(chapter)}
                disabled={isDisabled}
              >
                <span>{chapter.name}</span>
                <PenLine
                  className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingId(chapter.id);
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
