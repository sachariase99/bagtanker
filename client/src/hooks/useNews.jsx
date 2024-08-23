import { useState, useEffect } from 'react';
import { useSupabase } from '../supabase/supabaseClient';

// Custom hook to fetch and manage news data
const useNews = () => {
  // Retrieve the Supabase client instance
  const { supabase } = useSupabase();

  // State variables for storing news data, errors, and loading status
  const [news, setNews] = useState([]); // Array to store fetched news articles
  const [error, setError] = useState(null); // Stores error messages
  const [loading, setLoading] = useState(true); // Indicates if data is being fetched

  // Effect hook to fetch news data when the component mounts
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true); // Set loading state to true before fetching data

        // Fetch news articles from Supabase
        const { data: newsData, error: newsError } = await supabase
          .from('news')
          .select(`
            id,
            title,
            teaser,
            content,
            image_id,
            created_at
          `);

        if (newsError) {
          throw newsError; // Throw error if fetching news fails
        }

        // Extract image IDs from news articles
        const imageIds = newsData.map(item => item.image_id).filter(id => id);

        // Fetch image filenames corresponding to the extracted image IDs
        const { data: imagesData, error: imagesError } = await supabase
          .from('images')
          .select('id, filename')
          .in('id', imageIds);

        if (imagesError) {
          throw imagesError; // Throw error if fetching images fails
        }

        // Map image IDs to filenames for easy lookup
        const imagesMap = imagesData.reduce((acc, image) => {
          acc[image.id] = image.filename;
          return acc;
        }, {});

        // Combine news articles with their corresponding image filenames
        const newsWithImages = newsData.map(newsItem => ({
          ...newsItem, // Spread existing news item properties
          imageFilename: imagesMap[newsItem.image_id] || null // Add image filename or null if no image
        }));

        setNews(newsWithImages); // Update state with news articles and image filenames
      } catch (error) {
        setError(error.message); // Set error message if an exception occurs
      } finally {
        setLoading(false); // Set loading state to false once data fetching is complete
      }
    };

    fetchNews(); // Call the function to fetch news data
  }, [supabase]); // Dependency array: re-run effect if Supabase instance changes

  // Return news data, error, and loading status
  return { news, error, loading };
};

export default useNews;
