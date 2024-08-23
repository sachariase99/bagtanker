import { useState, useEffect } from "react";
import { useSupabase } from '../supabase/supabaseClient';

// Mapping of product types to category titles
const categoryMapping = {
  "Rundstykker": ["Morgenbrød"],
};

// Custom hook to fetch and manage product data
const useProducts = (productType, sortOption) => {
  const { supabase } = useSupabase(); // Retrieve Supabase client instance
  const [products, setProducts] = useState([]); // Stores the list of products
  const [loading, setLoading] = useState(true); // Indicates if data is being fetched
  const [error, setError] = useState(null); // Stores error messages if any

  useEffect(() => {
    // Function to fetch products based on product type and sorting option
    const fetchProducts = async () => {
      try {
        setLoading(true); // Set loading state to true before fetching data

        // Capitalize the first letter of the product type
        const formattedProductType = productType.charAt(0).toUpperCase() + productType.slice(1);
        
        // Determine the categories to fetch based on the product type
        const categoriesToFetch = categoryMapping[formattedProductType] || [formattedProductType];

        // Fetch category details from Supabase
        const { data: categories, error: categoryError } = await supabase
          .from("categories")
          .select("id, title")
          .in("title", categoriesToFetch);

        if (categoryError) {
          throw new Error(`Category fetch error: ${categoryError.message}`);
        }

        // Handle case where no categories are found
        if (categories.length === 0) {
          setError(`No categories found for titles ${categoriesToFetch.join(', ')}`);
          setProducts([]);
          return;
        }

        // Extract category IDs from the fetched categories
        const categoryIds = categories.map(category => category.id);

        // Fetch product-category relationships from Supabase
        const { data: productRel, error: productRelError } = await supabase
          .from("category_product_rel")
          .select("products(*)")
          .in("category_id", categoryIds);

        if (productRelError) {
          throw new Error(`Products fetch error: ${productRelError.message}`);
        }

        // Flatten the product-category relationship data to get a list of products
        const productsData = productRel.flatMap((rel) => rel.products);
        const productIds = productsData.map(product => product.id);

        // Handle case where no products are found
        if (productIds.length === 0) {
          setProducts([]);
          return;
        }

        // Fetch image details for the products from Supabase
        const { data: imagesData, error: imagesError } = await supabase
          .from("images")
          .select("id, filename")
          .in("id", productsData.map(product => product.image_id).filter(id => id));

        if (imagesError) {
          throw new Error(`Images fetch error: ${imagesError.message}`);
        }

        // Map image IDs to filenames
        const imagesMap = imagesData.reduce((acc, image) => {
          acc[image.id] = image.filename;
          return acc;
        }, {});

        // Attach image filenames to the products
        const productsWithImages = productsData.map((product) => ({
          ...product,
          imageFilename: imagesMap[product.image_id] || null,
        }));

        // Sort the products based on the sort option
        const sortedProducts = [...productsWithImages];
        if (sortOption === "Popularitet") {
          sortedProducts.sort((a, b) => b.amount - a.amount); // Sort by popularity
        } else if (sortOption === "A - Z") {
          sortedProducts.sort((a, b) => a.title.localeCompare(b.title)); // Sort alphabetically
        }

        // Update state with the sorted products
        setProducts(sortedProducts);
      } catch (error) {
        // Set error message if any error occurs during data fetching
        setError(error.message);
      } finally {
        // Set loading state to false once data fetching is complete
        setLoading(false);
      }
    };

    fetchProducts(); // Call the function to fetch products
  }, [productType, sortOption, supabase]); // Re-run effect if productType, sortOption, or Supabase instance changes

  // Return product list, error message, and loading state
  return { products, error, loading };
};

export default useProducts;
