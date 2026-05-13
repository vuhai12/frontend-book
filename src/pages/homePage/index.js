import Hero from "./components/Hero";
import Categories from "./components/Categories";
import ReleaseBooks from "./components/ReleaseBooks";
import Featured from "./components/Featured";
import SaleBanner from "./components/SaleBanner";
import Subscibe from "./components/Subscibe";
import Blog from "./components/Blog";

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <ReleaseBooks />
      <Featured />
      <SaleBanner />
      <Subscibe />
      <Blog />
    </>
  );
};

export default Home;
