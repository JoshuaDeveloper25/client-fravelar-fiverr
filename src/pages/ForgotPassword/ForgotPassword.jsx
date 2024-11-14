import ForgotPasswordForm from "./components/ForgotPasswordForm";
import { useMutation } from "@tanstack/react-query";
import { getError } from "../../utils/getError";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (userInfo) =>
      await axios?.post(
        `${import.meta.env.VITE_BASE_URL}/users/forgotpassword`,
        userInfo
      ),
    onSuccess: (data) => {
      navigate("/olvide-password-sent-email-success", {
        state: data?.data?.message,
      });
    },
    onError: (err) => {
      toast.error(getError(err));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const userInfo = {
      email: e?.target?.email.value.trim(),
    };

    // Form validation
    if ([userInfo?.email].includes("")) {
      return toast.error("Llena los espacios disponibles!");
    }

    mutate(userInfo);
  };

  return (
    <section className="py-8">
      <div className="container-page">
        <h3 className="text-4xl text-primary-color font-medium text-center uppercase">
          Restrablecer Contraseña
        </h3>
      </div>

      <article className="bg-[#F5F5F5] text-gray-700 sm:py-8 py-0 my-4">
        <ForgotPasswordForm handleSubmit={handleSubmit} isLoading={isPending} />
      </article>
    </section>
  );
};

export default ForgotPassword;
