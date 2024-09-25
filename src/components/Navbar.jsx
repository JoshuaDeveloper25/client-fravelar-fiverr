import { Link, NavLink, useNavigate } from "react-router-dom";
import logoNavbar from "../images/cycle-logo4.png";
import { GiHamburgerMenu } from "react-icons/gi";
import AppContext from "../context/AppProvider";
import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import ClassQuantity from "./ClassQuantity";

const Navbar = () => {
  const { userInfo, setUserInfo } = useContext(AppContext);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navigate = useNavigate();

  const signOut = () => {
    navigate(`/`);
    setUserInfo({});
    localStorage.removeItem("userInfo");
    toast.success("Sesión cerrada exitosamente!");
  };

  return (
    <section className="shadow">
      <div className="container-page py-2">
        <div className="md:flex hidden justify-between gap-3 text-white">
          <div className="flex items-center gap-14">
            <div>
              <Link to={"/inicio"}>
                <img
                  loading="lazy"
                  decoding="async"
                  className="w-32"
                  src={logoNavbar}
                />
              </Link>
            </div>

            <div className="space-x-6">
              <NavLink
                to={`/calendario`}
                className={({ isActive }) =>
                  isActive
                    ? "text-sm text-primary-color font-bold animation-fade"
                    : "text-sm text-black hover:text-primary-color animation-fade"
                }
              >
                Reservar
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-sm text-primary-color font-bold animation-fade"
                    : "text-sm text-black hover:text-primary-color animation-fade"
                }
                to={`/comprar-clases`}
              >
                Comprar Clases
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-sm text-primary-color font-bold animation-fade"
                    : "text-sm text-black hover:text-primary-color animation-fade"
                }
                to={`/instructores`}
              >
                Instructores
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-sm text-primary-color font-bold animation-fade"
                    : "text-sm text-black hover:text-primary-color animation-fade"
                }
                to={`/quienes-somos`}
              >
                ¿Quiénes Somos?
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-sm text-primary-color font-bold animation-fade"
                    : "text-sm text-black hover:text-primary-color animation-fade"
                }
                to={`/contacto`}
              >
                Contacto
              </NavLink>
            </div>
          </div>

          <div className="flex items-center gap-5 justify-center">
            <ClassQuantity />
            <div className="group relative">
              <div className="flex items-center cursor-pointer justify-center space-x-3 bg-primary-color rounded-full h-10 w-10">
                <a className="menu-hover">
                  <FaUser className="text-white" />
                </a>
              </div>

              <div
                className={`${
                  userInfo?.token ? null : "w-32"
                } invisible absolute right-0 z-50 py-2 px-2 border rounded  shadow-3xl group-hover:visible bg-white`}
              >
                {userInfo?.token ? (
                  <div className="border-b">
                    <h4 className="text-sm text-black">{userInfo?.email}</h4>
                    <h4 className="text-sm text-black pb-2">
                      {userInfo?.name}
                    </h4>
                  </div>
                ) : (
                  <>
                    <Link
                      to={`/`}
                      className="text-sm block py-1 font-semibold text-black hover:text-primary-color"
                    >
                      Iniciar Sesión
                    </Link>

                    <Link
                      to={`/registrarse`}
                      className="text-sm block py-1 font-semibold text-black hover:text-primary-color"
                    >
                      Registrar
                    </Link>
                  </>
                )}
                {userInfo?.role === "admin" ? (
                  <Link
                    to={`/admin/administrar-instructores`}
                    className="text-sm block font-semibold text-black hover:text-primary-color"
                  >
                    Panel Admin
                  </Link>
                ) : null}
                {userInfo?.token ? (
                  <>
                    <Link
                      to={`/clases-reservadas/`}
                      className="text-sm block font-semibold py-2 text-black hover:text-primary-color"
                    >
                      Clases Reservadas
                    </Link>

                    <button
                      onClick={signOut}
                      className="text-sm block py-1 font-semibold text-red-500 hover:text-red-700"
                    >
                      Cerrar Sesión
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* <!-- drawer init and toggle --> */}
        <div className="md:hidden flex justify-between gap-3 items-center">
          <div className="text-center">
            <button
              className="font-medium text-2xl"
              type="button"
              data-drawer-target="drawer-example"
              data-drawer-show="drawer-example"
              aria-controls="drawer-example"
              onClick={() => setNavbarOpen(true)}
            >
              <GiHamburgerMenu />
            </button>
          </div>

          <div className="flex items-center gap-5 justify-center">
            <ClassQuantity />
            <div className="group relative">
              <div className="flex items-center cursor-pointer justify-center space-x-3 bg-primary-color rounded-full h-10 w-10">
                <a className="menu-hover">
                  <FaUser className="text-white" />
                </a>
              </div>

              <div
                className={`${
                  userInfo?.token ? null : "w-32"
                } invisible absolute right-0 z-50 py-2 px-2 border rounded  shadow-3xl group-hover:visible bg-white`}
              >
                {userInfo?.token ? (
                  <div className="border-b">
                    <h4 className="text-sm text-black">{userInfo?.email}</h4>
                    <h4 className="text-sm text-black pb-2">
                      {userInfo?.name}
                    </h4>
                  </div>
                ) : (
                  <>
                    <Link
                      to={`/`}
                      className="text-sm block py-1 font-semibold text-black hover:text-primary-color"
                    >
                      Iniciar Sesión
                    </Link>

                    <Link
                      to={`/registrarse`}
                      className="text-sm block py-1 font-semibold text-black hover:text-primary-color"
                    >
                      Registrar
                    </Link>
                  </>
                )}
                {userInfo?.role === "admin" ? (
                  <Link
                    to={`/admin/administrar-instructores`}
                    className="text-sm block py-2 font-semibold text-black hover:text-primary-color"
                  >
                    Panel Admin
                  </Link>
                ) : null}
                {userInfo?.token ? (
                  <>
                    <button
                      onClick={signOut}
                      className="text-sm block py-1 font-semibold text-red-500 hover:text-red-700"
                    >
                      Cerrar Sesión
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* <!-- drawer component --> */}
        {navbarOpen && (
          <>
            {createPortal(
              <div
                onClick={() => setNavbarOpen(!navbarOpen)}
                className={`lg:hidden bg-black/50 h-[100vh] fixed top-0 w-full`}
              ></div>,
              document.body
            )}
          </>
        )}

        <div
          id="drawer-example"
          className={`lg:hidden w-full fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform duration-500 bg-white sm:w-80 ${
            !navbarOpen ? "-translate-x-full" : null
          }`}
          tabIndex="-1"
          aria-labelledby="drawer-label"
        >
          <div>
            <Link className="inline" to={`/`}>
              <img
                decoding="async"
                loading="lazy"
                className="inline w-28"
                src={logoNavbar}
                alt={`Logo Navbar`}
              />
            </Link>
          </div>

          <button
            type="button"
            data-drawer-hide="drawer-example"
            aria-controls="drawer-example"
            className="text-black bg-transparent hover:bg-primary-color hover:text-white rounded-lg text-sm w-8 h-8 absolute top-5 end-2.5 flex items-center justify-center"
            onClick={() => setNavbarOpen(false)}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close menu</span>
          </button>

          <div className="flex flex-col mt-10 gap-6">
            <NavLink
              onClick={() => setNavbarOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-primary-color border-b-primary-color border-b pb-1 font-bold"
                  : "text-black border-b-secondary-color/15 hover:text-primary-color pb-1 hover:border-b-primary-color animation-fade border-b font-medium"
              }
              to={`/inicio`}
            >
              Inicio
            </NavLink>

            <NavLink
              onClick={() => setNavbarOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-primary-color border-b-primary-color border-b pb-1 font-bold"
                  : "text-black border-b-secondary-color/15 hover:text-primary-color pb-1 hover:border-b-primary-color animation-fade border-b font-medium"
              }
              to={`/calendario`}
            >
              Reservar
            </NavLink>

            <NavLink
              onClick={() => setNavbarOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-primary-color border-b-primary-color border-b pb-1 font-bold"
                  : "text-black border-b-secondary-color/15 hover:text-primary-color pb-1 hover:border-b-primary-color animation-fade border-b font-medium"
              }
              to={`/comprar-clases`}
            >
              Comprar clases
            </NavLink>

            <NavLink
              onClick={() => setNavbarOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-primary-color border-b-primary-color border-b pb-1 font-bold"
                  : "text-black border-b-secondary-color/15 hover:text-primary-color pb-1 hover:border-b-primary-color animation-fade border-b font-medium"
              }
              to={`/instructores`}
            >
              Instructores
            </NavLink>

            <NavLink
              onClick={() => setNavbarOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-primary-color border-b-primary-color border-b pb-1 font-bold"
                  : "text-black border-b-secondary-color/15 hover:text-primary-color pb-1 hover:border-b-primary-color animation-fade border-b font-medium"
              }
              to={`/quienes-somos`}
            >
              ¿Quiénes somos?
            </NavLink>

            <NavLink
              onClick={() => setNavbarOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-primary-color border-b-primary-color border-b pb-1 font-bold"
                  : "text-black border-b-secondary-color/15 hover:text-primary-color pb-1 hover:border-b-primary-color animation-fade border-b font-medium"
              }
              to={`/contacto`}
            >
              Contacto
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
