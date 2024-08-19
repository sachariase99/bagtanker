import { useState } from "react";
import { Link } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import { CiHeart } from "react-icons/ci";

const Rundstykker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Sorter");
  const { products, error, loading } = useProducts();

  if (loading)
    return (
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">
        Loading...
      </p>
    );
  if (error) return <p>Error: {error}</p>;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  const options = ["Sorter", "Popularitet", "A - Z"];

  // Truncate text function
  const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  return (
    <div>
      <div className="flex justify-between">
        <p>
          Du er her: <Link to="/">Home</Link> /
          <Link to="/rundstykker">Produkter</Link>
        </p>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-bold mb-6 mt-8">Rundstykker</h2>
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
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
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

      <div className="grid grid-cols-2 gap-8">
        {products.map((product) => {
          const imageUrl = product.imageFilename ? product.imageFilename : null;

          return (
            <div key={product.id} className="flex">
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
              <div className="ml-6 flex flex-col justify-between">
                <p className="font-bold text-[22px]">{product.title}</p>
                <p className="text-lg">{truncateText(product.teaser, 26)}</p>
                <div className="flex justify-between items-center">
                  <button className="py-2 px-4 bg-[#D89F5F] text-white text-xl rounded-lg">
                    Læs mere
                  </button>
                  <div className="flex gap-2">
                    <p>{product.amount}</p>
                    <button><CiHeart className="text-2xl"/></button>
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

export default Rundstykker;
