// src/pages/Home.jsx
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  LockClosedIcon,
  ShieldCheckIcon,
  PencilSquareIcon,
  BoltIcon,
  TagIcon,
  MoonIcon,
  ComputerDesktopIcon,
  ServerIcon,
  ServerStackIcon,
  KeyIcon,
  PaintBrushIcon,
  ClockIcon,
  SignalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const features = [
    { icon: LockClosedIcon, title: "Secure Authentication", desc: "JWT + HTTP-only cookies ensure privacy-first sessions." },
    { icon: ShieldCheckIcon, title: "Owner-Only Access", desc: "Your notes remain private, encrypted, and only yours." },
    { icon: PencilSquareIcon, title: "Rich Markdown Editor", desc: "Write with Markdown support and smooth Tiptap experience." },
    { icon: BoltIcon, title: "Fast CRUD Operations", desc: "Seamlessly create, edit, and delete notes in real-time." },
    { icon: TagIcon, title: "Smart Organization", desc: "Tag and filter notes to maintain an intuitive workflow." },
    { icon: MoonIcon, title: "Dark Mode", desc: "Switch effortlessly between light and dark themes." },
  ];

  const techStack = [
    { icon: ComputerDesktopIcon, text: "React (Vite) + React Router" },
    { icon: ServerIcon, text: "Node.js + Express REST API" },
    { icon: ServerStackIcon, text: "MongoDB with Mongoose ORM" },
    { icon: KeyIcon, text: "JWT Authentication with HTTP-only cookies" },
    { icon: PaintBrushIcon, text: "TailwindCSS UI + Dark Mode toggle + Tiptap Editor" },
  ];

  const security = [
    { icon: ShieldCheckIcon, text: "Frontend & backend protected routes" },
    { icon: ClockIcon, text: "Token expiration verification" },
    { icon: SignalIcon, text: "Rate-limiting on authentication endpoints" },
    { icon: MagnifyingGlassIcon, text: "Comprehensive unauthorized access testing" },
  ];

  const GradientIcon = ({ Icon, gradient }) => (
    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md transition-transform transform hover:scale-110`}>
      <Icon className="w-7 h-7 text-white" />
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">

      {/* Background Blobs */}
      <div className="absolute -top-28 -left-24 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"></div>
      <div className="absolute top-36 -right-24 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-16 left-1/3 w-64 h-64 bg-pink-400/10 rounded-full blur-2xl"></div>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 lg:px-12 py-20 grid lg:grid-cols-2 gap-12 items-center z-10">
        <div>
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
            Organize Your Thoughts <span className="text-blue-600 dark:text-blue-400">Securely</span>
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-xl">
            SecureNotes is a privacy-first note-taking app built on the MERN stack. Fast, secure, and intuitive — so you focus on your ideas, not the app.
          </p>
          <div className="flex flex-wrap gap-4">
            {!user ? (
              <>
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition-transform transform hover:scale-105"
                >
                  Get Started
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-gray-200/60 dark:bg-gray-700/60 backdrop-blur-md hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 px-6 py-3 rounded-lg font-medium shadow-md transition-transform transform hover:scale-105"
                >
                  Login
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition-transform transform hover:scale-105"
              >
                Go to Dashboard
              </button>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <img src="hero.jpg" alt="Notes Illustration" className="max-w-md w-full drop-shadow-2xl rounded-2xl" />
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">🚀 Key Features</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-white/20 dark:border-gray-700/20 rounded-2xl shadow-md p-6 text-center transition-transform transform hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex justify-center mb-4">
                <GradientIcon Icon={f.icon} gradient="from-blue-500 to-purple-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">🛠 Tech Stack</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {techStack.map((t, idx) => (
            <div
              key={idx}
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-white/20 dark:border-gray-700/20 rounded-2xl shadow-md p-6 flex flex-col items-center text-center transition-transform transform hover:shadow-xl hover:-translate-y-1"
            >
              <GradientIcon Icon={t.icon} gradient="from-green-400 to-blue-500" />
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Security Highlights */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">🔍 Security Highlights</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {security.map((s, idx) => (
            <div
              key={idx}
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-white/20 dark:border-gray-700/20 rounded-2xl shadow-md p-6 flex flex-col items-center text-center transition-transform transform hover:shadow-xl hover:-translate-y-1"
            >
              <GradientIcon Icon={s.icon} gradient="from-pink-500 to-red-500" />
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-600 dark:text-gray-400 text-sm border-t border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm">
        © {new Date().getFullYear()} SecureNotes. All rights reserved.
      </footer>
    </div>
  );
}
