import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

const UserPage = () => {
  const { isLoggedIn, userEmail, logout } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="bg-white p-8 rounded-xl my-8 mx-8">
      <h2 className="text-2xl font-bold mb-6">User Page</h2>
      <div className="mb-6">
        <p className="text-xl">Email: {userEmail}</p>
      </div>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default UserPage;
