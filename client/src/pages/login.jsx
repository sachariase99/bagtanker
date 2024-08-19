import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSupabase } from "../supabase/supabaseClient";
import { AuthContext } from "../context/authContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { isLoggedIn, login, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate

  // Destructure the supabase instance from the useSupabase hook
  const { supabase } = useSupabase();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/user"); // Redirect to user page if already logged in
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        login(email); // Call login from AuthContext with the user's email
        navigate("/user"); // Redirect to user page after successful login
      }
    } catch (error) {
      setError("Error signing in. Please try again.");
    }
  };

  return (
    <div className="w-full">
      <div className="w-[500px] mx-64">
        <p className="mt-4">Du er her: <Link to="/">Home</Link> / <Link to="/login">Login</Link></p>
        <h2 className="text-4xl font-bold mb-4 mt-8">Login</h2>
        <p className="text-base mb-3">
          Indtast og send email og password for at logge ind
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col">
          {error && <p style={{ color: "red" }}>{error}</p>}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Indtast din email"
            className="bg-[#ececec] px-8 py-4 w-full mb-2 outline-none rounded-lg"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Indtast dit password"
            className="bg-[#ececec] px-8 py-4 w-full outline-none rounded-lg"
          />
          <div className="flex justify-end items-center mt-6">
            <p>
              Ikke registreret endnu?{" "}
              <Link to="/register" className="text-blue-400 underline">
                Register
              </Link>
            </p>
            <button
              type="submit"
              className="bg-[#5F567B] justify-start py-[7px] px-[57px] ml-3 uppercase font-bold rounded-lg text-lg text-white"
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
