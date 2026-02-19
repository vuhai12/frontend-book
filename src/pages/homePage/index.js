import React, { useEffect } from "react";
import SideBarHome from "../../components/SideBarHome/SideBarHome";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetListCategoryToolkit } from "../../redux/slides/userSlice";
import FeaturedBook from "../book/FeaturedBook";
import ChatBox from "../../components/ChatBox/ChatBox";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import ReleaseBooks from "./components/ReleaseBooks";
import Featured from "./components/Featured";
import SaleBanner from "./components/SaleBanner";
import Subscibe from "./components/Subscibe";
import Blog from "./components/Blog";

const Home = () => {
  const listCategory = useSelector((state) => state.user.listCategory);
  const titleSideBar = "Danh mục";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetListCategoryToolkit());
  }, []);

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
