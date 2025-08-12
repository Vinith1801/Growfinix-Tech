import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
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

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please login to view your profile.</div>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const verifyCurrentPassword = async () => {
    setError(null);
    setMessage(null);
    setVerifying(true);
    try {
      await api.post("/auth/verify-password", {
        currentPassword: form.currentPassword,
      });
      setPasswordVerified(true);
      setMessage("Password verified. You can now set a new password.");
    } catch (err) {
      setError(err.response?.data?.msg || "Password verification failed");
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
      setMessage("Profile updated successfully");
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
    <div className="min-h-screen flex items-center justify-center bg-white/70 dark:bg-gray-900/90 backdrop-blur-md transition-colors duration-300 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-md ring-1 ring-gray-200 dark:ring-gray-700"
        noValidate
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100 text-center">
          My Profile
        </h2>

        {message && (
          <p className="mb-4 text-center text-green-600 dark:text-green-400 font-medium" role="alert">
            {message}
          </p>
        )}
        {error && (
          <p className="mb-4 text-center text-red-600 dark:text-red-400 font-medium" role="alert">
            {error}
          </p>
        )}

        {/* Username */}
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="username"
            id="username"
            value={form.username}
            onChange={handleChange}
            placeholder=" "
            required
            className="block py-2.5 px-0 w-full text-gray-900 dark:text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 dark:focus:border-blue-400"
            autoComplete="username"
          />
          <label htmlFor="username" className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 pointer-events-none">
            Username
          </label>
        </div>

        {/* Email */}
        <div className="relative z-0 w-full group mt-6">
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            placeholder=" "
            required
            className="block py-2.5 px-0 w-full text-gray-900 dark:text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 dark:focus:border-blue-400"
            autoComplete="email"
          />
          <label htmlFor="email" className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 pointer-events-none">
            Email
          </label>
        </div>

        {/* Current Password */}
        <div className="relative z-0 w-full group mt-6">
          <input
            type="password"
            name="currentPassword"
            id="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
            placeholder=" "
            className="block py-2.5 px-0 w-full text-gray-900 dark:text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 dark:focus:border-blue-400"
            autoComplete="current-password"
          />
          <label htmlFor="currentPassword" className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 pointer-events-none">
            Current Password (required to change password)
          </label>
          <button
            type="button"
            onClick={verifyCurrentPassword}
            disabled={!form.currentPassword || verifying}
            className="mt-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md text-sm disabled:opacity-50"
          >
            {verifying ? "Verifying..." : "Verify Current Password"}
          </button>
        </div>

        {/* New Password */}
        <div className="relative z-0 w-full group mt-6">
          <input
            type="password"
            name="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            placeholder=" "
            disabled={!passwordVerified}
            className="block py-2.5 px-0 w-full text-gray-900 dark:text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 dark:focus:border-blue-400 disabled:opacity-50"
            autoComplete="new-password"
          />
          <label htmlFor="password" className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 pointer-events-none">
            New Password
          </label>
        </div>

        {/* Confirm Password */}
        <div className="relative z-0 w-full group mt-6">
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder=" "
            disabled={!passwordVerified}
            className="block py-2.5 px-0 w-full text-gray-900 dark:text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 dark:focus:border-blue-400 disabled:opacity-50"
            autoComplete="new-password"
          />
          <label htmlFor="confirmPassword" className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 pointer-events-none">
            Confirm New Password
          </label>
        </div>

        <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-500 mt-8">
          Update Profile
        </button>
      </form>
    </div>
  );
}
