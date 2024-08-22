import { useState } from "react";
import { Link } from "react-router-dom";
import { useSupabase } from "../supabase/supabaseClient";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const { supabase } = useSupabase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("messages")
        .insert([{ name, email, message }]);

      if (error) throw new Error(error.message);

      setSuccess("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Determine the alignment based on message presence
  const alignmentClass = success || error ? "justify-between" : "justify-end";

  return (
    <div>
      <p>
        Du er her: <Link to="/">Home</Link> / <Link to="/contact">Kontakt</Link>
      </p>
      <h2 className="text-4xl font-bold mb-4 mt-8">Kontakt os</h2>
      <div className="grid grid-cols-2 gap-12">
        <div>
          <p>
            Udfyld og send formularen og vi vil hurtigst muligt besvare dine
            spørgsmål.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Indtast dit navn"
              className="bg-[#ececec] px-8 py-4 w-full mb-2 outline-none rounded-lg"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Indtast din email"
              className="bg-[#ececec] px-8 py-4 w-full outline-none rounded-lg"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="Skriv en besked"
              className="bg-[#ececec] px-8 py-4 w-full outline-none rounded-lg mt-2"
              rows="6"
            />
            <div className={`flex ${alignmentClass}`}>
              {success && <p className="text-green-500 mt-4">{success}</p>}
              {error && <p className="text-red-500 mt-4">{error}</p>}
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
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2170.2110979755284!2d9.964887877227746!3d57.04792609150054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464932b6a2b7696b%3A0x861634f2bf524040!2s%C3%98ster%20Uttrup%20Vej%201%2C%209000%20Aalborg!5e0!3m2!1sda!2sdk!4v1724069073202!5m2!1sda!2sdk"
            width="600"
            height="450"
            className="border-none"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
