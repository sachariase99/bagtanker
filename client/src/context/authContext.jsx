import { createContext, useState, useEffect } from "react";
import { useSupabase } from "../supabase/supabaseClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { supabase } = useSupabase(); // Get the supabase instance
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);  // Add userEmail state

  useEffect(() => {
    if (!supabase) return; // Check if supabase is initialized

    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session && session.user) {
          setIsLoggedIn(true);
          setUserId(session.user.id);
          setUserEmail(session.user.email);  // Set userEmail from session
        }
      } catch (error) {
        console.error("Error checking session:", error.message);
      }
    };

    checkSession();

    // Subscribe to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session && session.user) {
          setIsLoggedIn(true);
          setUserId(session.user.id);
          setUserEmail(session.user.email);  // Set userEmail on auth state change
        } else {
          setIsLoggedIn(false);
          setUserId(null);
          setUserEmail(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]); // Ensure supabase is included in the dependency array

  const login = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
  };
  
  const logout = async () => {
    await supabase.auth.signOut(); // Sign out the user from Supabase
    setIsLoggedIn(false);
    setUserId(null);
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
