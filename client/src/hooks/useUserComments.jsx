import { useState, useEffect, useCallback } from 'react';
import { useSupabase } from '../supabase/supabaseClient';

const useUserComments = (userId) => {
  const { supabase } = useSupabase(); // Retrieve Supabase client instance
  const [comments, setComments] = useState([]); // Stores the list of user comments
  const [error, setError] = useState(null); // Stores error messages if any
  const [loading, setLoading] = useState(true); // Indicates if data is being fetched

  // Callback function to fetch comments from Supabase
  const fetchComments = useCallback(async () => {
    if (!userId) {
      setLoading(false); // If no user ID is provided, exit early
      return;
    }

    try {
      setLoading(true); // Set loading state to true before fetching data

      // Fetch user comments from Supabase
      const { data: commentsData, error: commentsError } = await supabase
        .from('user_comments')
        .select(`
          id,
          title,
          comment,
          user_id,
          product_id,
          created_at,
          is_active,
          firstname,
          lastname
        `)
        .eq('user_id', userId);

      if (commentsError) {
        throw commentsError; // Throw error if fetching fails
      }

      setComments(commentsData); // Update state with fetched comments
    } catch (error) {
      setError(error.message); // Set error message if an error occurs
    } finally {
      setLoading(false); // Set loading state to false after fetching is complete
    }
  }, [supabase, userId]); // Dependencies: supabase and userId

  useEffect(() => {
    fetchComments(); // Fetch comments when the component mounts or userId changes
  }, [fetchComments]); // Dependency: fetchComments function

  return { comments, error, loading, refetch: fetchComments }; // Return comments, error, loading state, and refetch function
};

export default useUserComments;
