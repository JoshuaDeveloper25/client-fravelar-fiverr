import { Link } from "react-router-dom";

const LogInForm = ({ handleSubmit, isLoading }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto rounded shadow-lg space-y-5 px-6 py-6"
    >
      <div>
        <h3 className="text-xl pb-1 border-b">Usuarios registrados</h3>
        <h4 className="text-sm pt-1 text-black font-bold">
          Si ya te registraste inicia sesión aquí.
        </h4>
      </div>

      <div>
        <div>
          <label htmlFor="email" className="text-black block">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            className="bg-white border focus:blue-focus w-full outline-none px-2 py-1"
            type="email"
            id="email"
            name="email"
          />
        </div>

        <div className="mt-2">
          <label htmlFor="password" className="text-black block">
            Contraseña<span className="text-red-500">*</span>
          </label>
          <input
            className="bg-white border focus:blue-focus w-full outline-none px-2 py-1"
            type="password"
            id="password"
            name="password"
          />
        </div>

        <div className="flex gap-1 mt-1">
          <div>
            <input id="rememberPassword" type="checkbox" name="" />
          </div>

          <div>
            <label htmlFor="rememberPassword" className="text-sm">
              Recordar contraseña
            </label>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col sm:flex-row justify-between">
          <p className="text-sm">
            ¿No tienes cuenta?{" "}
            <Link to={`/registrarse`} className="border-b border-b-gray-700">
              Créala aquí
            </Link>
          </p>
        </div>

        <div>
          <button
            className="text-sm text-white font-medium w-full rounded mt-2 py-2 px-2 bg-primary-color hover:opacity-60 animation-fade"
            disabled={isLoading}
            type="submit"
          >
            Iniciar
          </button>
        </div>
      </div>
    </form>
  );
};

export default LogInForm;
