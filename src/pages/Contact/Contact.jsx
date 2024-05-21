import { useMutation } from "@tanstack/react-query";
import ContactForm from "./components/ContactForm";
import { getError } from "../../utils/getError";
import { toast } from "react-toastify";
import axios from "axios";

const Contact = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (info) =>
      axios.post(`${import.meta.env.VITE_BASE_URL}/users/contacto`, info),

    onSuccess: (data) => {
      console.log(data);
      toast.success(`¡Enviado exitosamente!`);
    },

    onError: (err) => {
      toast.error(getError(err));
      console.log(err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const info = {
      name: e?.target?.name?.value?.trim(),
      email: e?.target?.email?.value?.trim(),
      phone: e?.target?.phone?.value?.trim(),
      comment: e?.target?.comment?.value?.trim(),
    };

    if ([info?.name, info?.email, info?.phone, info?.comment].includes("")) {
      return toast.error("¡Llena los campos disponibles!");
    }

    mutate({
      name: e?.target?.name?.value,
      email: e?.target?.email?.value,
      phone: e?.target?.phone?.value,
      comment: e?.target?.comment?.value,
    });
  };
  return (
    // Contacto Formulario
    <ContactForm handleSubmit={handleSubmit} isPending={isPending} />
  );
};

export default Contact;
