import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext"; // Import the context
import { useSupabase } from "../supabase/supabaseClient";

const CommentModal = ({ isOpen, onClose, onSubmit, productId }) => {
  const [title, setTitle] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [comment, setComment] = useState("");
  const { supabase } = useSupabase();
  const { userId } = useContext(AuthContext); // Get the userId from context

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if userId is available
    if (!userId) {
      console.error("User not logged in.");
      return;
    }

    // Insert the comment into Supabase with userId
    const { error } = await supabase.from("user_comments").insert([
      {
        product_id: productId,
        title: title.trim(),
        firstname: firstname.trim(),
        lastname: lastname.trim(),
        comment: comment.trim(),
        user_id: userId, // Include the userId
      },
    ]);

    if (error) {
      console.error("Error inserting comment:", error.message);
      return;
    }

    // If successful, clear the input fields and close the modal
    setTitle("");
    setFirstname("");
    setLastname("");
    setComment("");
    onClose();
    onSubmit(); // Optional: trigger a callback to refresh the comments
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Skriv en kommentar</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            type="text"
            placeholder="Indtast titel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            type="text"
            placeholder="Indtast dit fornavn"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
          <input
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            type="text"
            placeholder="Indtast dit efternavn"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md mb-4 resize-none"
            rows="5"
            placeholder="Indtast din kommentar"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 px-4 py-2 rounded-md"
            >
              Annuller
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Indsend
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentModal;
