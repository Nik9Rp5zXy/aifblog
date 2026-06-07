"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Bold, Italic, List, ListOrdered, Code, Image as ImageIcon } from "lucide-react";

export function RichTextEditor({ content, onChange }: { content: string; onChange: (content: string) => void }) {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content,
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-none focus:outline-none min-h-[400px] p-4",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const handleImageUpload = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        
        try {
          const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });
          const data = await res.json();
          if (data.url) {
            editor.chain().focus().setImage({ src: data.url }).run();
          }
        } catch (error) {
          console.error('Upload failed');
        }
      }
    };
    input.click();
  };

  return (
    <div className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950">
      <div className="flex gap-1 p-2 border-b border-neutral-800 bg-neutral-900/50">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-neutral-800 ${editor.isActive('bold') ? 'bg-neutral-800 text-white' : 'text-neutral-400'}`}
          type="button"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-neutral-800 ${editor.isActive('italic') ? 'bg-neutral-800 text-white' : 'text-neutral-400'}`}
          type="button"
        >
          <Italic className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-neutral-800 my-auto mx-1" />
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-neutral-800 ${editor.isActive('bulletList') ? 'bg-neutral-800 text-white' : 'text-neutral-400'}`}
          type="button"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-neutral-800 ${editor.isActive('orderedList') ? 'bg-neutral-800 text-white' : 'text-neutral-400'}`}
          type="button"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-neutral-800 my-auto mx-1" />
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded hover:bg-neutral-800 ${editor.isActive('codeBlock') ? 'bg-neutral-800 text-white' : 'text-neutral-400'}`}
          type="button"
        >
          <Code className="w-4 h-4" />
        </button>
        <button
          onClick={handleImageUpload}
          className="p-2 rounded hover:bg-neutral-800 text-neutral-400"
          type="button"
        >
          <ImageIcon className="w-4 h-4" />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
