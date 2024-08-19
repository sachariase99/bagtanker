import { createClient } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

// Initialize Supabase client once
const supabaseUrl = 'https://rtxzxxfbcvebgwfocgla.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0eHp4eGZiY3ZlYmd3Zm9jZ2xhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwNDg5OTQsImV4cCI6MjAzOTYyNDk5NH0.DmkE2lQ7r4QoizI04-jG4Y0Hk66ZXXtWlsYe1vWXo_Q';
const supabase = createClient(supabaseUrl, supabaseKey);

const SupabaseContext = createContext();

export const SupabaseProvider = ({ children }) => {
  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => useContext(SupabaseContext);
