const Footer = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <footer className="bg-[#323540] py-8 text-white mt-8">
      <div className="max-w-[1200px] m-auto flex justify-between">
        <div>
          <h2 className="irish-grover text-[42px]">Bagtanker</h2>
          <p className="font-light">Øster Uttrupvej 1</p>
          <p className="mb-6 font-light">9000 Aalborg</p>
          <p className="font-light">Tlf: 12345678</p>
          <p className="font-light">Email: info@bagtanker.dk</p>
        </div>
        <div className="flex flex-col items-end">
          <h2 className="text-[42px]">
            Tilmeld dig Bagtankers nyhedsbrev
          </h2>
          <p className="font-light">Få vores nyheder direkte i din indbakke</p>
          <form onSubmit={handleSubmit} className="flex flex-col mt-4">
            <input
              type="email"
              required
              placeholder="Indtast din email"
              className="bg-[#ececec] px-8 py-4 w-[370px] outline-none rounded-lg text-black"
            />
            <div className="flex justify-end">
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
