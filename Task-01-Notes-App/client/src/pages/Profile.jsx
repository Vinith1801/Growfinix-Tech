import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/api"; // axios instance with auth cookies

export default function Profile() {
  const { user, loading } = useAuth();
  const [form, setForm] = useState({
    username: "",
    email: "",
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    if (user) {
      setForm((f) => ({
        ...f,
        username: user.username || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (!user) return <div className="flex justify-center items-center h-screen">Please login to view your profile.</div>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const verifyCurrentPassword = async () => {
    setError(null);
    setMessage(null);
    setVerifying(true);
    try {
      await api.post("/auth/verify-password", { currentPassword: form.currentPassword });
      setPasswordVerified(true);
      setMessage("✅ Password verified. You can now set a new password.");
    } catch (err) {
      setError(err.response?.data?.msg || "❌ Password verification failed");
      setPasswordVerified(false);
    } finally {
      setVerifying(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const isChangingPassword = form.password || form.confirmPassword;

    if (isChangingPassword) {
      if (!passwordVerified) {
        setError("Please verify your current password first");
        return;
      }
      if (form.password !== form.confirmPassword) {
        setError("New passwords do not match");
        return;
      }
    }

    try {
      const { username, email, password } = form;
      await api.put("/auth/me", {
        username,
        email,
        password: isChangingPassword ? password : undefined,
      });
      setMessage("🎉 Profile updated successfully!");
      setForm((f) => ({
        ...f,
        currentPassword: "",
        password: "",
        confirmPassword: "",
      }));
      setPasswordVerified(false);
    } catch (err) {
      setError(err.response?.data?.msg || "Update failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 px-4">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-lg ring-1 ring-gray-200 dark:ring-gray-700"
        noValidate
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          My Profile
        </h2>

        {/* Alerts */}
        <AnimatePresence>
          {message && (
            <motion.p
              key="message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 text-center text-green-600 dark:text-green-400 font-medium"
              role="alert"
            >
              {message}
            </motion.p>
          )}
          {error && (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 text-center text-red-600 dark:text-red-400 font-medium"
              role="alert"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Inputs */}
        {["username", "email"].map((field, i) => (
          <div key={field} className="relative z-0 w-full group mt-6 first:mt-0">
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              id={field}
              value={form[field]}
              onChange={handleChange}
              placeholder=" "
              required
              autoComplete={field}
              className="peer block py-3 px-0 w-full text-gray-900 dark:text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 dark:focus:border-indigo-400"
            />
            <label
              htmlFor={field}
              className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 dark:peer-placeholder-shown:text-gray-500"
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
          </div>
        ))}

        {/* Current Password */}
        <div className="relative z-0 w-full group mt-6">
          <input
            type="password"
            name="currentPassword"
            id="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
            placeholder=" "
            className="peer block py-3 px-0 w-full text-gray-900 dark:text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 dark:focus:border-indigo-400"
            autoComplete="current-password"
          />
          <label
            htmlFor="currentPassword"
            className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100"
          >
            Current Password (required to change password)
          </label>

          <button
            type="button"
            onClick={verifyCurrentPassword}
            disabled={!form.currentPassword || verifying}
            className={`mt-3 w-full py-2 rounded-md text-sm font-medium transition ${
              passwordVerified
                ? "bg-green-500 text-white"
                : "bg-indigo-500 hover:bg-indigo-600 text-white disabled:opacity-50"
            }`}
          >
            {passwordVerified ? "Verified ✅" : verifying ? "Verifying..." : "Verify Current Password"}
          </button>
        </div>

        {/* New Passwords */}
        {["password", "confirmPassword"].map((field) => (
          <div key={field} className="relative z-0 w-full group mt-6">
            <input
              type="password"
              name={field}
              id={field}
              value={form[field]}
              onChange={handleChange}
              placeholder=" "
              disabled={!passwordVerified}
              autoComplete="new-password"
              className="peer block py-3 px-0 w-full text-gray-900 dark:text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 dark:focus:border-indigo-400 disabled:opacity-50"
            />
            <label
              htmlFor={field}
              className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100"
            >
              {field === "confirmPassword" ? "Confirm New Password" : "New Password"}
            </label>
          </div>
        ))}

        {/* Submit */}
        <button
          type="submit"
          className="mt-8 w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 rounded-xl text-white font-semibold transition shadow-lg"
        >
          Update Profile
        </button>
      </motion.form>
    </div>
  );
}
