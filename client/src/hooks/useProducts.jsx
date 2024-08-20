import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSupabase } from '../supabase/supabaseClient';

const categoryMapping = {
  "Rundstykker": ["Morgenbrød"],
  // Add other mappings as needed
};

const useProducts = (productType, sortOption) => {
  const { supabase } = useSupabase();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Capitalize the first letter of productType
        const formattedProductType = productType.charAt(0).toUpperCase() + productType.slice(1);
        
        // Determine categories to query based on the mapping
        const categoriesToFetch = categoryMapping[formattedProductType] || [formattedProductType];

        console.log(`Fetching categories: ${categoriesToFetch.join(', ')}`);

        // Fetch category IDs based on the titles
        const { data: categories, error: categoryError } = await supabase
          .from("categories")
          .select("id, title")
          .in("title", categoriesToFetch);

        if (categoryError) {
          throw new Error(`Category fetch error: ${categoryError.message}`);
        }

        if (categories.length === 0) {
          setError(`No categories found for titles ${categoriesToFetch.join(', ')}`);
          setProducts([]);
          return;
        }

        const categoryIds = categories.map(category => category.id);

        console.log(`Found category IDs: ${categoryIds.join(', ')}`);

        // Fetch products based on category IDs
        const { data: productRel, error: productRelError } = await supabase
          .from("category_product_rel")
          .select("products(*)")
          .in("category_id", categoryIds);

        if (productRelError) {
          throw new Error(`Products fetch error: ${productRelError.message}`);
        }

        // Extract product IDs
        const productsData = productRel.flatMap((rel) => rel.products);
        const productIds = productsData.map(product => product.id);

        if (productIds.length === 0) {
          setProducts([]);
          return;
        }

        console.log(`Fetched products: ${JSON.stringify(productsData)}`);

        // Fetch image details
        const { data: imagesData, error: imagesError } = await supabase
          .from("images")
          .select("id, filename")
          .in("id", productsData.map(product => product.image_id).filter(id => id));

        if (imagesError) {
          throw new Error(`Images fetch error: ${imagesError.message}`);
        }

        // Create a map of image IDs to filenames
        const imagesMap = imagesData.reduce((acc, image) => {
          acc[image.id] = image.filename;
          return acc;
        }, {});

        // Combine products with their corresponding image filenames
        const productsWithImages = productsData.map((product) => ({
          ...product,
          imageFilename: imagesMap[product.image_id] || null,
        }));

        // Sort products based on the selected option
        const sortedProducts = [...productsWithImages];
        if (sortOption === "Popularitet") {
          sortedProducts.sort((a, b) => b.amount - a.amount);
        } else if (sortOption === "A - Z") {
          sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        }

        setProducts(sortedProducts);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [productType, sortOption, supabase]);

  return { products, error, loading };
};

export default useProducts;
