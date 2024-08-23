import React, { useState } from "react";
import { useSupabase } from "../supabase/supabaseClient";

const Footer = () => {
  // Initialize Supabase client
  const { supabase } = useSupabase();

  // State to manage the email input and display messages
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Handle form submission for newsletter signup
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior (page refresh)

    try {
      // Insert the email into the "newsletter_emails" table in Supabase
      const { data, error } = await supabase
        .from("newsletter_emails")
        .insert([{ email }]);

      // If there's an error, handle it
      if (error) throw error;

      // If successful, update the message and clear the input field
      setMessage("Du er tilmeldt nyhedsbrevet!");
      setEmail("");
    } catch (error) {
      // Handle any errors that occur during the insert operation
      console.error("Error inserting email:", error.message);
      setMessage("Noget gik galt, prøv igen."); // Display error message
    }
  };

  return (
    <footer className="bg-[#323540] py-8 text-white mt-8">
      {/* Footer content container */}
      <div className="max-w-[1200px] m-auto flex justify-between">
        
        {/* Contact information section */}
        <div>
          <h2 className="irish-grover text-[42px]">Bagtanker</h2>
          <p className="font-light">Øster Uttrupvej 1</p>
          <p className="mb-6 font-light">9000 Aalborg</p>
          <p className="font-light">Tlf: 12345678</p>
          <p className="font-light">Email: info@bagtanker.dk</p>
        </div>
        
        {/* Newsletter signup section */}
        <div className="flex flex-col items-end">
          <h2 className="text-[42px]">Tilmeld dig Bagtankers nyhedsbrev</h2>
          <p className="font-light">Få vores nyheder direkte i din indbakke</p>
          
          {/* Newsletter signup form */}
          <form onSubmit={handleSubmit} className="flex flex-col mt-4 items-end">
            <input
              type="email"
              required // Input is required
              placeholder="Indtast din email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state on input change
              className="bg-[#ececec] px-8 py-4 w-[370px] outline-none rounded-lg text-black"
            />
            
            {/* Display success or error message after form submission */}
            <div className="flex justify-end">
              {message && <p className="mt-4">{message}</p>}
              
              {/* Submit button for the form */}
              <button
                type="submit"
                className="bg-[#5F567B] justify-start py-[7px] px-[57px] mt-2 ml-3 uppercase rounded-lg text-lg text-white font-light"
              >
                Tilmeld
              </button>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
