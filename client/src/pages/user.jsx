import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link, Navigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import useUserComments from "../hooks/useUserComments";
import { useSupabase } from "../supabase/supabaseClient";

const UserPage = () => {
  const { isLoggedIn, logout, userId } = useContext(AuthContext);
  const { comments, error, loading, refetch } = useUserComments(userId);
  const { supabase } = useSupabase();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const handleDelete = async (commentId) => {
    try {
      const { error } = await supabase
        .from("user_comments")
        .delete()
        .eq("id", commentId);

      if (error) {
        console.error("Error deleting comment:", error.message);
        return;
      }

      refetch(); // Refresh comments after deletion
    } catch (error) {
      console.error("Error deleting comment:", error.message);
    }
  };

  return (
    <div className="p-8">
      {/* Breadcrumb Navigation */}
      <div className="flex justify-between mb-4">
        <p>
          Du er her: <Link to="/">Home</Link> / <Link to="/user">Profil</Link>
        </p>
        <button
          onClick={logout}
          className="text-red-500 hover:text-red-700 text-3xl font-extrabold"
        >
          <CiLogout />
        </button>
      </div>
      <h2 className="text-4xl font-bold mb-6 mt-8">Min side</h2>
      <h3 className="text-2xl font-bold mb-4">Mine kommentarer</h3>

      {/* Loading and Error States */}
      {loading && (
        <p className="text-3xl text-center">Loading...</p>
      )}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Comments List */}
      <div className="grid grid-cols-4 gap-4 w-full max-w-4xl">
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

      {comments.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment.id}
            className="grid grid-cols-4 gap-4 w-full max-w-4xl border-t-2 border-black py-2"
          >
            <div className="col-span-2">
              <p>{comment.title}</p>
            </div>
            <div className="col-span-1">
              <p>{new Date(comment.created_at).toLocaleDateString("da-DK")}</p>
            </div>
            <div className="col-span-1">
              <button
                onClick={() => handleDelete(comment.id)}
                className="text-blue-500 hover:text-blue-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">Ingen kommentarer tilgængelige.</p>
      )}
    </div>
  );
};

export default UserPage;
