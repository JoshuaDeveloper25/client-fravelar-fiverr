import { Link } from "react-router-dom";
import SignUpForm from "./components/SignUpForm";

const SignUp = () => {
  return (
    <section className="py-8">
      <div className="container-page">
        <h3 className="text-4xl text-center uppercase text-primary-color font-medium">
          Registro
        </h3>
        <p className="text-center text-sm text-gray-700">
          Para registrarte completa los datos del siguiente formulario
        </p>
      </div>

      <article className="bg-[#F5F5F5] text-gray-700 sm:py-8 py-0 my-4">
        <SignUpForm />
      </article>
    </section>
  );
};

export default SignUp;
