import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../layout/layout";
import LoginPage from "../pages/login";
import UserPage from "../pages/user";
import RegisterPage from "../pages/register";
import Home from "../pages/home";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Redirect from "/" to "/home" */}
          <Route index element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/user" element={<UserPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
