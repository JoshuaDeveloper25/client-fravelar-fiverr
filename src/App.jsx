import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppProvider } from "./context/AppProvider";
import { ToastContainer } from "react-toastify";

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
import ManageNews from "./admin/ManageNews";
import SingleNew from "./pages/News/News";
import Calendar from "./pages/Calendar/Calendar";
import ConfirmAccount from "./pages/ConfirmAccount/ConfirmAccount";
import EmailSent from "./pages/EmailSent/EmailSent";
import SingleClassPage from "./pages/Calendar/pages/SingleClassPage";
import ManageSchedule from "./admin/ManageSchedule";
import SinglePack from "./pages/Pack/pages/SinglePack";
import ClassesSection from "./components/ClassesSection";
import TermsAndConditions from "./pages/TermsAndConditions/TermsAndConditions";
import ReservedClasses from "./pages/ReservedClasses/ReservedClasses";

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
          {
            element: <ConfirmAccount />,
            path: "/confirmaccount/:token",
          },
          {
            element: <EmailSent />,
            path: "/emailenviado",
          },
        ],
      },

      {
        element: <PrivateRoutes />,
        children: [
          {
            element: <SinglePack />,
            path: "/comprar-paquete/:id",
          },
          {
            element: <SingleClassPage />,
            path: "/reservar/:id",
          },
          {
            element: <ReservedClasses />,
            path: "/clases-reservadas/",
          },
        ],
      },

      {
        path: "comprar-clases",
        element: <ClassesSection />,
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
        element: <SingleNew />,
        path: "/new/:id",
      },
      {
        element: <Calendar />,
        path: "/calendario/:date?",
      },
      {
        element: <TermsAndConditions />,
        path: "/terminos-condiciones",
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
          // {
          //   element: <HomeAdmin />,
          //   index: true,
          // },

          {
            element: <ManageInstructors />,
            path: "administrar-instructores",
          },

          {
            element: <ManageClasses />,
            path: "administrar-paquetes",
          },
          {
            element: <ManageSchedule />,
            path: "administrar-calendario",
          },

          {
            element: <SingleClassPage isAdmin={true} />,
            path: "administrar-calendario/:id",
          },

          {
            element: <ManageNews />,
            path: "administrar-noticias",
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <AppProvider>
      <RouterProvider router={router} />
      <ToastContainer stacked position="top-center" />
    </AppProvider>
  );
};

export default App;
