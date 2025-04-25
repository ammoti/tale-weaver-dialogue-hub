
import { create } from "zustand";

interface Project {
  id: string;
  name: string;
  description: string;
}

interface Chapter {
  id: string;
  projectId: string;
  name: string;
}

interface NPC {
  id: string;
  chapterId: string;
  name: string;
  description: string;
}

interface ChatStore {
  selectedProject: Project | null;
  selectedChapter: Chapter | null;
  selectedNPC: NPC | null;
  projects: Project[];
  chapters: Chapter[];
  npcs: NPC[];
  setSelectedProject: (project: Project | null) => void;
  setSelectedChapter: (chapter: Chapter | null) => void;
  setSelectedNPC: (npc: NPC | null) => void;
  addProject: (project: Project) => void;
  addChapter: (chapter: Chapter) => void;
  addNPC: (npc: NPC) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  selectedProject: null,
  selectedChapter: null,
  selectedNPC: null,
  projects: [],
  chapters: [],
  npcs: [],
  setSelectedProject: (project) => set({ selectedProject: project, selectedChapter: null, selectedNPC: null }),
  setSelectedChapter: (chapter) => set({ selectedChapter: chapter, selectedNPC: null }),
  setSelectedNPC: (npc) => set({ selectedNPC: npc }),
  addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  addChapter: (chapter) => set((state) => ({ chapters: [...state.chapters, chapter] })),
  addNPC: (npc) => set((state) => ({ npcs: [...state.npcs, npc] })),
}));
