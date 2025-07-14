import { ActionButtonsRow, Content, DraggableTopBar, FloatingNoteTitle, MarkdownEditor, NotesPreviewList, RootLayout, Sidebar } from "@/components";
import { useRef } from "react";


const App = () => {

  const contentContainerRef = useRef<HTMLDivElement>(null);
  const resetScroll = () =>{
    contentContainerRef.current?.scrollTo(0, 0);
  }

  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="p-2">
          <ActionButtonsRow className="flex justify-between my-1"/>
          <NotesPreviewList className="mt-3 space-t-1" onSelect={resetScroll} />
        </Sidebar>
        <Content className="border-l bg-zinc-900/50 border-l-white/20" ref={contentContainerRef}>
          <FloatingNoteTitle className="pt-2" />
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
