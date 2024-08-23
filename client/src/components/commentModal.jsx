import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useSupabase } from "../supabase/supabaseClient";

const CommentModal = ({ isOpen, onClose, onSubmit, productId }) => {
  // Local state to manage form inputs
  const [title, setTitle] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [comment, setComment] = useState("");

  // Supabase client instance from custom hook
  const { supabase } = useSupabase();
  
  // Getting the user ID from the AuthContext to identify the commenter
  const { userId } = useContext(AuthContext);

  // If the modal is not open, do not render anything
  if (!isOpen) return null;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Ensure the user is logged in before allowing comment submission
    if (!userId) {
      console.error("User not logged in.");
      return;
    }

    // Insert the new comment into the "user_comments" table in Supabase
    const { error } = await supabase.from("user_comments").insert([
      {
        product_id: productId,         // ID of the product being commented on
        title: title.trim(),           // Trimmed title of the comment
        firstname: firstname.trim(),   // Trimmed first name of the commenter
        lastname: lastname.trim(),     // Trimmed last name of the commenter
        comment: comment.trim(),       // Trimmed comment text
        user_id: userId,               // ID of the user making the comment
      },
    ]);

    // Handle any errors that occur during insertion
    if (error) {
      console.error("Error inserting comment:", error.message);
      return;
    }

    // Clear form fields and close the modal on successful submission
    setTitle("");
    setFirstname("");
    setLastname("");
    setComment("");
    onClose();    // Close the modal
    onSubmit();   // Optional callback after submission
  };

  return (
    // Modal overlay to cover the entire screen and provide a dark background
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      {/* Modal content box */}
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Skriv en kommentar</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Input for the comment title */}
          <input
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            type="text"
            placeholder="Indtast titel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          {/* Input for the first name */}
          <input
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            type="text"
            placeholder="Indtast dit fornavn"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
          {/* Input for the last name */}
          <input
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            type="text"
            placeholder="Indtast dit efternavn"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
          {/* Textarea for the comment text */}
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md mb-4 resize-none"
            rows="5"
            placeholder="Indtast din kommentar"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          {/* Buttons for canceling or submitting the form */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose} // Close the modal without submitting
              className="bg-gray-200 px-4 py-2 rounded-md"
            >
              Annuller
            </button>
            <button
              type="submit" // Submit the form
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
