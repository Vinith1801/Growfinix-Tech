import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useTheme } from "../theme/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup() {
  const { signup } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Enter a valid email";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (confirm !== password) newErrors.confirm = "Passwords do not match";
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
      const res = await signup(email.trim(), password);
      if (!res || !res.success) {
        const msg = res?.message || "Signup failed";
        setServerError(msg);
        toast.error(msg);
        return;
      }
      toast.success("Account created — welcome!");
      navigate("/dashboard");
    } catch (err) {
      const msg = err?.response?.data?.msg || err.message || "Failed to create account";
      setServerError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12 overflow-hidden">
      {/* ...background omitted for brevity... */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 max-w-md w-full rounded-lg shadow-lg p-8 ring-1 ring-gray-200 dark:ring-gray-700 relative z-10"
        noValidate
      >
        <h1 className="text-3xl font-medium text-gray-900 dark:text-gray-100 mb-8 text-center">Sign Up</h1>

        {serverError && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-sm" role="alert" aria-live="polite">
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
            onBlur={() => setErrors(validate())}
            placeholder=" "
            className={`peer block py-2.5 px-0 w-full text-gray-900 dark:text-gray-100 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${
              errors.email ? "border-red-500 focus:border-red-600" : "border-gray-300 dark:border-gray-600 focus:border-blue-600"
            }`}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          <label htmlFor="email" className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 pointer-events-none">Email</label>
          {errors.email && <p className="mt-1 text-sm text-red-600" id="email-error">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setErrors(validate())}
            placeholder=" "
            className={`peer block py-2.5 px-0 w-full text-gray-900 dark:text-gray-100 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${
              errors.password ? "border-red-500 focus:border-red-600" : "border-gray-300 dark:border-gray-600 focus:border-blue-600"
            }`}
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
          <label htmlFor="password" className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 pointer-events-none">Password</label>
          {errors.password && <p className="mt-1 text-sm text-red-600" id="password-error">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div className="relative z-0 w-full mb-8 group">
          <input
            type="password"
            name="confirm"
            id="confirm"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            onBlur={() => setErrors(validate())}
            placeholder=" "
            className={`peer block py-2.5 px-0 w-full text-gray-900 dark:text-gray-100 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${
              errors.confirm ? "border-red-500 focus:border-red-600" : "border-gray-300 dark:border-gray-600 focus:border-blue-600"
            }`}
            aria-invalid={errors.confirm ? "true" : "false"}
            aria-describedby={errors.confirm ? "confirm-error" : undefined}
          />
          <label htmlFor="confirm" className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 pointer-events-none">Confirm Password</label>
          {errors.confirm && <p className="mt-1 text-sm text-red-600" id="confirm-error">{errors.confirm}</p>}
        </div>

        <button type="submit" disabled={loading} className="w-full rounded-md bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500 text-white font-medium py-3 transition duration-300 disabled:opacity-50">
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="text-center mt-6 text-gray-600 dark:text-gray-300 text-sm">
          Already have an account? <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">Sign in</Link>
        </p>
      </form>
    </div>
  );
}
