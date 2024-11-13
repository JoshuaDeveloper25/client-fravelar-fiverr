import { useLocation } from "react-router-dom";

const ForgotPasswordSentEmailSuccess = () => {
  const location = useLocation();
  const successMessage = location?.state;

  return (
    <section className="bg-[#F5F5F5] text-gray-700 sm:py-8 py-0 my-4 mx-3">
      <div className="max-w-lg mx-auto rounded shadow-lg space-y-3 px-6 py-6">
        <h1 className="text-4xl uppercase text-primary-color text-center font-semibold leading-7">
          ¡Enviado!
        </h1>

        <h2 className="text-2xl text-center font-semibold leading-7 py-2">
          {successMessage}
        </h2>

        <h3 className="max-w-md text-center font-normal leading-5">
          Ve a tu gestor de correos electrónicos y verifica si recibiste un
          correo de parte de nosotros.
        </h3>
        <p className="text-sm font-black pt-8">
          Nota: Puedes cerrar esta ventana cuando quieras.
        </p>
      </div>
    </section>
  );
};

export default ForgotPasswordSentEmailSuccess;
