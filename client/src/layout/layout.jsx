import { Outlet } from "react-router-dom";
import Nav from "../components/nav";
import Footer from "../components/footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky navbar */}
      <header className="sticky top-0 z-50">
        <Nav />
      </header>

      {/* Main content area */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer at the bottom */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
