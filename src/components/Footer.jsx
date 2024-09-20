import { BsFillTelephoneFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="container-page  mt-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-6 sm:grid-cols-2 sm:place-content-start place-content-center sm:place-items-start place-items-center gap-10">
        <div className="sm:col-span-3 col-span-1 h-full md:border-e border-e-none sm:px-4">
          <h2 className="uppercase font-medium text-xl mb-3 text-center sm:text-start">
            Contáctanos
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="h-6 w-6 rounded-full bg-gray-200 flex justify-center items-center">
              <IoLocationSharp className="text-gray-400 size-3" />
            </div>

            <div>
              <p className="text-[.8rem] sm:text-start text-center text-gray-400">
                Local Comercial 9 "Plaza San Miguel" ubicado en Avenida San
                Pedro No 35, colonia San Miguel 45300 Tala, Jalisco*
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end items-center gap-3 border-b pb-8 pt-4">
            <div className="h-6 w-6 rounded-full bg-gray-200 flex justify-center items-center">
              <BsFillTelephoneFill className="text-gray-400 size-3" />
            </div>

            <div>
              <p className="text-[.8rem] text-gray-400">+(52) 33 3176 2402</p>
            </div>
          </div>
        </div>

        <div className="sm:col-span-2 col-span-1 flex flex-col sm:text-start text-center gap-2">
          <h2 className="uppercase font-medium text-xl mb-3">Menú</h2>

          <NavLink
            to={`/inicio`}
            className={({ isActive }) =>
              isActive
                ? "text-[.8rem] text-primary-color animation-fade font-bold"
                : "text-[.8rem] text-black hover:text-primary-color animation-fade"
            }
          >
            Inicio
          </NavLink>

          <NavLink
            to={`/calendario`}
            className="text-[.8rem] text-black hover:text-primary-color animation-fade"
          >
            Reservar
          </NavLink>

          <NavLink
            to={`/comprar-clases`}
            className={({ isActive }) =>
              isActive
                ? "text-[.8rem] text-primary-color animation-fade font-bold"
                : "text-[.8rem] text-black hover:text-primary-color animation-fade"
            }
          >
            Comprar Clases
          </NavLink>

          <NavLink
            to={`/instructores`}
            className={({ isActive }) =>
              isActive
                ? "text-[.8rem] text-primary-color animation-fade font-bold"
                : "text-[.8rem] text-black hover:text-primary-color animation-fade"
            }
          >
            Instructores
          </NavLink>

          <NavLink
            to={`/quienes-somos`}
            className={({ isActive }) =>
              isActive
                ? "text-[.8rem] text-primary-color animation-fade font-bold"
                : "text-[.8rem] text-black hover:text-primary-color animation-fade"
            }
          >
            ¿Quiénes Somos?
          </NavLink>

          <NavLink
            to={`#`}
            className={
              "text-[.8rem] text-black hover:text-primary-color animation-fade"
            }
          >
            Noticias
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-[.8rem] text-primary-color animation-fade font-bold"
                : "text-[.8rem] text-black hover:text-primary-color animation-fade"
            }
            to={`/terminos-condiciones`}
          >
            Términos y Condiciones
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-[.8rem] text-primary-color animation-fade font-bold"
                : "text-[.8rem] text-black hover:text-primary-color animation-fade"
            }
            to={`/contacto`}
          >
            Contacto
          </NavLink>
        </div>

        <div className="sm:col-span-1 col-span-1 sm:pb-0 pb-3">
          <div className="flex flex-col sm:flex-row gap-2">
            {/* <button className="bg-[#3C5B9B] hover:bg-[#3C5B9B]/60 animation-fade p-2 rounded-full">
              <FaFacebookF className="text-white size-4" />
            </button>

            <button className="bg-[#359BED] hover:bg-[#359BED]/60 animation-fade p-2 rounded-full">
              <FaTwitter className="text-white size-4" />
            </button> */}
            <Link
              target="_blank"
              to={"https://www.instagram.com/lt_cycle/?igsh=N3VqNHRvNG5saWc4"}
            >
              <button className="bg-[#359BED] hover:bg-[#359BED]/60 animation-fade p-2 rounded-full">
                <FaInstagram className="text-white size-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
