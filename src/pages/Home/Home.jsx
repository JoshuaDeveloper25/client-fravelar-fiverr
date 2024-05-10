import ClassesSection from "../../components/ClassesSection";
import HomeCarousel from "./components/HomeCarousel";
import HomeComprarClases from "./components/HomeComprarClases";
import HomeNoticias from "./components/HomeNoticias";

const Home = () => {
  return (
    <section>
      {/* Carousel Home Header */}
      <HomeCarousel />

      {/* Home Comprar Clases */}
      <HomeComprarClases />

      {/* Clases */}

      <ClassesSection />

      {/* Home Noticias */}
      <HomeNoticias />
    </section>
  );
};

export default Home;
