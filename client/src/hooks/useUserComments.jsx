import { useState, useEffect } from 'react';
import { useSupabase } from '../supabase/supabaseClient';

const useUserComments = (userId) => {
  const { supabase } = useSupabase();
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);

        // Fetch comments for the user
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

        // Set the fetched comments to state
        setComments(commentsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [supabase, userId]);

  return { comments, error, loading };
};

export default useUserComments;
