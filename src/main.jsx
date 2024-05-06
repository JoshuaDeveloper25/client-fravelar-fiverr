// --> Built-in React imports
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider } from "./context/AppProvider";

// --> Styles Imports
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./index.css";

// --> Pages from App
import Root from "./pages/Root";
import LogIn from "./pages/LogIn/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Instructors from "./pages/Instructors/Instructors";

import RootAdmin from "./admin/RootAdmin";
import HomeAdmin from "./admin/HomeAdmin/HomeAdmin";
import ManageClasses from "./admin/ManageClasses";
import ManageInstructors from "./admin/ManageInstructors";
import SingleInstructor from "./pages/Instructors/pages/SingleInstructor";

import { PrivateRoutes } from "./auth/PrivateRoutes";
import { PublicRoutes } from "./auth/PublicRoutes";

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        element: <PublicRoutes />,
        children: [
          {
            index: true,
            element: <LogIn />,
          },

          {
            element: <SignUp />,
            path: "/registrarse",
          },
        ],
      },

      {
        element: <Home />,
        path: "/inicio",
      },

      {
        element: <About />,
        path: "/quienes-somos",
      },

      {
        element: <Instructors />,
        path: "/instructores",
      },

      {
        element: <SingleInstructor />,
        path: "/instructores/:id",
      },

      {
        element: <Contact />,
        path: "/contacto",
      },
    ],
  },

  {
    // --> Admin Panel
    path: "/admin/",
    element: <RootAdmin />,
    children: [
      {
        element: <PrivateRoutes />,
        children: [
          {
            element: <HomeAdmin />,
            index: true,
          },

          {
            element: <ManageInstructors />,
            path: "administrar-instructores",
          },

          {
            element: <ManageClasses />,
            path: "administrar-clases",
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer stacked />
      </QueryClientProvider>
    </AppProvider>
  </>
);
