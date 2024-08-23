import { useState, useEffect } from "react";
import { useSupabase } from "../supabase/supabaseClient";

// Custom hook to fetch and manage detailed information about a product
const useProductDetail = (productId) => {
  // Retrieve the Supabase client instance
  const { supabase } = useSupabase();

  // State variables for storing product details, comments, ingredients, loading state, and errors
  const [product, setProduct] = useState(null); // Stores detailed information about the product
  const [comments, setComments] = useState([]); // Stores comments related to the product
  const [ingredients, setIngredients] = useState([]); // Stores ingredients associated with the product
  const [loading, setLoading] = useState(true); // Indicates if data is being fetched
  const [error, setError] = useState(null); // Stores error messages if any

  // Function to fetch detailed information about the product
  const fetchProductDetail = async () => {
    try {
      setLoading(true); // Set loading state to true before fetching data

      // Fetch product details from Supabase, including related category information
      const { data: productData, error: productError } = await supabase
        .from("products")
        .select("*, category_product_rel ( categories ( title ) )")
        .eq("id", productId)
        .single();

      if (productError) {
        throw new Error(`Product fetch error: ${productError.message}`);
      }

      // Extract category title and attach it to the product data
      const categoryTitle = productData?.category_product_rel?.[0]?.categories?.title || "Unknown Category";
      productData.productType = categoryTitle;

      // Fetch product image filename if image ID is present
      if (productData.image_id) {
        const { data: imageData, error: imageError } = await supabase
          .from("images")
          .select("filename")
          .eq("id", productData.image_id)
          .single();

        if (imageError) {
          throw new Error(`Image fetch error: ${imageError.message}`);
        }

        // Attach the image filename to the product data
        productData.imageFilename = imageData.filename;
      }

      // Update state with the fetched product details
      setProduct(productData);

      // Fetch ingredients related to the product
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

      // Update state with the fetched ingredients
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

      // Update state with the fetched comments
      setComments(commentsData);
    } catch (error) {
      // Set error message if any error occurs during data fetching
      setError(error.message);
    } finally {
      // Set loading state to false once data fetching is complete
      setLoading(false);
    }
  };

  // Function to refresh comments data
  const refreshComments = async () => {
    try {
      // Fetch comments related to the product again
      const { data: commentsData, error: commentsError } = await supabase
        .from("user_comments")
        .select("*")
        .eq("product_id", productId)
        .order("created_at", { ascending: false });

      if (commentsError) {
        throw new Error(`Comments fetch error: ${commentsError.message}`);
      }

      // Update state with the refreshed comments
      setComments(commentsData);
    } catch (error) {
      // Set error message if any error occurs during comments fetching
      setError(error.message);
    }
  };

  // Effect hook to fetch product details when the component mounts or productId changes
  useEffect(() => {
    fetchProductDetail(); // Call the function to fetch product details
  }, [productId, supabase]); // Re-run effect if productId or Supabase instance changes

  // Return product details, comments, ingredients, error message, loading state, and refreshComments function
  return { product, comments, ingredients, error, loading, refreshComments };
};

export default useProductDetail;
