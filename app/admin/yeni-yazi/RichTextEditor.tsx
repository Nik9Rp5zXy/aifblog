"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { 
  Bold, Italic, Strikethrough, Heading1, Heading2, 
  List, ListOrdered, Code, Quote, Image as ImageIcon 
} from 'lucide-react';
import clsx from 'clsx';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[400px] p-6',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const MenuButton = ({ 
    onClick, 
    isActive = false, 
    children, 
    title 
  }: { 
    onClick: () => void, 
    isActive?: boolean, 
    children: React.ReactNode,
    title: string
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={clsx(
        "p-2 rounded-sm border transition-colors",
        isActive 
          ? "bg-[var(--color-brand-cyan)]/20 border-[var(--color-brand-cyan)]/50 text-[var(--color-brand-cyan)]" 
          : "bg-transparent border-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-primary)] hover:text-white"
      )}
    >
      {children}
    </button>
  );

  const addImage = () => {
    const url = window.prompt('Görsel URL\'sini girin:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="border border-[var(--color-border-subtle)] rounded-sm bg-[var(--color-bg-primary)] overflow-hidden">
      
      {/* Toolbar */}
      <div className="bg-[var(--color-bg-surface)] border-b border-[var(--color-border-subtle)] p-2 flex flex-wrap items-center gap-1">
        <MenuButton
          title="Kalın"
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
        >
          <Bold className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          title="İtalik"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
        >
          <Italic className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          title="Üstü Çizili"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
        >
          <Strikethrough className="w-4 h-4" />
        </MenuButton>

        <div className="w-px h-6 bg-[var(--color-border-subtle)] mx-2" />

        <MenuButton
          title="Başlık 1"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
        >
          <Heading1 className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          title="Başlık 2"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
        >
          <Heading2 className="w-4 h-4" />
        </MenuButton>

        <div className="w-px h-6 bg-[var(--color-border-subtle)] mx-2" />

        <MenuButton
          title="Madde İşaretli Liste"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
        >
          <List className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          title="Numaralı Liste"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
        >
          <ListOrdered className="w-4 h-4" />
        </MenuButton>

        <div className="w-px h-6 bg-[var(--color-border-subtle)] mx-2" />

        <MenuButton
          title="Alıntı"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
        >
          <Quote className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          title="Kod Bloğu"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive('codeBlock')}
        >
          <Code className="w-4 h-4" />
        </MenuButton>

        <div className="w-px h-6 bg-[var(--color-border-subtle)] mx-2" />

        <MenuButton
          title="Görsel Ekle"
          onClick={addImage}
        >
          <ImageIcon className="w-4 h-4" />
        </MenuButton>
      </div>

      {/* Editor Area */}
      <EditorContent editor={editor} className="min-h-[400px]" />
    </div>
  );
}
