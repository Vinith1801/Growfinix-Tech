import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import toast from "react-hot-toast";

export default function NoteEditor({ note, onSave, onClose }) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [tags, setTags] = useState(note?.tags?.join(", ") || "");
  const [pinned, setPinned] = useState(note?.pinned || false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [autoSaveStatus, setAutoSaveStatus] = useState("Idle");

  // Auto-save with debounce
  useEffect(() => {
    if (title || content) {
      setAutoSaveStatus("Unsaved changes");
    } else {
      setAutoSaveStatus("Idle");
    }
  }, [title, content, tags, pinned]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    if (!title.trim()) {
      setErrors({ title: "Title is required" });
      toast.error("Title is required");
      return;
    }
    onSave({
      title,
      content,
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      pinned,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-auto flex flex-col md:flex-row">

        {/* Left Form Panel */}
        <div className="flex-1 p-6 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {note ? "Edit Note" : "Create Note"}
            </h2>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={pinned}
                  onChange={() => setPinned(!pinned)}
                  className="accent-blue-500"
                />
                Pinned
              </label>
              <button
                type="button"
                onClick={() => setTooltipVisible(!tooltipVisible)}
                onBlur={() => setTooltipVisible(false)}
                aria-label="Markdown info"
                className="relative text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition-all"
              >
                ℹ️
                {tooltipVisible && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-3 rounded-lg bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100 shadow-lg z-10">
                    Markdown formatting is supported in <em>Content</em>.
                    <br />
                    <code>**bold**</code>, <code>*italic*</code>, <code>- lists</code>, <code>[link](#)</code>.
                    <a
                      href="https://www.markdownguide.org/basic-syntax/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-1 text-blue-600 hover:underline dark:text-blue-400"
                    >
                      Learn more
                    </a>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Form */}
          <form className="grid gap-3" onSubmit={handleSubmit}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}

            {/* Toolbar */}
            <div className="flex gap-2 mb-1 text-sm">
              <button type="button" onClick={() => setContent(content + "**bold** ")} className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-600">B</button>
              <button type="button" onClick={() => setContent(content + "*italic* ")} className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-600">I</button>
              <button type="button" onClick={() => setContent(content + "- list item\n")} className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-600">•</button>
              <button type="button" onClick={() => setContent(content + "[link](https://) ")} className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-600">🔗</button>
            </div>

            <textarea
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>{content.split(/\s+/).filter(Boolean).length} words</span>
              <span>{content.length} chars</span>
            </div>

            {/* Tag input */}
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Tags (comma separated)"
              className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {tags && (
              <div className="flex flex-wrap gap-2 mt-1">
                {tags.split(",").map((tag, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center mt-4">
              <span className="text-xs text-gray-500">{autoSaveStatus}</span>
              <div className="flex gap-2">
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
            </div>
          </form>
        </div>

        {/* Right Preview Panel */}
        <div className="flex-1 border-t md:border-t-0 md:border-l border-gray-300 dark:border-gray-700 p-6 overflow-auto prose prose-blue dark:prose-invert max-w-none bg-gray-50 dark:bg-gray-800">
          <h3 className="text-lg font-semibold mb-2">Preview</h3>
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
            {content || "_Start typing to see preview..._"}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
