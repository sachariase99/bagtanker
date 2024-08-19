import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../layout/layout";
import LoginPage from "../components/login";
import UserPage from "../components/user";
import RegisterPage from "../components/register";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Pass the Layout component directly without JSX syntax */}
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/user" element={<UserPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
