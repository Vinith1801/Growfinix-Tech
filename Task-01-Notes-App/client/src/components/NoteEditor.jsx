import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

export default function NoteEditor({ note, onSave, onClose }) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [tags, setTags] = useState(note?.tags?.join(", ") || "");
  const [tooltipVisible, setTooltipVisible] = useState(false);

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
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-lg max-h-[90vh] overflow-auto">
        {/* Header with Info Icon */}
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {note ? "Edit Note" : "Create Note"}
          </h2>
          <button
            type="button"
            onClick={() => setTooltipVisible(!tooltipVisible)}
            onBlur={() => setTooltipVisible(false)}
            aria-label="Markdown info"
            className="relative text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
            tabIndex={0}
          >
            ℹ️
            {tooltipVisible && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-2 rounded bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100 shadow-lg z-10">
                Markdown formatting is <strong>supported only</strong> in the <em>Content</em> field.
                <br />
                Examples: <code>**bold**</code>, <code>*italic*</code>, <code>- lists</code>, <code>[links](https://example.com)</code>.
                <br />
                <a
                  href="https://www.markdownguide.org/basic-syntax/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Learn more
                </a>
              </div>
            )}
          </button>
        </div>

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
            className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
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

        {/* Preview side */}
        <div className="prose max-w-none overflow-auto text-gray-700 dark:text-gray-300 border-l border-gray-300 dark:border-gray-700 pl-4 mt-6">
          <h3 className="text-lg font-semibold mb-2">Content Preview</h3>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSanitize]}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
