import { Link, useNavigate } from "react-router-dom";

const HomeAdmin = () => {
  return (
    <section className="container-page px-3">
      <div className="flex flex-wrap justify-between gap-5 mt-10">
        <Link to={"/admin/administrar-instructores"}>
          <div
            className={`flex items-center justify-center w-full min-h-[15rem] md:min-w-[30rem] min-w-auto  cursor-pointer border-secondary border animation-fade hover:border-transparent hover:bg-primary-color hover:text-white text-4xl font-bold text-center  text-black  rounded px-5`}
          >
            {`Gestionar Instructores`}
          </div>
        </Link>

        <Link to={"/admin/administrar-clases"}>
          <div
            className={`flex items-center justify-center w-full min-h-[15rem] md:min-w-[30rem] min-w-auto  cursor-pointer border-secondary border animation-fade hover:border-transparent hover:bg-primary-color hover:text-white text-4xl font-bold text-center  text-black  rounded px-5`}
          >
            {`Gestionar Clases`}
          </div>
        </Link>
      </div>
    </section>
  );
};

export default HomeAdmin;
