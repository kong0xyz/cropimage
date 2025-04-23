"use client";

import { MinimalTiptapEditor } from '@/components/minimal-tiptap';
import { Content } from '@tiptap/react';
interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({
  content,
  onChange,
}: RichTextEditorProps) {
  return (
    <div className="rich-text-editor" data-color-mode="light">
      <MinimalTiptapEditor
        value={content}
        onChange={(value: Content) => { onChange(value as string) }}
        className="w-full"
        editorContentClassName="p-5"
        output="html"
        placeholder="Enter your description..."
        autofocus={true}
        editable={true}
        editorClassName="focus:outline-hidden"
      />
    </div>
  );
} 