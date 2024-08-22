import { useState, useEffect } from "react";
import { useSupabase } from "../supabase/supabaseClient";

const useProductDetail = (productId) => {
  const { supabase } = useSupabase();
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);

        // Fetch product details
        const { data: productData, error: productError } = await supabase
          .from("products")
          .select("*")
          .eq("id", productId)
          .single();

        if (productError) {
          throw new Error(`Product fetch error: ${productError.message}`);
        }

        // Fetch image details
        if (productData.image_id) {
          const { data: imageData, error: imageError } = await supabase
            .from("images")
            .select("filename")
            .eq("id", productData.image_id)
            .single();

          if (imageError) {
            throw new Error(`Image fetch error: ${imageError.message}`);
          }

          productData.imageFilename = imageData.filename;
        }

        setProduct(productData);

        // Fetch ingredients and units
        const { data: ingredientsData, error: ingredientsError } = await supabase
          .from("ingredients_product_rel")
          .select(`
            amount,
            ordernum,
            ingredient_id,
            unit_id,
            ingredients (title),
            units (abbreviation)
          `)
          .eq("product_id", productId)
          .order("ordernum", { ascending: true });

        if (ingredientsError) {
          throw new Error(`Ingredients fetch error: ${ingredientsError.message}`);
        }
        

        setIngredients(ingredientsData);

        // Fetch comments related to the product
        const { data: commentsData, error: commentsError } = await supabase
          .from("user_comments")
          .select("*")
          .eq("product_id", productId)
          .order("created_at", { ascending: false });

        if (commentsError) {
          throw new Error(`Comments fetch error: ${commentsError.message}`);
        }

        setComments(commentsData);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId, supabase]);

  return { product, comments, ingredients, error, loading };
};

export default useProductDetail;
