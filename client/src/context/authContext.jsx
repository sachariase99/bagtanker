import { createContext, useState, useEffect } from "react";
import { useSupabase } from "../supabase/supabaseClient";

// Create a context for authentication state
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Retrieve Supabase client instance
  const { supabase } = useSupabase();

  // State to track user authentication status and details
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Indicates if the user is logged in
  const [userId, setUserId] = useState(null); // Stores user ID
  const [userEmail, setUserEmail] = useState(null); // Stores user email

  // Effect to check session on component mount and handle auth state changes
  useEffect(() => {
    // Exit early if Supabase client is not available
    if (!supabase) return;

    // Function to check user session
    const checkSession = async () => {
      try {
        // Get the current session from Supabase
        const { data: { session } } = await supabase.auth.getSession();
        // Update state based on session information
        if (session && session.user) {
          setIsLoggedIn(true);
          setUserId(session.user.id);
          setUserEmail(session.user.email);
        }
      } catch (error) {
        // Log error if session check fails
        console.error("Error checking session:", error.message);
      }
    };

    checkSession();

    // Set up an auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // Update state based on auth state changes
        if (session && session.user) {
          setIsLoggedIn(true);
          setUserId(session.user.id);
          setUserEmail(session.user.email);
        } else {
          setIsLoggedIn(false);
          setUserId(null);
          setUserEmail(null);
        }
      }
    );

    // Cleanup function to unsubscribe from auth state changes on component unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]); // Re-run effect if Supabase instance changes

  // Function to log in a user (for demo purposes; actual implementation might vary)
  const login = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  // Function to log out a user
  const logout = async () => {
    await supabase.auth.signOut(); // Sign out from Supabase
    setIsLoggedIn(false);
    setUserId(null);
    setUserEmail(null);
  };

  // Provide authentication state and functions to child components
  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
