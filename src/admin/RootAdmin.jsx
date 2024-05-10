import { Link, Outlet, useNavigate, Navigate, NavLink } from 'react-router-dom';
import { Menu, Sidebar } from 'react-pro-sidebar';
import AppContext from '../context/AppProvider';
import { useContext, useState } from 'react';
import logo from '../images/cycle-logo3.png';
import { IoMenu } from 'react-icons/io5';
import { toast } from 'react-toastify';

const RootAdmin = () => {
  const { setUserInfo, userInfo } = useContext(AppContext);
  const [toggled, setToggled] = useState(false);
  const navigate = useNavigate();

  const signOut = () => {
    navigate(`/`);
    setUserInfo({});
    localStorage.removeItem('userInfo');
    toast.success('Sesión cerrada exitosamente!');
  };

  if (userInfo.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-svh">
      <div
        className="sticky inset-0"
        style={{ display: 'flex', height: '100%', minHeight: '100vh' }}
      >
        <Sidebar
          breakPoint="md"
          backgroundColor="black"
          onBackdropClick={() => setToggled(false)}
          toggled={toggled}
        >
          <Menu className="text-white">
            <div className="flex flex-col h-svh">
              <NavLink className="block mx-3 mt-4" to={`/admin/`}>
                <img
                  loading="lazy"
                  decoding="async"
                  className="w-32 mb-3"
                  src={logo}
                  alt={`Logo`}
                />
              </NavLink>

              <NavLink
                to={`/inicio`}
                className="font-bold animation-fade hover:text-primary-color border-b border-gray-500 block mx-3 pb-2"
              >
                Volver a Inicio
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'text-primary-color px-3 py-3'
                    : 'px-3 pt-4 pb-2 font-bold animation-fade hover:text-primary-color'
                }
                to={`/admin/administrar-instructores`}
              >
                Gestionar Instructores
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'text-primary-color px-3 py-3'
                    : 'px-3 py-2 font-bold animation-fade hover:text-primary-color'
                }
                to={`/admin/administrar-paquetes`}
              >
                Gestionar Paquetes
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'text-primary-color px-3 py-3'
                    : 'px-3 py-2 font-bold animation-fade hover:text-primary-color'
                }
                to={`/admin/administrar-noticias`}
              >
                Gestionar Noticias
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'text-primary-color px-3 py-3'
                    : 'px-3 py-2 font-bold animation-fade hover:text-primary-color'
                }
                to={`/admin/administrar-calendario`}
              >
                Gestionar Calendario
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

        <main style={{ display: 'flex', padding: 10 }}>
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
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default RootAdmin;
