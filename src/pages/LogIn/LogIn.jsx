import { getError } from "../../utils/getError";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { useContext } from "react";
import AppContext from "../../context/AppProvider";
import LogInForm from "./components/LogInForm";

const LogIn = () => {
  const { setUserInfo } = useContext(AppContext);

  const { data, mutate, error, isPending } = useMutation({
    mutationFn: async (userInfo) =>
      await axios?.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userInfo
      ),
    onSuccess: (data) => {
      localStorage.setItem("userInfo", JSON.stringify(data?.data));
      toast.success("Sesión iniciada correctamente!");
      setUserInfo(data?.data);
    },
    onError: (err) => {
      toast.error(getError(err));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const userInfo = {
      email: e?.target?.email.value.trim(),
      password: e?.target?.password?.value.trim(),
    };

    // Form validation
    if ([userInfo?.email, userInfo?.password].includes("")) {
      return toast.error("Llena los espacios disponibles!");
    }

    mutate({
      email: userInfo?.email,
      password: userInfo?.password,
    });
  };

  return (
    <section className="py-8">
      <div className="container-page">
        <h3 className="text-4xl text-primary-color font-medium text-center uppercase">
          Iniciar Sesión
        </h3>
      </div>

      <article className="bg-[#F5F5F5] text-gray-700 sm:py-8 py-0 my-4">
        <LogInForm handleSubmit={handleSubmit} isLoading={isPending} />
      </article>
    </section>
  );
};

export default LogIn;
