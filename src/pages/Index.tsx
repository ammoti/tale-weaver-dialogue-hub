
import { ProjectSidebar } from "@/components/chat/ProjectSidebar";
import { ChapterSidebar } from "@/components/chat/ChapterSidebar";
import { NPCSidebar } from "@/components/chat/NPCSidebar";
import { ChatArea } from "@/components/chat/ChatArea";

const Index = () => {
  return (
    <div className="flex h-screen bg-background">
      <ProjectSidebar />
      <ChapterSidebar />
      <NPCSidebar />
      <ChatArea />
    </div>
  );
};

export default Index;
