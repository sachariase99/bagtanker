import { useState, useEffect } from "react";
import { useSupabase } from "../supabase/supabaseClient";

const useProducts = () => {
  const { supabase } = useSupabase(); // Access Supabase from context
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Fetch news items
        const { data: productsData, error: productsError } =
          await supabase.from("products").select(`
            id,
            image_id,
            title,
            teaser,
            description,
            duration,
            amount,
            price
          `);

        if (productsError) {
          throw productsError;
        }

        // Fetch image details
        const imageIds = productsData
          .map((item) => item.image_id)
          .filter((id) => id);
        const { data: imagesData, error: imagesError } = await supabase
          .from("images")
          .select("id, filename")
          .in("id", imageIds);

        if (imagesError) {
          throw imagesError;
        }

        // Create a map of image IDs to filenames
        const imagesMap = imagesData.reduce((acc, image) => {
          acc[image.id] = image.filename;
          return acc;
        }, {});

        // Combine news items with their corresponding image filenames
        const productsWithImages = productsData.map((productsItem) => ({
          ...productsItem,
          imageFilename: imagesMap[productsItem.image_id] || null,
        }));

        setProducts(productsWithImages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [supabase]);

  return { products, error, loading };
};

export default useProducts;
