import { ActionButtonsRow, Content, DraggableTopBar, FloatingNoteTitle, MarkdownEditor, NotesPreviewList, RootLayout, Sidebar } from "@/components"


const App = () => {
  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="p-2">
          <ActionButtonsRow className="flex justify-between my-1"/>
          <NotesPreviewList className="mt-3 space-t-1" />
        </Sidebar>
        <Content className="border-l bg-zinc-900/50 border-l-white/20">
          <FloatingNoteTitle className="pt-2" />
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
