import { Link } from "react-router-dom";

const Contact = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

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
              required
              placeholder="Indtast dit navn"
              className="bg-[#ececec] px-8 py-4 w-full mb-2 outline-none rounded-lg"
            />
            <input
              type="email"
              required
              placeholder="Indtast din email"
              className="bg-[#ececec] px-8 py-4 w-full outline-none rounded-lg"
            />
            <textarea
              type="email"
              required
              placeholder="Skriv en besked"
              className="bg-[#ececec] px-8 py-4 w-full outline-none rounded-lg mt-2"
              rows="6"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#5F567B] justify-start py-[7px] px-[57px] mt-2 ml-3 uppercase font-light rounded-lg text-lg text-white"
              >
                Send
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
