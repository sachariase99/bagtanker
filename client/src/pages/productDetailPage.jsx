import { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import useProductDetail from "../hooks/useProductDetail";
import { CiHeart } from "react-icons/ci";
import pfp from "../assets/pfp.png";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import CommentModal from "../components/commentModal";
import { AuthContext } from "../context/authContext";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { product, comments, ingredients, loading, error, refreshComments } = useProductDetail(productId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  if (loading)
    return (
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">
        Loading...
      </p>
    );
  if (error) return <p>Error: {error}</p>;

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString)
      .toLocaleString("da-DK", options)
      .replace(",", " kl.");
  };

  const handleCommentSubmit = () => {
    refreshComments();
  };

  const productType = product?.productType || "Unknown Category"; // Get productType directly from product

  return (
    <div className="p-8">
      {/* Breadcrumb Navigation */}
      <div className="flex justify-between mb-4">
        <p>
          Du er her: <Link to="/">Home</Link> /{" "}
          <Link className="capitalize" to={`/${productType}`}>{productType}</Link> /{" "}
          <span>{product.title}</span>
        </p>
      </div>

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

            {/* Ingredients */}
            <div>
              <ul>
                {ingredients.map((item) => (
                  <li key={item.ingredient_id} className="mb-2 border-b-[2px] py-3 px-4">
                    {item.amount} {item.units.abbreviation} {item.ingredients.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      <p className="text-[28px] font-bold">Price: {product.price} DKK</p>

      {/* Comments */}
      <div className="mt-8">
        <h2 className="text-4xl font-bold mb-4">Kommentarer</h2>

        {isLoggedIn && (
          <div
            className="flex items-center cursor-pointer mb-4"
            onClick={() => setIsModalOpen(true)}
          >
            <p>Skriv kommentar</p>
            <MdOutlineKeyboardArrowRight />
          </div>
        )}

        {comments.length > 0 ? (
          <ul>
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="mb-4 p-4 border-b-[2px] rounded-lg flex gap-8 items-center"
            >
              <img src={pfp} alt={comment.firstname} />
              <div>
                <h2 className="text-[22px] font-bold">
                  {comment.firstname} {comment.lastname}
                </h2>
                <p className="text-sm text-gray-500">
                  {formatDate(comment.created_at)}
                </p>
                <p>{comment.comment}</p>
              </div>
            </li>
          ))}
        </ul>
        ) : (
          <p>Ingen kommentarer endnu. Vær den første til at skrive en!</p>
        )}

        <CommentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          productId={productId}
          onSubmit={handleCommentSubmit}
        />
      </div>
    </div>
  );
};

export default ProductDetailPage;
