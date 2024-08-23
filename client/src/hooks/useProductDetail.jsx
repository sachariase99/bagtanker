import { useState, useEffect } from "react";
import { useSupabase } from "../supabase/supabaseClient";

const useProductDetail = (productId) => {
  const { supabase } = useSupabase();
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductDetail = async () => {
    try {
      setLoading(true);

      const { data: productData, error: productError } = await supabase
        .from("products")
        .select("*, category_product_rel ( categories ( title ) )")
        .eq("id", productId)
        .single();

      if (productError) {
        throw new Error(`Product fetch error: ${productError.message}`);
      }

      const categoryTitle = productData?.category_product_rel?.[0]?.categories?.title || "Unknown Category";
      productData.productType = categoryTitle;

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
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshComments = async () => {
    try {
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
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, [productId, supabase]);

  return { product, comments, ingredients, error, loading, refreshComments };
};

export default useProductDetail;
