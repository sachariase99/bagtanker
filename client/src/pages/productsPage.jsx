import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import { CiHeart } from "react-icons/ci";

const ProductsPage = () => {
  // State to manage dropdown visibility and selected sorting option
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Sorter");
  
  // Extract the productType from the URL parameters
  const { productType } = useParams();

  // Fetch products, error, and loading state using custom hook
  const { products, error, loading } = useProducts(productType, selected);

  // Display a loading message while data is being fetched
  if (loading)
    return (
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">
        Loading...
      </p>
    );
  
  // Display an error message if there is an issue with fetching data
  if (error) return <p>Error: {error}</p>;

  // Toggle the dropdown menu for sorting options
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle the selection of a sorting option
  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  // List of sorting options
  const options = ["Sorter", "Popularitet", "A - Z"];

  // Helper function to truncate text to a specific number of words
  const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <div className="flex justify-between">
        <p>
          Du er her: <Link to="/">Home</Link> /{" "}
          <Link className="capitalize" to={`/${productType}`}>{productType}</Link>
        </p>
      </div>

      {/* Page Title and Sorting Dropdown */}
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-bold mb-6 mt-8">
          {productType.charAt(0).toUpperCase() + productType.slice(1)}
        </h2>
        <div className="relative w-[240px]">
          <button
            onClick={toggleDropdown}
            className="border border-black rounded-none w-full h-[33px] px-2 text-left flex items-center justify-between"
          >
            {selected}
            <svg
              className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                isOpen ? "transform rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {isOpen && (
            <ul className="absolute top-full left-0 w-full border border-black bg-white z-10">
              {options.map((option) => (
                <li
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid xl:grid-cols-2 gap-8">
        {products.map((product) => {
          const imageUrl = product.imageFilename ? product.imageFilename : null;

          return (
            <div key={product.id} className="flex">
              {/* Product Image */}
              <div className="w-[250px] h-[250px] flex-shrink-0">
                <img
                  src={imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover rounded-lg"
                  onError={() =>
                    console.error(`Image failed to load: ${imageUrl}`)
                  }
                />
              </div>
              
              {/* Product Details */}
              <div className="ml-6 flex flex-col justify-between">
                <p className="font-bold text-[22px]">{product.title}</p>
                <p className="text-lg">{truncateText(product.teaser, 26)}</p>
                <div className="flex justify-between items-center">
                  {/* Link to product detail page */}
                  <Link to={`/product/${product.id}`}>
                    <button className="py-2 px-4 bg-[#D89F5F] text-white text-xl rounded-lg">
                      Læs mere
                    </button>
                  </Link>
                  {/* Favorite button */}
                  <div className="flex gap-2">
                    <button>
                      <CiHeart className="text-2xl" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsPage;
