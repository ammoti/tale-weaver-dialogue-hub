
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/store/chat-store";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const ProjectSidebar = () => {
  const { projects, selectedProject, setSelectedProject, addProject } = useChatStore();
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  const [isOpen, setIsOpen] = useState(false);

  const handleCreateProject = () => {
    const project = {
      id: Math.random().toString(),
      ...newProject,
    };
    addProject(project);
    setNewProject({ name: "", description: "" });
    setIsOpen(false);
  };

  return (
    <div className="w-full h-full bg-[#023430] border-r border-[#0a4b45] p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-300">Projects</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-[#0a4b45]">
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                />
              </div>
              <Button onClick={handleCreateProject} className="w-full">
                Create Project
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-2">
        {projects.map((project) => (
          <Button
            key={project.id}
            variant={selectedProject?.id === project.id ? "secondary" : "ghost"}
            className={`w-full justify-start ${
              selectedProject?.id === project.id 
                ? "bg-[#0a4b45] text-white hover:bg-[#0a4b45]" 
                : "text-gray-300 hover:text-white hover:bg-[#0a4b45]"
            }`}
            onClick={() => setSelectedProject(project)}
          >
            {project.name}
          </Button>
        ))}
      </div>
    </div>
  );
};
