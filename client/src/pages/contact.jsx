import { useState } from "react";
import { Link } from "react-router-dom";
import { useSupabase } from "../supabase/supabaseClient";

const Contact = () => {
  // State variables for form inputs and status messages
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // To show loading spinner or disable button
  const [success, setSuccess] = useState(null); // For success message
  const [error, setError] = useState(null); // For error message
  
  const { supabase } = useSupabase(); // Hook to get Supabase client

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Set loading to true to indicate submission process

    try {
      // Insert the message into the Supabase table
      const { data, error } = await supabase
        .from("messages")
        .insert([{ name, email, message }]);

      if (error) throw new Error(error.message); // Throw an error if one occurs

      // Set success message and clear form inputs
      setSuccess("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      // Set error message if an error occurs
      setError(`Error: ${error.message}`);
    } finally {
      // Set loading to false after submission is complete
      setLoading(false);
    }
  };

  // Class name for aligning success/error messages and button
  const alignmentClass = success || error ? "justify-between" : "justify-end";

  return (
    <div>
      {/* Breadcrumb navigation */}
      <p>
        Du er her: <Link to="/">Home</Link> / <Link to="/contact">Kontakt</Link>
      </p>
      {/* Page heading */}
      <h2 className="text-4xl font-bold mb-4 mt-8">Kontakt os</h2>
      <div className="grid grid-cols-2 gap-12">
        <div>
          <p>
            Udfyld og send formularen og vi vil hurtigst muligt besvare dine
            spørgsmål.
          </p>
          {/* Contact form */}
          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* Name input */}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Indtast dit navn"
              className="bg-[#ececec] px-8 py-4 w-full mb-2 outline-none rounded-lg"
            />
            {/* Email input */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Indtast din email"
              className="bg-[#ececec] px-8 py-4 w-full outline-none rounded-lg"
            />
            {/* Message textarea */}
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="Skriv en besked"
              className="bg-[#ececec] px-8 py-4 w-full outline-none rounded-lg mt-2"
              rows="6"
            />
            <div className={`flex ${alignmentClass}`}>
              {/* Display success or error messages */}
              {success && <p className="text-green-500 mt-4">{success}</p>}
              {error && <p className="text-red-500 mt-4">{error}</p>}
              {/* Submit button */}
              <button
                type="submit"
                className="bg-[#5F567B] py-[7px] px-[57px] mt-2 ml-3 uppercase font-light rounded-lg text-lg text-white"
                disabled={loading} // Disable button while loading
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
        </div>
        <div>
          {/* Embedded Google Map showing location */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2170.2110979755284!2d9.964887877227746!3d57.04792609150054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464932b6a2b7696b%3A0x861634f2bf524040!2s%C3%98ster%20Uttrup%20Vej%201%2C%209000%20Aalborg!5e0!3m2!1sda!2sdk!4v1724069073202!5m2!1sda!2sdk"
            width="600"
            height="450"
            className="border-none"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
