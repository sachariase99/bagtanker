import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../layout/layout";
import LoginPage from "../pages/login";
import UserPage from "../pages/user";
import RegisterPage from "../pages/register";
import Home from "../pages/home";
import Contact from "../pages/contact";
import NewsDetail from "../pages/newsDetail";
import News from "../pages/news";
import Rundstykker from "../pages/rundstykker";
import Baguettes from "../pages/baguettes";
import Franskbrød from "../pages/franskbrød";
import Kager from "../pages/kager";
import Rugbrød from "../pages/Rugbrød";

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
          <Route path="/contact" element={<Contact />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/rundstykker" element={<Rundstykker />} />
          <Route path="/baguettes" element={<Baguettes />} />
          <Route path="/franskbrød" element={<Franskbrød />} />
          <Route path="/kager" element={<Kager />} />
          <Route path="/rugbrød" element={<Rugbrød />} />

        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
