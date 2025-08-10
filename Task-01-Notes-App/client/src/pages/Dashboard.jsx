import { useEffect, useState } from "react";
import { getNotes, createNote, updateNote, deleteNote } from "../api/noteApi";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import NoteEditor from "../components/NoteEditor";
import { useAuth } from "../auth/AuthContext";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const { user, loading } = useAuth(); // get auth state

  useEffect(() => {
    if (loading) return; // don't run until auth is ready
    if (!user) return;   // no user → no notes

    (async () => {
      try {
        const data = await getNotes();
        setNotes(Array.isArray(data) ? data : data?.notes || []);
      } catch (err) {
        console.error(err);
        setNotes([]);
      }
    })();
  }, [loading, user]); // re-run when auth finishes

  const handleSave = async (data) => {
    try {
      if (editingNote) {
        const updated = await updateNote(editingNote._id, data);
        setNotes(notes.map(n => (n._id === editingNote._id ? updated : n)));
      } else {
        const newNote = await createNote(data);
        setNotes([newNote, ...notes]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setEditorOpen(false);
      setEditingNote(null);
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
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  {note.content}
                </p>
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
                >
                  <PencilIcon className="w-5 h-5 text-yellow-500" />
                </button>
                <button
                  onClick={() => deleteNote(note._id).then(() => setNotes(notes.filter(n => n._id !== note._id)))}
                  className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  <TrashIcon className="w-5 h-5 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
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
