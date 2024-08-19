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
    <div className="w-full">
      <div className="w-[500px] mx-64">
        <p className="mt-4">
          Du er her: <Link to="/">Home</Link> / <Link to="/register">Registrer</Link>
        </p>
        <h2 className="text-4xl font-bold mb-4 mt-8">Login</h2>
        <p className="text-base mb-3">
          Indtast og send email og password for at registrere
        </p>
        <form onSubmit={handleRegister} className="flex flex-col">
          {error && <p style={{ color: "red" }}>{error}</p>}
          {successMessage && (
            <p className="text-green absolute top-2 left-1/2 -translate-x-1/2 bg-[#c2c2c2] py-2 px-4">
              {successMessage}
            </p>
          )}
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Indtast din email"
            className="bg-[#ececec] px-8 py-4 w-full mb-2 outline-none rounded-lg"
          />
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
            placeholder="Indtast dit password"
            className="bg-[#ececec] px-8 py-4 w-full mb-2 outline-none rounded-lg"
          />
          <div className="flex justify-end items-center mt-6">
            <p>
              Allerede registreret?{" "}
              <Link to="/login" className="text-blue-400 underline">
                Login
              </Link>
            </p>
            <button
              type="submit"
              className="bg-[#5F567B] justify-start py-[7px] px-[57px] ml-3 uppercase font-bold rounded-lg text-lg text-white"
            >
              Registrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
