// client/src/utils/validators.js

// Regex for email and password
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

/**
 * Validate email format
 */
export const validateEmail = (email) => {
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Enter a valid email address";
  return null;
};

/**
 * Validate password strength
 * - At least 8 chars
 * - At least one uppercase, lowercase, number, special char
 */
export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (!passwordRegex.test(password)) {
    return "Password must be 8+ chars, include uppercase, number, and special character";
  }
  return null;
};

/**
 * Validate confirm password matches
 */
export const validateConfirmPassword = (password, confirm) => {
  if (!confirm) return "Confirm password is required";
  if (password !== confirm) return "Passwords do not match";
  return null;
};

/**
 * Validate Signup form
 */
export const validateSignup = ({ email, password, confirm }) => {
  const errors = {};
  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;

  const confirmError = validateConfirmPassword(password, confirm);
  if (confirmError) errors.confirm = confirmError;

  return errors;
};

/**
 * Validate Login form
 */
export const validateLogin = ({ email, password }) => {
  const errors = {};
  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;

  const passwordError = password ? null : "Password is required";
  if (passwordError) errors.password = passwordError;

  return errors;
};

/**
 * Password strength indicator (for UI)
 * Returns: "Weak" | "Medium" | "Strong"
 */
export const getPasswordStrength = (password) => {
  if (!password) return "";
  if (password.length < 6) return "Weak";
  if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password)) return "Medium";
  if (passwordRegex.test(password)) return "Strong";
  return "Weak";
};
