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
import PrivateRoute from "./PrivateRoute";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/notification",
        element: (
          <PrivateRoute>
            <Notifications />
          </PrivateRoute>
        ),
      },
      {
        path: "/editprofile",
        element: (
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/archive",
        element: (
          <PrivateRoute>
            <ArchivePosts />
          </PrivateRoute>
        ),
      },
      {
        path: "/search",
        element: (
          <PrivateRoute>
            <SearchPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/expolre",
        element: (
          <PrivateRoute>
            <ExpolorePage />
          </PrivateRoute>
        ),
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
