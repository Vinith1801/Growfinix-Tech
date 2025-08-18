import { useEffect, useState } from "react";
import { getNotes, createNote, updateNote, deleteNote } from "../api/noteApi";
import { PencilIcon, TrashIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import NoteEditor from "../components/NoteEditor";
import { useAuth } from "../auth/AuthContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [filterTags, setFilterTags] = useState("");
  const { user, loading } = useAuth();
  const debouncedFilterTags = useDebounce(filterTags, 400);

  useEffect(() => {
    if (loading || !user) return;

    (async () => {
      try {
        const data = await getNotes(debouncedFilterTags);
        setNotes(Array.isArray(data) ? data : data?.notes || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load notes");
        setNotes([]);
      }
    })();
  }, [loading, user, debouncedFilterTags]);

  const handleSave = async (data) => {
    try {
      if (editingNote) {
        const updated = await updateNote(editingNote._id, data);
        setNotes(notes.map(n => (n._id === editingNote._id ? updated : n)));
        toast.success("Note updated");
      } else {
        const newNote = await createNote(data);
        setNotes([newNote, ...notes]);
        toast.success("Note created");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.msg || "Save failed");
    } finally {
      setEditorOpen(false);
      setEditingNote(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note?")) return;
    try {
      await deleteNote(id);
      setNotes(notes.filter(n => n._id !== id));
      toast.success("Note deleted");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.msg || "Delete failed");
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-600 dark:text-gray-300">Loading...</div>;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-16 flex flex-col gap-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
            My Notes
          </h1>
          <button
            onClick={() => { setEditingNote(null); setEditorOpen(true); }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-xl shadow-lg transition transform hover:-translate-y-0.5"
          >
            <PlusIcon className="w-5 h-5" /> New Note
          </button>
        </div>

        {/* Filter Input */}
        <div className="relative max-w-md w-full">
          <input
            type="text"
            placeholder="Filter by tags (comma separated)"
            value={filterTags}
            onChange={(e) => setFilterTags(e.target.value)}
            className="peer w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-gray-100 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md transition"
          />
          {filterTags && (
            <button
              onClick={() => setFilterTags("")}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Clear filter"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Notes Grid */}
        {notes.length === 0 ? (
          <div className="text-center mt-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No notes found.</p>
          </div>
        ) : (
          <motion.div 
            layout 
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {notes.map(note => (
                <motion.div
                  key={note._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 transition"
                >
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {note.title || "Untitled"}
                    </h2>
                    <div className="prose prose-sm max-w-none mt-3 text-gray-700 dark:text-gray-300 break-words">
                      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
                        {note.content || "_No content_"}
                      </ReactMarkdown>
                    </div>

                    {note.tags?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {note.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 mt-5 justify-end">
                    <button
                      onClick={() => { setEditingNote(note); setEditorOpen(true); }}
                      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                      aria-label="Edit note"
                    >
                      <PencilIcon className="w-5 h-5 text-yellow-500" />
                    </button>
                    <button
                      onClick={() => handleDelete(note._id)}
                      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                      aria-label="Delete note"
                    >
                      <TrashIcon className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Note Editor Modal */}
      {editorOpen && (
        <NoteEditor
          note={editingNote}
          onSave={handleSave}
          onClose={() => { setEditorOpen(false); setEditingNote(null); }}
        />
      )}
    </div>
  );
}
