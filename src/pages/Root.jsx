import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Root = () => {
  return (
    <section className="flex flex-col h-[100vh]">
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </section>
  );
};

export default Root;
