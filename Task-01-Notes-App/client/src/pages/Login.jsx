import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useTheme } from "../theme/ThemeContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
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
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setServerError(err.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12 overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(90deg,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(#374151_1px,transparent_1px),linear-gradient(90deg,#374151_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
      {/* Decorative Circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-72 h-72 bg-blue-500/10 rounded-full -top-10 -left-10 blur-3xl"></div>
        <div className="absolute w-80 h-80 bg-green-500/10 rounded-full bottom-0 -right-10 blur-3xl"></div>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white dark:bg-gray-800 max-w-md w-full rounded-xl shadow-2xl p-8
          ring-1 ring-gray-200 dark:ring-gray-700"
        noValidate
      >
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-8 text-center">
          Sign In
        </h1>

        {serverError && (
          <div
            className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-sm"
            role="alert"
          >
            {serverError}
          </div>
        )}

        {/* Email */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            className={`peer block py-2.5 px-0 w-full text-gray-900 dark:text-gray-100 bg-transparent border-0 border-b-2
              appearance-none focus:outline-none focus:ring-0
              ${
                errors.email
                  ? "border-red-500 focus:border-red-600"
                  : "border-gray-300 dark:border-gray-600 focus:border-blue-600"
              }`}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          <label
            htmlFor="email"
            className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0
              peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400
              peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 dark:peer-focus:text-blue-400
              pointer-events-none"
          >
            Email
          </label>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600" id="email-error">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="relative z-0 w-full mb-8 group">
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
            className={`peer block py-2.5 px-0 w-full text-gray-900 dark:text-gray-100 bg-transparent border-0 border-b-2
              appearance-none focus:outline-none focus:ring-0
              ${
                errors.password
                  ? "border-red-500 focus:border-red-600"
                  : "border-gray-300 dark:border-gray-600 focus:border-blue-600"
              }`}
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
          <label
            htmlFor="password"
            className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0
              peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400
              peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 dark:peer-focus:text-blue-400
              pointer-events-none"
          >
            Password
          </label>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600" id="password-error">
              {errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-600 hover:bg-blue-700 active:bg-blue-800
            focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500
            text-white font-medium py-3 transition duration-300 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-6 text-gray-600 dark:text-gray-300 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
