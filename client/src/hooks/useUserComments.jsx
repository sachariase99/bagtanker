import { useState, useEffect, useCallback } from 'react';
import { useSupabase } from '../supabase/supabaseClient';

const useUserComments = (userId) => {
  const { supabase } = useSupabase();
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchComments = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

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
        throw commentsError;
      }

      setComments(commentsData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [supabase, userId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return { comments, error, loading, refetch: fetchComments }; // Add refetch
};

export default useUserComments;
