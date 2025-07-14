import { useMarkdownEditor } from '@/hooks/useMarkdownEditor';
import { headingsPlugin, listsPlugin, markdownShortcutPlugin, MDXEditor, quotePlugin } from '@mdxeditor/editor';

export const MarkdownEditor = () => {
  const { editorRef, selectedNote, handleAutoSaving, handleBlur} = useMarkdownEditor();

  if(!selectedNote) return null;

  return (
    <MDXEditor
      ref={editorRef}
      key={selectedNote.title}
      onChange={handleAutoSaving}
      onBlur={handleBlur}
      markdown={selectedNote.content}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        markdownShortcutPlugin(),
      ]}
      contentEditableClassName='outline-none min-h-screen max-w-none text-md px-8 py-5 caret-yellow-500 prose prose-invert prose-p:my-2 prose-p:leading-relaxed prose-heading:my-2 prose-blockquote:my-3 prose-ul:my-1 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[""] prose-code:after:content-[""]'
    />
  )
}
