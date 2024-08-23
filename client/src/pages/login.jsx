import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSupabase } from "../supabase/supabaseClient";
import { AuthContext } from "../context/authContext";

const LoginPage = () => {
  // State variables for form inputs and error messages
  const [email, setEmail] = useState(""); // Stores the user's email
  const [password, setPassword] = useState(""); // Stores the user's password
  const [error, setError] = useState(null); // Stores error messages from login attempts
  
  // Context and navigation hooks
  const { isLoggedIn, login } = useContext(AuthContext); // Access authentication context
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Supabase client instance
  const { supabase } = useSupabase();

  // Redirect to user profile page if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/user");
    }
  }, [isLoggedIn, navigate]);

  // Handles form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(null); // Clear any previous errors

    try {
      // Attempt to sign in with Supabase authentication
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        // Set error message if login fails
        setError(error.message);
      } else {
        // On successful login, call the login function from context and navigate to user profile
        login(email);
        navigate("/user");
      }
    } catch (error) {
      // Set a generic error message if an exception occurs
      setError("Error signing in. Please try again.");
    }
  };

  return (
    <div>
      <div className="w-[500px]">
        {/* Breadcrumb navigation */}
        <p>
          Du er her: <Link to="/">Home</Link> / <Link to="/login">Login</Link>
        </p>
        {/* Page heading */}
        <h2 className="text-4xl font-bold mb-4 mt-8">Login</h2>
        {/* Instructions for the user */}
        <p className="text-base mb-3">
          Indtast og send email og password for at logge ind
        </p>
        {/* Login form */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Display error message if any */}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {/* Email input field */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Indtast din email"
            className="bg-[#ececec] px-8 py-4 w-full mb-2 outline-none rounded-lg"
          />
          {/* Password input field */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Indtast dit password"
            className="bg-[#ececec] px-8 py-4 w-full outline-none rounded-lg"
          />
          <div className="flex justify-end items-center mt-6">
            {/* Link to registration page */}
            <p>
              Ikke registreret endnu?{" "}
              <Link to="/register" className="text-blue-400 underline">
                Register
              </Link>
            </p>
            {/* Submit button */}
            <button
              type="submit"
              className="bg-[#5F567B] justify-start py-[7px] px-[57px] ml-3 uppercase font-light rounded-lg text-lg text-white"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
