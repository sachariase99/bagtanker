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
    <div className="bg-white p-4 rounded-xl h-[50vh] mb-8 mx-8 relative">
      <div className="w-1/2 absolute left-1/2 -translate-x-1/2 top-10">
        <h2 className="text-2xl font-bold mb-12">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          {error && <p style={{ color: "red" }}>{error}</p>}
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="hover:bg-[#eee] border-[#C52525] border-[1px] px-2 py-1 w-full mb-2 outline-none"
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="hover:bg-[#eee] border-[#C52525] border-[1px] px-2 py-1 w-full outline-none"
          />
          <div className="flex items-center mt-6">
            <button
              type="submit"
              className="hover:bg-[#eee] w-1/3 justify-start py-2 border-[#C52525] border-[1px] uppercase font-bold mr-3"
            >
              Log in
            </button>
            <p>
              Not registered yet? <Link to="/register" className="text-blue-400 underline">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
