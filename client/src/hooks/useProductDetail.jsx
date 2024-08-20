// src/hooks/useProductDetail.js
import { useState, useEffect } from "react";
import { useSupabase } from '../supabase/supabaseClient';

const useProductDetail = (productId) => {
  const { supabase } = useSupabase();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        // Fetch product details
        const { data: productData, error: productError } = await supabase
          .from("products")
          .select(`
            id,
            image_id,
            title,
            teaser,
            description,
            duration,
            amount,
            price
          `)
          .eq("id", productId)
          .single();

        if (productError) {
          throw new Error(`Product fetch error: ${productError.message}`);
        }

        // Fetch image details
        const { data: imagesData, error: imagesError } = await supabase
          .from("images")
          .select("id, filename")
          .eq("id", productData.image_id)
          .single();

        if (imagesError) {
          throw new Error(`Images fetch error: ${imagesError.message}`);
        }

        // Combine product with its corresponding image filename
        const productWithImage = {
          ...productData,
          imageFilename: imagesData.filename || null,
        };

        setProduct(productWithImage);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId, supabase]);

  return { product, loading, error };
};

export default useProductDetail;
