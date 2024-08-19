import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link, Navigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import useUserComments from "../hooks/useUserComments";

const UserPage = () => {
  const { isLoggedIn, logout, userId } = useContext(AuthContext);
  const { comments, error, loading } = useUserComments(userId);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <div className="flex justify-between">
        <p>
          Du er her: <Link to="/">Home</Link> /{" "}
          <Link to="/contact">Kontakt</Link>
        </p>
        <button
          onClick={logout}
          className="text-red-500 hover:text-red-700 text-3xl font-extrabold"
        >
          <CiLogout />
        </button>
      </div>
      <h2 className="text-4xl font-bold mb-6 mt-8">Min side</h2>
      <h3 className="text-2xl font-bold">Mine kommentarer</h3>

      {loading && (
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">
          Loading...
        </p>
      )}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-4 gap-4 w-[60%]">
        <div className="col-span-2">
          <h4 className="text-base font-bold">Titel</h4>
        </div>
        <div className="col-span-1">
          <h4 className="text-base font-bold">Dato</h4>
        </div>
        <div className="col-span-1">
          <h4 className="text-base font-bold">Handling</h4>
        </div>
      </div>

      {comments.map((comment) => (
        <div key={comment.id} className="grid grid-cols-4 gap-4 w-[60%] border-t-2 border-black">
          <div className="col-span-2">
            <p>{comment.title}</p>
          </div>
          <div className="col-span-1">
            <p>{new Date(comment.created_at).toLocaleDateString("da-DK")}</p>
          </div>
          <div className="col-span-1">
            <button className="text-blue-500 hover:text-blue-700">Edit</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserPage;
