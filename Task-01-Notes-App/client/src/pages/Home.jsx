// src/pages/Home.jsx
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 px-8 py-16 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <h1 className="text-4xl font-bold mb-4">Welcome to SecureNotes</h1>
      <p className="mb-8 max-w-3xl text-center text-gray-700 dark:text-gray-300">
        Your privacy-first, full-stack notes application — crafted with the MERN
        stack for performance, security, and ease of use.
      </p>

      {/* Project Overview */}
      <section className="max-w-4xl mb-12">
        <h2 className="text-2xl font-semibold mb-2">📌 Project Overview</h2>
        <p className="text-gray-700 dark:text-gray-300">
          SecureNotes is a full-stack note-taking platform designed to protect your ideas while
          offering a seamless writing experience. Whether you’re jotting down quick thoughts or
          managing organized documents, SecureNotes ensures your content remains accessible only
          to you.
        </p>
      </section>

      {/* Features */}
      <section className="max-w-4xl mb-12">
        <h2 className="text-2xl font-semibold mb-4">🚀 Key Features</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>🔐 Secure Authentication — Login/Signup with JWT + HTTP-only cookies</li>
          <li>🛡 Owner-Only Access — Notes visible & editable only by the owner</li>
          <li>📝 Rich Markdown Editor — Tiptap editor with Markdown formatting support</li>
          <li>⚡ CRUD Operations — Create, edit, and delete notes in real-time</li>
          <li>🏷 Smart Organization — Filter and search notes by tags or categories</li>
          <li>🌙 Dark Mode — Light/dark theme toggle for comfortable viewing</li>
          <li>📊 Security Measures — Token expiration checks, rate limiting, unauthorized access protection</li>
        </ul>
      </section>

      {/* Tech Stack */}
      <section className="max-w-4xl mb-12">
        <h2 className="text-2xl font-semibold mb-4">🛠 Tech Stack</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
          <li>Frontend: React (Vite) + React Router</li>
          <li>Backend: Node.js + Express REST API</li>
          <li>Database: MongoDB (Mongoose ORM)</li>
          <li>Authentication: JWT with HTTP-only cookies</li>
          <li>UI: TailwindCSS, Tiptap Editor, Dark Mode Toggle</li>
        </ul>
      </section>

      {/* Security */}
      <section className="max-w-4xl mb-12">
        <h2 className="text-2xl font-semibold mb-4">🔍 Security Highlights</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
          <li>Protected Routes with frontend & backend auth checks</li>
          <li>Token expiration verification</li>
          <li>Rate limiting on authentication endpoints</li>
          <li>Unauthorized access testing to ensure strict data control</li>
        </ul>
      </section>

      {/* Action Buttons */}
      {!user ? (
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            Sign Up
          </button>
        </div>
      ) : (
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
        >
          Go to Dashboard
        </button>
      )}
    </div>
  );
}
