// src/pages/Home.jsx
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 p-8">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">Welcome to NotesApp</h1>
      <p className="mb-8 max-w-lg text-center text-gray-700 dark:text-gray-300">
        Securely create, edit, and organize your notes with markdown support and powerful tagging.
      </p>
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
