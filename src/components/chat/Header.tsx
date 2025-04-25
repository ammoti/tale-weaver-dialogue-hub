
import { Button } from "@/components/ui/button";
import { MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger, Menubar } from "@/components/ui/menubar";
import { Settings, LogIn, Menu } from "lucide-react";

export const Header = () => {
  return (
    <div className="flex items-center justify-between bg-[#023430] p-4 border-b border-[#0a4b45]">
      <div className="flex items-center space-x-4">
        <h1 className="text-[#FF69B4] text-xl font-semibold">Playground</h1>
        <Menubar className="border-none bg-transparent">
          <MenubarMenu>
            <MenubarTrigger className="text-gray-300 hover:text-white data-[state=open]:bg-[#0a4b45]">Model</MenubarTrigger>
            <MenubarContent className="bg-[#023430] border-[#0a4b45]">
              <MenubarItem className="text-gray-300 hover:bg-[#0a4b45] focus:bg-[#0a4b45]">
                GPT-4
              </MenubarItem>
              <MenubarItem className="text-gray-300 hover:bg-[#0a4b45] focus:bg-[#0a4b45]">
                ChatGPT
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-[#0a4b45]">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-[#0a4b45]">
          <Menu className="h-5 w-5" />
        </Button>
        <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-[#0a4b45]">
          <LogIn className="h-5 w-5 mr-2" />
          Log in
        </Button>
      </div>
    </div>
  );
};
