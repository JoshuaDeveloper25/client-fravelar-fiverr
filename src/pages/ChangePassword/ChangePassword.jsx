import ChangePasswordForm from "./components/ChangePasswordForm";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { getError } from "../../utils/getError";
import { toast } from "react-toastify";
import axios from "axios";

const ChangePassword = () => {
  const navigate = useNavigate();
  const params = useParams();
  const userToken = params?.token;

  const { mutate, isPending } = useMutation({
    mutationFn: async (userInfo) =>
      await axios?.patch(
        `${import.meta.env.VITE_BASE_URL}/users/change-password/${userToken}`,
        userInfo
      ),
    onSuccess: (data) => {
      toast.success("¡Contraseña cambiada correctamente!");
      navigate("/");
    },
    onError: (err) => {
      toast.error(getError(err));
      console.log(err);
      console.log(getError(err));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const userInfo = {
      password: e?.target?.password.value.trim(),
      repeatPassword: e?.target?.repeatPassword.value.trim(),
    };

    // Form validation
    if ([userInfo?.password, userInfo?.repeatPassword].includes("")) {
      return toast.error("Llena los espacios disponibles!");
    } else if (userInfo?.password !== userInfo?.repeatPassword) {
      return toast.error("¡Contraseñas no coinciden!");
    }

    mutate({ password: e?.target?.password.value.trim() });
  };

  return (
    <section className="py-8">
      <div className="container-page">
        <h3 className="text-4xl text-primary-color font-medium text-center uppercase">
          Crear Nueva Contraseña
        </h3>
      </div>

      <article className="bg-[#F5F5F5] text-gray-700 sm:py-8 py-0 my-4">
        <ChangePasswordForm handleSubmit={handleSubmit} isLoading={isPending} />
      </article>
    </section>
  );
};

export default ChangePassword;
