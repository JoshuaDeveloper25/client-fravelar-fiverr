import { Link } from "react-router-dom";

const ForgotPasswordForm = ({ handleSubmit, isLoading }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto rounded shadow-lg space-y-3 px-6 py-6"
    >
      <div>
        <h3 className="text-xl pb-1 border-b">¿Olvidaste tu contraseña?</h3>
        <h4 className="text-sm pt-1 text-black font-bold">
          Para recuperar el acceso, ingresa tu correo electrónico y sigue las
          instrucciones.
        </h4>
      </div>

      <div>
        <label htmlFor="email" className="text-black block">
          Email<span className="text-red-500">*</span>
        </label>

        <input
          className="bg-white border focus:blue-focus w-full outline-none px-2 py-1"
          type="email"
          name="email"
          id="email"
        />
      </div>

      <div>
        <p className="text-sm">
          Volver al{" "}
          <Link
            to={`/`}
            className=" hover:text-primary-color hover:border-primary-color border-b border-b-gray-700"
          >
            inicio de sesión
          </Link>
        </p>

        <div>
          <button
            className="text-sm disabled:bg-primary-color/20 text-white font-medium w-full rounded mt-2 py-2 px-2 bg-primary-color hover:opacity-60 animation-fade"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
