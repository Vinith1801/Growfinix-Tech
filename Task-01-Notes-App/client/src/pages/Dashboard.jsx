import { useEffect, useState } from "react";
import { getNotes, createNote, updateNote, deleteNote } from "../api/noteApi";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import NoteEditor from "../components/NoteEditor";
import { useAuth } from "../auth/AuthContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import toast from "react-hot-toast";

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
    if (loading) return;
    if (!user) return;

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
    return <div className="p-8 text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            My Notes
          </h1>
          <button
            onClick={() => { setEditingNote(null); setEditorOpen(true); }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
          >
            + New Note
          </button>
        </div>

        {/* Filter Input and Clear Button */}
        <div className="mb-6 flex items-center gap-2 max-w-sm">
          <input
            type="text"
            placeholder="Filter by tags (comma separated)"
            value={filterTags}
            onChange={(e) => setFilterTags(e.target.value)}
            className="flex-grow px-4 py-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"
          />
          {filterTags && (
            <button
              onClick={() => setFilterTags("")}
              className="px-3 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition text-gray-700 dark:text-gray-200"
              aria-label="Clear filter"
            >
              Clear
            </button>
          )}
        </div>

        {/* Notes Grid or Empty State */}
        {notes.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
            No notes found for the specified tags.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map(note => (
              <div
                key={note._id}
                className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-xl shadow-sm p-4 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {note.title}
                  </h2>
                  <div className="prose max-w-none text-gray-700 dark:text-gray-300 mt-2">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeSanitize]}
                    >
                      {note.content}
                    </ReactMarkdown>
                  </div>

                  {note.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {note.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => { setEditingNote(note); setEditorOpen(true); }}
                    className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    aria-label="Edit note"
                  >
                    <PencilIcon className="w-5 h-5 text-yellow-500" />
                  </button>
                  <button
                    onClick={() =>
                      handleDelete(note._id).then(() =>
                        setNotes(notes.filter(n => n._id !== note._id))
                      )
                    }
                    className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    aria-label="Delete note"
                  >
                    <TrashIcon className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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
