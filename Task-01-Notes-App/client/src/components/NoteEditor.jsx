// src/components/NoteEditor.jsx
import { useState, useEffect } from "react";

export default function NoteEditor({ note, onSave, onClose }) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [tags, setTags] = useState(note?.tags?.join(", ") || "");

  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setContent(note.content || "");
      setTags(note.tags?.join(", ") || "");
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      title,
      content,
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          {note ? "Edit Note" : "Create Note"}
        </h2>
        <form className="grid gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags (comma separated)"
            className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex justify-end gap-2 mt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
