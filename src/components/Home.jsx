import React from "react";
import Feed from "./Feed";
import { Outlet } from "react-router-dom";
import RightSideBar from "./RightSideBar";
import useGetAllPost from "../hooks/userGetAllPost";


const HomePage = () => {
  useGetAllPost()

  return (
    <>
 <div className="flex">
  <div className="flex-grow">
    <Feed/>
    <Outlet/>
  </div>
  <RightSideBar/>
 </div>
 </>
  );
};

export default HomePage;
