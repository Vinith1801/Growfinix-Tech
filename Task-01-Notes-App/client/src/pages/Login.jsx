import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useTheme } from "../theme/ThemeContext";
import { useLocation, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

export default function Login() {
  const { login } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Enter a valid email";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setServerError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const res = await login(email.trim(), password);
      if (res?.success) {
        toast.success("Welcome back!");
        navigate(from, { replace: true });
        return;
      }
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      const msg = err?.response?.data?.msg || err.message || "Failed to login";
      setServerError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 px-4 py-12 overflow-hidden">
      {/* Background accents */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-300/20 rounded-full blur-2xl animate-pulse-slow"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white dark:bg-gray-800 max-w-md w-full rounded-2xl shadow-2xl p-10 ring-1 ring-gray-200 dark:ring-gray-700 flex flex-col gap-6"
        noValidate
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-6">
          Sign In
        </h1>

        {serverError && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded text-sm animate-fade-in" role="alert" aria-live="polite">
            {serverError}
          </div>
        )}

        {/* Email Input */}
        <div className="relative w-full">
          <input
            type="email"
            id="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setErrors(validate())}
            placeholder=" "
            className={`peer block w-full border-b-2 py-2 px-0 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-600 transition ${
              errors.email ? "border-red-500 focus:border-red-600" : "border-gray-300 dark:border-gray-600"
            }`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-gray-500 peer-focus:text-sm">
            Email
          </label>
          {errors.email && <p className="mt-1 text-sm text-red-600" id="email-error">{errors.email}</p>}
        </div>

        {/* Password Input with Show/Hide toggle */}
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setErrors(validate())}
            placeholder=" "
            className={`peer block w-full border-b-2 py-2 px-0 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-600 transition ${
              errors.password ? "border-red-500 focus:border-red-600" : "border-gray-300 dark:border-gray-600"
            }`}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
          <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-gray-500 peer-focus:text-sm">
            Password
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
            tabIndex={0}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
          </button>
          {errors.password && <p className="mt-1 text-sm text-red-600" id="password-error">{errors.password}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 dark:active:bg-blue-900 text-white font-medium rounded-xl shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-gray-600 dark:text-gray-300 text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 dark:text-blue-400 hover:underline transition">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
