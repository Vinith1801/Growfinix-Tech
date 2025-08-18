// src/pages/Home.jsx
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
    { icon: PencilSquareIcon, title: "Rich Markdown Editor", desc: "Write with Markdown support and smooth editing experience." },
    { icon: BoltIcon, title: "Fast CRUD Operations", desc: "Seamlessly create, edit, and delete notes in real-time." },
    { icon: TagIcon, title: "Smart Organization", desc: "Tag and filter notes to maintain an intuitive workflow." },
    { icon: MoonIcon, title: "Dark Mode", desc: "Switch effortlessly between light and dark themes." },
  ];

  const techStack = [
    { icon: ComputerDesktopIcon, text: "React (Vite) + React Router" },
    { icon: ServerIcon, text: "Node.js + Express REST API" },
    { icon: ServerStackIcon, text: "MongoDB with Mongoose ORM" },
    { icon: KeyIcon, text: "JWT Authentication with HTTP-only cookies" },
    { icon: PaintBrushIcon, text: "TailwindCSS UI + Dark Mode + Markdown Editor" },
  ];

  const security = [
    { icon: ShieldCheckIcon, text: "Frontend & backend protected routes" },
    { icon: ClockIcon, text: "Token expiration verification" },
    { icon: SignalIcon, text: "Rate-limiting on authentication endpoints" },
    { icon: MagnifyingGlassIcon, text: "Comprehensive unauthorized access testing" },
  ];

  const GradientIcon = ({ Icon, gradient }) => (
    <motion.div
      whileHover={{ scale: 1.15 }}
      className={`w-14 h-14 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}
    >
      <Icon className="w-7 h-7 text-white" />
    </motion.div>
  );

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">

      {/* Background Accents */}
      <div className="absolute -top-28 -left-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      <div className="absolute top-36 -right-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-16 left-1/3 w-72 h-72 bg-pink-500/10 rounded-full blur-2xl"></div>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 lg:px-12 py-28 grid lg:grid-cols-2 gap-12 items-center z-10">
        {/* Text */}
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            Organize Your <span className="bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">Thoughts</span> Securely
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-xl">
            SecureNotes is your premium privacy-first note-taking companion. Built with MERN stack, it’s fast, secure, and intuitive — so you focus on your ideas, not the tool.
          </p>
          <div className="flex flex-wrap gap-4">
            {!user ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/signup")}
                  className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg transition"
                >
                  Get Started
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/login")}
                  className="px-6 py-3 rounded-xl font-semibold bg-white/70 dark:bg-gray-800/70 backdrop-blur-md text-gray-900 dark:text-gray-100 border shadow-md"
                >
                  Login
                </motion.button>
              </>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/dashboard")}
                className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg transition"
              >
                Go to Dashboard
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="flex justify-center"
        >
          <img
            src="hero.jpg"
            alt="Notes Illustration"
            className="max-w-md w-full drop-shadow-2xl rounded-2xl"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <motion.h2 initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }} className="text-3xl font-bold text-center mb-14">
          🚀 Key Features
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((f, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="show"
              variants={fadeUp}
              viewport={{ once: true }}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-white/20 dark:border-gray-700/20 rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition-all"
            >
              <div className="flex justify-center mb-4">
                <GradientIcon Icon={f.icon} gradient="from-blue-500 to-purple-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <motion.h2 initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }} className="text-3xl font-bold text-center mb-14">
          🛠 Tech Stack
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {techStack.map((t, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="show"
              variants={fadeUp}
              viewport={{ once: true }}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-white/20 dark:border-gray-700/20 rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-all"
            >
              <GradientIcon Icon={t.icon} gradient="from-green-400 to-blue-500" />
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{t.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Security Highlights */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <motion.h2 initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }} className="text-3xl font-bold text-center mb-14">
          🔍 Security Highlights
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {security.map((s, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="show"
              variants={fadeUp}
              viewport={{ once: true }}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-white/20 dark:border-gray-700/20 rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-all"
            >
              <GradientIcon Icon={s.icon} gradient="from-pink-500 to-red-500" />
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative max-w-5xl mx-auto px-6 py-20 text-center">
        <motion.h2 initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }} className="text-4xl font-bold mb-6">
          Ready to take your notes to the next level?
        </motion.h2>
        <motion.p initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }} className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Join SecureNotes today and experience premium, secure, and fast note management.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(user ? "/dashboard" : "/signup")}
          className="px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-xl"
        >
          {user ? "Go to Dashboard" : "Get Started for Free"}
        </motion.button>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600 dark:text-gray-400 text-sm border-t border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm">
        © {new Date().getFullYear()} SecureNotes. All rights reserved.
      </footer>
    </div>
  );
}
