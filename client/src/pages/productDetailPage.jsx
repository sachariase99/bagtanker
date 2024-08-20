import { useParams } from "react-router-dom";
import useProductDetail from "../hooks/useProductDetail";
import { CiHeart } from "react-icons/ci";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { product, loading, error } = useProductDetail(productId);

  if (loading)
    return (
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">
        Loading...
      </p>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
      {product && (
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-8">
              <img
                src={product.imageFilename}
                alt={product.title}
                className="w-full h-auto mb-4"
              />
              <p className="text-lg mb-4">{product.teaser}</p>
            </div>
            <p className="text-lg">{product.description}</p>
          </div>
          <div className="col-span-1 w-full min-h-screen bg-[#F5F5F0] rounded-b-lg text-[#5F657B]">
            <div className="bg-[#5F657B] text-white px-4 py-2 rounded-t-lg flex justify-between">
              <p className="text-[22px]">Opskrift</p>
              <div className="flex gap-2">
                <button>
                  <CiHeart className="text-2xl" />
                </button>
              </div>
            </div>
            <p className="text-lg py-3 px-4 border-b border-black bg-[#D7D7D2]">
              Varighed: {product.duration} minutes
            </p>
            <p className="text-lg py-3 px-4 border-b border-black bg-[#D7D7D2]">
              Antal: {product.amount}
            </p>
          </div>
        </div>
      )}
      <p className="text-[28px] font-bold">Price: {product.price} DKK</p>
    </div>
  );
};

export default ProductDetailPage;
