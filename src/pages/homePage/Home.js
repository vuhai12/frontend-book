import React, { useEffect } from "react";
import SideBarHome from "../../components/SideBarHome/SideBarHome";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetListCategoryToolkit } from "../../redux/slides/userSlice";
import FeaturedBook from "../book/FeaturedBook";
import ChatBox from "../../components/ChatBox/ChatBox";

const Home = () => {
  const listCategory = useSelector((state) => state.user.listCategory);
  const titleSideBar = "Danh mục";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetListCategoryToolkit());
  }, []);

  return (
    <>
      <div className="flex gap-5">
        <ChatBox />
        <SideBarHome listCategory={listCategory} titleSideBar={titleSideBar} />
        <FeaturedBook />
      </div>
    </>
  );
};

export default Home;
