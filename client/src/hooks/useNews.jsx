// src/hooks/useNews.js
import { useState, useEffect } from 'react';
import { useSupabase } from '../supabase/supabaseClient';

const useNews = () => {
  const { supabase } = useSupabase(); // Access Supabase from context
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        console.log('Fetching news...');
        setLoading(true);

        // Fetch news items
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
          console.error('Error fetching news:', newsError.message);
          throw newsError;
        }

        console.log('News fetched successfully:', newsData);

        // Fetch image details
        const imageIds = newsData.map(item => item.image_id).filter(id => id);
        const { data: imagesData, error: imagesError } = await supabase
          .from('images')
          .select('id, filename')
          .in('id', imageIds);

        if (imagesError) {
          console.error('Error fetching images:', imagesError.message);
          throw imagesError;
        }

        console.log('Images fetched successfully:', imagesData);

        // Create a map of image IDs to filenames
        const imagesMap = imagesData.reduce((acc, image) => {
          acc[image.id] = image.filename;
          return acc;
        }, {});

        // Combine news items with their corresponding image filenames
        const newsWithImages = newsData.map(newsItem => ({
          ...newsItem,
          imageFilename: imagesMap[newsItem.image_id] || null
        }));

        setNews(newsWithImages);
      } catch (error) {
        console.error('Error in fetchNews:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
        console.log('Loading state updated to false.');
      }
    };

    fetchNews();
  }, [supabase]);

  console.log('useNews hook called:', { news, error, loading });

  return { news, error, loading };
};

export default useNews;
