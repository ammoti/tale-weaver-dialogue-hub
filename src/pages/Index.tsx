
import { ProjectSidebar } from "@/components/chat/ProjectSidebar";
import { ChapterSidebar } from "@/components/chat/ChapterSidebar";
import { NPCSidebar } from "@/components/chat/NPCSidebar";
import { ChatArea } from "@/components/chat/ChatArea";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

const Index = () => {
  return (
    <div className="flex h-screen bg-background">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20} minSize={15}>
          <ProjectSidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={20} minSize={15}>
          <ChapterSidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={20} minSize={15}>
          <NPCSidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={40} minSize={30}>
          <ChatArea />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Index;
