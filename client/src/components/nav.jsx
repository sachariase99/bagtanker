import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="flex justify-evenly bg-[#323540] py-12 text-2xl text-white mb-4">
        <Link className="hover:text-gray-400" to="/">Rundstykker</Link>
        <Link className="hover:text-gray-400" to="/">Baguettes</Link>
        <Link className="hover:text-gray-400" to="/">Franskbrød</Link>
        <Link className="hover:text-gray-400" to="/">Kager</Link>
        <Link className="hover:text-gray-400" to="/">Rugbrød</Link>
    </nav>
  )
};

export default Nav;
