import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import MainLayout from "./components/MainLayout";
import Home from "./components/Home";
import MyProfile from "./components/MyProfile";
import Notifications from "./components/Notifications";
import EditProfile from "./components/EditProfile";
import ArchivePosts from "./components/ArchivePosts";
import SearchPage from "./components/SearchPage";
import ExpolorePage from "./components/ExpolorePage";




const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <MyProfile />,
      },
      {
        path: "/notification",
        element: <Notifications />,
      },
      {
        path: "/editprofile",
        element: <EditProfile />,
      },
      {
        path: "/archive",
        element: <ArchivePosts />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
       {
        path: "/expolre",
        element: <ExpolorePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
