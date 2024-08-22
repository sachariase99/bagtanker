import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link, Navigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import useUserComments from "../hooks/useUserComments";
import { useSupabase } from "../supabase/supabaseClient"; // Import Supabase client

const UserPage = () => {
  const { isLoggedIn, logout, userId } = useContext(AuthContext);
  const { comments, error, loading, refetch } = useUserComments(userId); // Add refetch to reload comments
  const { supabase } = useSupabase();
  
  // Redirect to login if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const handleDelete = async (commentId) => {
    try {
      // Delete the comment from Supabase
      const { error } = await supabase
        .from("user_comments")
        .delete()
        .eq("id", commentId);

      if (error) {
        console.error("Error deleting comment:", error.message);
        return;
      }

      // Refetch comments to update the UI
      refetch();
    } catch (error) {
      console.error("Error deleting comment:", error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
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

      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="grid grid-cols-4 gap-4 w-[60%] border-t-2 border-black">
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
        <p className="text-gray-500">No comments available.</p>
      )}
    </div>
  );
};

export default UserPage;
