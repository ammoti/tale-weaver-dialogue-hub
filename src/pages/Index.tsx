
import { ProjectSidebar } from "@/components/chat/ProjectSidebar";
import { ChapterSidebar } from "@/components/chat/ChapterSidebar";
import { NPCSidebar } from "@/components/chat/NPCSidebar";
import { ChatArea } from "@/components/chat/ChatArea";
import { Header } from "@/components/chat/Header";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

const Index = () => {
  return (
    <div className="flex flex-col h-screen bg-[#023430]">
      <Header />
      <div className="flex-1">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel defaultSize={15} minSize={12}>
            <ProjectSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle className="bg-[#0a4b45]" />
          <ResizablePanel defaultSize={15} minSize={12}>
            <ChapterSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle className="bg-[#0a4b45]" />
          <ResizablePanel defaultSize={15} minSize={12}>
            <NPCSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle className="bg-[#0a4b45]" />
          <ResizablePanel defaultSize={55} minSize={35}>
            <ChatArea />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Index;
