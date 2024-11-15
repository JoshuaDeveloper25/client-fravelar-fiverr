import {
  Link,
  Outlet,
  useNavigate,
  Navigate,
  NavLink,
  ScrollRestoration,
} from "react-router-dom";
import { Menu, Sidebar } from "react-pro-sidebar";
import AppContext from "../context/AppProvider";
import { useContext, useState } from "react";
import logo from "../images/cycle-logo3.png";
import { IoMenu } from "react-icons/io5";
import { toast } from "react-toastify";

const RootAdmin = () => {
  const { setUserInfo, userInfo } = useContext(AppContext);
  const [toggled, setToggled] = useState(false);
  const navigate = useNavigate();

  const signOut = () => {
    navigate(`/`);
    setUserInfo({});
    localStorage.removeItem("userInfo");
    toast.success("Sesión cerrada exitosamente!");
  };

  if (userInfo.role !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <div className="md:flex min-h-svh">
      <div
        className="sticky inset-0"
        style={{ display: "flex", height: "100%" }}
      >
        <Sidebar
          breakPoint="md"
          backgroundColor="black"
          onBackdropClick={() => setToggled(false)}
          toggled={toggled}
        >
          <Menu className="text-white">
            <div className="flex flex-col min-h-svh">
              <div className="block mx-3 mt-4">
                <img
                  loading="lazy"
                  decoding="async"
                  className="w-32 mb-3 mx-auto"
                  src={logo}
                  alt={`Logo`}
                />
              </div>

              <NavLink
                to={`/inicio`}
                className="font-bold animation-fade hover:bg-primary-color border-b border-gray-500 block px-3 py-3"
              >
                Volver a Inicio
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary-color px-3 py-3 font-bold"
                    : " px-3 py-3 font-bold animation-fade hover:bg-primary-color"
                }
                to={`/admin/administrar-instructores`}
              >
                Gestionar Instructores
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary-color px-3 py-3 font-bold"
                    : " px-3 py-3 font-bold animation-fade hover:bg-primary-color"
                }
                to={`/admin/administrar-paquetes`}
              >
                Gestionar Paquetes
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary-color px-3 py-3 font-bold"
                    : " px-3 py-3 font-bold animation-fade hover:bg-primary-color"
                }
                to={`/admin/administrar-noticias`}
              >
                Gestionar Noticias
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary-color px-3 py-3 font-bold"
                    : " px-3 py-3 font-bold animation-fade hover:bg-primary-color"
                }
                to={`/admin/administrar-calendario`}
              >
                Gestionar Calendario
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary-color px-3 py-3 font-bold"
                    : " px-3 py-3 font-bold animation-fade hover:bg-primary-color"
                }
                to={`/admin/asignar-creditos`}
              >
                Asignar Créditos
              </NavLink>

              <Link
                className="text-center mt-auto px-3 font-bold py-3 bg-red-500 hover:bg-red-400 animation-fade hover:text-white"
                onClick={signOut}
              >
                Cerrar Sesión
              </Link>
            </div>
          </Menu>
        </Sidebar>

        <main style={{ display: "flex", padding: 10 }}>
          <div>
            <button
              className="sb-button text-4xl md:hidden"
              onClick={() => setToggled(!toggled)}
              type="button"
              data-drawer-show={`drawer-example`}
            >
              <IoMenu />
            </button>
          </div>
        </main>
      </div>

      {/* --> This is the admin panel */}
      <main className="px-5">
        <Outlet />
      </main>

      <ScrollRestoration />
    </div>
  );
};

export default RootAdmin;
