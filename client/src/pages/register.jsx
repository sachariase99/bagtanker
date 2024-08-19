import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSupabase } from "../supabase/supabaseClient";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const { supabase } = useSupabase();
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccessMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login"); // Redirect to login page after successful registration
        }, 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      setError("Error registering. Please try again.");
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl h-[50vh] mb-8 mx-8 relative">
      <div className="w-1/2 absolute left-1/2 -translate-x-1/2 top-10">
        <h2 className="text-2xl font-bold mb-12">Register</h2>
        <form onSubmit={handleRegister} className="flex flex-col">
          {error && <p style={{ color: "red" }}>{error}</p>}
          {successMessage && (
            <p className="text-green absolute top-2 left-1/2 -translate-x-1/2 bg-[#c2c2c2] py-2 px-4">
              {successMessage}
            </p>
          )}

          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-[1px] px-2 py-1 w-full mb-2 outline-none border-[#C52525] hover:bg-[#eee]"
          />

          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
            className="border-[1px] px-2 py-1 w-full outline-none border-[#C52525] hover:bg-[#eee]"
          />

          <div className="flex items-center mt-6">
            <button
              type="submit"
              className="hover:bg-[#eee] w-1/3 justify-start py-2 mr-3 border-[#C52525] border-[1px] uppercase font-bold"
            >
              Register
            </button>
            <p>
              Already registered?{" "}
              <Link to="/login" className="text-blue-400 underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
