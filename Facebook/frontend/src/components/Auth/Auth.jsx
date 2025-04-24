import { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  User,
  AlertCircle
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { signin, signup } from '../../actions/Auth';
import { useNavigate } from 'react-router-dom';

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const initialErrors = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  general: "",
};

const Input = ({ 
  name, 
  label, 
  type, 
  handleChange, 
  handleShowPassword, 
  half, 
  value,
  Icon,
  error
}) => {
  const [showText, setShowText] = useState(false);

  const toggleVisibility = () => {
    if (handleShowPassword) {
      handleShowPassword();
      setShowText(!showText);
    }
  };

  return (
    <div className={`relative ${half ? 'w-full' : 'w-full'}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className={`h-5 w-5 ${error ? 'text-red-400' : 'text-gray-400'}`} />
        </div>
        {type === 'password' && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={toggleVisibility}
          >
            {showText ? 
              <EyeOff className="h-5 w-5 text-gray-400" /> : 
              <Eye className="h-5 w-5 text-gray-400" />
            }
          </button>
        )}
        <input
          name={name}
          type={type === 'password' ? (showText ? 'text' : 'password') : type}
          id={name}
          onChange={handleChange}
          required
          className={`block w-full pl-10 pr-10 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm
            ${error ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'}`}
          placeholder={label}
          value={value}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Invalid email format";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const validateName = (name, field) => {
    if (!name) return `${field} is required`;
    if (name.length < 2) return `${field} must be at least 2 characters`;
    return "";
  };

  const validateForm = () => {
    const newErrors = { ...initialErrors };
    
    if (isSignUp) {
      newErrors.firstName = validateName(formData.firstName, "First name");
      newErrors.lastName = validateName(formData.lastName, "Last name");
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    newErrors.email = validateEmail(formData.email);
    newErrors.password = validatePassword(formData.password);

    setErrors(newErrors);

    return !Object.values(newErrors).some(error => error !== "");
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
    setFormData(initialState);
    setErrors(initialErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setErrors(prev => ({
        ...prev,
        general: "Please fix all errors before submitting"
      }));
      return;
    }

    setIsSubmitting(true);
    setErrors(initialErrors);

    try {
      if (isSignUp) {
        await dispatch(signup(formData, navigate));
      } else {
        await dispatch(signin(formData, navigate));
      }
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        general: error.message || "An error occurred. Please try again."
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear the error for the field being changed
    setErrors(prev => ({ ...prev, [name]: "", general: "" }));
    
    // Real-time validation
    if (name === "email") {
      setErrors(prev => ({ ...prev, email: validateEmail(value) }));
    } else if (name === "password") {
      setErrors(prev => ({ ...prev, password: validatePassword(value) }));
    } else if (name === "confirmPassword" && value !== formData.password) {
      setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
    } else if (name.includes("Name")) {
      setErrors(prev => ({ ...prev, [name]: validateName(value, name.replace("Name", " name")) }));
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="-mt-28 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="flex justify-center">
              <div className="h-14 w-14 rounded-full bg-blue-500 flex items-center justify-center">
                <Lock className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="mt-6 mb-2 text-center text-3xl font-extrabold text-gray-900">
              {isSignUp ? "Sign Up" : "Sign In"}
            </h2>
          </div>

          {errors.general && (
            <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{errors.general}</p>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="flex space-x-4">
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                  Icon={User}
                  value={formData.firstName}
                  error={errors.firstName}
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                  Icon={User}
                  value={formData.lastName}
                  error={errors.lastName}
                />
              </div>
            )}

            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
              Icon={Mail}
              value={formData.email}
              error={errors.email}
            />

            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type="password"
              handleShowPassword={handleShowPassword}
              Icon={Lock}
              value={formData.password}
              error={errors.password}
            />

            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
                Icon={Lock}
                value={formData.confirmPassword}
                error={errors.confirmPassword}
              />
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : (isSignUp ? "Sign Up" : "Sign In")}
            </button>

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={switchMode}
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
                disabled={isSubmitting}
              >
                {isSignUp
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;