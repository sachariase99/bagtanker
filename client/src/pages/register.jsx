import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSupabase } from "../supabase/supabaseClient";

const RegisterPage = () => {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [error, setError] = useState(null); // State for error messages
  const [successMessage, setSuccessMessage] = useState(null); // State for success messages
  const { supabase } = useSupabase(); // Access Supabase client
  const navigate = useNavigate(); // Hook for navigation

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(null); // Clear previous errors
    setSuccessMessage(null); // Clear previous success messages

    try {
      const { error } = await supabase.auth.signUp({ email, password });

      if (error) {
        setError(error.message); // Set error message if registration fails
      } else {
        setSuccessMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login"); // Redirect to login after 2 seconds
        }, 2000);
      }
    } catch {
      setError("Error registering. Please try again."); // Set error message for any other errors
    }
  };

  return (
    <div className="w-[500px] mx-auto my-8 p-4 border border-gray-300 rounded-lg shadow-md">
      {/* Breadcrumb Navigation */}
      <p>
        Du er her: <Link to="/">Home</Link> / <Link to="/register">Registrer</Link>
      </p>
      <h2 className="text-4xl font-bold mb-4 mt-8">Registrer</h2>
      <p className="text-base mb-3">Indtast og send email og password for at registrere</p>
      <form onSubmit={handleRegister} className="flex flex-col">
        {/* Display error message if any */}
        {error && <p className="text-red-500">{error}</p>}
        {/* Display success message if any */}
        {successMessage && (
          <p className="text-green-500 bg-gray-200 py-2 px-4 rounded-md">
            {successMessage}
          </p>
        )}
        {/* Email input */}
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Indtast din email"
          className="bg-[#ececec] px-4 py-2 w-full mb-2 outline-none rounded-lg"
        />
        {/* Password input */}
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="6"
          placeholder="Indtast dit password"
          className="bg-[#ececec] px-4 py-2 w-full outline-none rounded-lg"
        />
        {/* Submit button and login link */}
        <div className="flex justify-between items-center mt-6">
          <p>
            Allerede registreret?{" "}
            <Link to="/login" className="text-blue-400 underline">Login</Link>
          </p>
          <button
            type="submit"
            className="bg-[#5F567B] py-2 px-6 rounded-lg text-lg text-white"
          >
            Registrer
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
