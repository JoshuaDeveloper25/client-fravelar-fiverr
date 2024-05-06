const SignUpForm = () => {
  return (
    <form className="max-w-lg mx-auto shadow-lg rounded space-y-5 px-6 py-6">
      <div>
        <h4 className="text-sm pt-1">Completa el siguiente formulario</h4>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="fullName" className="text-black block">
            <span className="text-red-500">*</span> Nombre Completo
          </label>
          <input
            className="bg-white border w-full focus:blue-focus px-2 py-1"
            type="text"
            id="fullName"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label htmlFor="email" className="text-black block">
              <span className="text-red-500">*</span> Email
            </label>
            <input
              className="bg-white border w-full focus:blue-focus px-2 py-1"
              type="email"
              id="email"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="confirmEmail" className="text-black block">
              <span className="text-red-500">*</span> Confirma tu email
            </label>
            <input
              className="bg-white border w-full focus:blue-focus px-2 py-1"
              type="email"
              id="confirmEmail"
              name="confirmEmail"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label htmlFor="password" className="text-black block">
              <span className="text-red-500">*</span> Contraseña
            </label>
            <input
              className="bg-white border w-full focus:blue-focus px-2 py-1"
              type="password"
              id="password"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="confirmPassword" className="text-black block">
              <span className="text-red-500">*</span> Confirmar contraseña
            </label>
            <input
              className="bg-white border w-full focus:blue-focus px-2 py-1"
              type="password"
              id="confirmPassword"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="text-black block">
            <span className="text-red-500">*</span> Telefono
          </label>
          <input
            className="bg-white border w-full focus:blue-focus px-2 py-1"
            type="phone"
            id="phone"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <div>
          <h3 className="mb-2">
            ¿Ya tienes una{" "}
            <Link to={`/`}>
              <span className="text-primary-color">cuenta</span>?
            </Link>
          </h3>
        </div>

        <div>
          <button
            className="text-sm text-white font-medium w-full rounded py-2 px-2 bg-primary-color hover:opacity-60 animation-fade"
            type="submit"
          >
            Registrarse
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
