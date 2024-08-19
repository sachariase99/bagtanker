import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="flex justify-evenly bg-[#323540] py-12 text-2xl text-white mb-4">
        <Link className="hover:text-gray-400" to="/rundstykker">Rundstykker</Link>
        <Link className="hover:text-gray-400" to="/baguettes">Baguettes</Link>
        <Link className="hover:text-gray-400" to="/franskbrød">Franskbrød</Link>
        <Link className="hover:text-gray-400" to="/kager">Kager</Link>
        <Link className="hover:text-gray-400" to="/rugbrød">Rugbrød</Link>
    </nav>
  )
};

export default Nav;
