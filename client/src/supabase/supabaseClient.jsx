import { createClient } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

// Initialize Supabase client with environment variables
const supabaseUrl = import.meta.env.VITE_API_URL; // URL of the Supabase instance
const supabaseKey = import.meta.env.VITE_API_KEY; // Key for accessing Supabase

// Check if Supabase URL and Key are present
if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL or Key is missing."); // Log error if either value is missing
}

// Create a Supabase client instance
const supabase = createClient(supabaseUrl, supabaseKey);

// Create a React context for Supabase
const SupabaseContext = createContext(); // This context will provide Supabase client to components

// Provider component to wrap around parts of the app needing access to Supabase
export const SupabaseProvider = ({ children }) => {
  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children} {/* Render child components with Supabase client available via context */}
    </SupabaseContext.Provider>
  );
};

// Custom hook to use Supabase context in functional components
export const useSupabase = () => useContext(SupabaseContext); // Access the Supabase client from context
