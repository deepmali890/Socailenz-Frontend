import React from "react";
import Feed from "./Feed";
import { Outlet } from "react-router-dom";
import RightSideBar from "./RightSideBar";


const HomePage = () => {

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
