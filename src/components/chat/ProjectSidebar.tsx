
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/store/chat-store";
import { Plus, PenLine } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const ProjectSidebar = () => {
  const { projects, selectedProject, setSelectedProject, addProject } = useChatStore();
  const [newMode, setNewMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newProject, setNewProject] = useState({ name: "", description: "" });

  const handleCreateProject = () => {
    if (!newProject.name.trim()) return;
    const project = {
      id: Math.random().toString(),
      ...newProject,
    };
    addProject(project);
    setNewProject({ name: "", description: "" });
    setNewMode(false);
  };

  return (
    <div className="w-full h-full bg-[#023430] border-r border-[#0a4b45] p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-300">Projects</h2>
        <Button 
          variant="ghost" 
          size="icon" 
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
              placeholder="Project name"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              className="bg-[#023430] border-[#0a4b45]"
            />
            <Textarea
              placeholder="Description"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              className="bg-[#023430] border-[#0a4b45]"
            />
            <div className="flex gap-2">
              <Button 
                onClick={handleCreateProject}
                className="flex-1 bg-[#FF69B4] hover:bg-[#ff45a0]"
              >
                Create
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => {
                  setNewMode(false);
                  setNewProject({ name: "", description: "" });
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
        {projects.map((project) => (
          <div
            key={project.id}
            className={`group relative ${
              selectedProject?.id === project.id 
                ? "bg-[#0a4b45] text-white" 
                : "text-gray-300 hover:bg-[#0a4b45] hover:text-white"
            } rounded-md`}
          >
            {editingId === project.id ? (
              <div className="p-2 space-y-2">
                <Input
                  value={project.name}
                  onChange={(e) => addProject({ ...project, name: e.target.value })}
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
                onClick={() => setSelectedProject(project)}
              >
                <span>{project.name}</span>
                <PenLine
                  className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingId(project.id);
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
