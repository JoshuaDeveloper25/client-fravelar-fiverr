import { useMutation, useQueryClient } from "@tanstack/react-query";
import ModalComponent from "../../../components/ModalComponent";
import { getError } from "../../../utils/getError";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (instructorInfo) =>
      axios.post(
        `${import.meta.env.VITE_BASE_URL}/instructors/`,
        instructorInfo
      ),

    onSuccess: () => {
      queryClient.invalidateQueries(["instructors"]);
      toast.success(`Exitosamente creado!`);
      setShowModal(!showModal);
    },

    onError: (err) => {
      toast.error(getError(err));
      console.log(err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    console.log(e.target.uploadImages.files[0]);
    data.append("uploadImages", e.target.uploadImages.files[0]);
    data.append("instructorName", e.target.instructorName.value);
    data.append("description", e.target.instructorDesc.value);

    mutate(data);
  };

  return (
    <div>
      <ModalComponent
        setShowModal={setShowModal}
        showModal={showModal}
        textBtn={"Crear Instructor"}
        titleModal={"Crear Instructor"}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <div className="flex-1">
              <input
                type="text"
                className="outline-none w-full px-2 py-1 rounded-sm focus:border-secondary border"
                placeholder="Nombre"
                name="instructorName"
                required
              />
            </div>

            <div className="flex-1">
              <input
                type="text"
                className="outline-none w-full px-2 py-1 rounded-sm focus:border-secondary border"
                placeholder="Descripción"
                name="instructorDesc"
                required
              />
            </div>

            <div className="flex-1">
              <input
                type="file"
                className="outline-none w-full px-2 py-1 rounded-sm focus:border-secondary border"
                name="uploadImages"
                id="uploadImages"
              />
            </div>

            <button className="button-primary" disabled={isPending}>
              Registrar
            </button>
          </div>
        </form>
      </ModalComponent>
    </div>
  );
};

export default Header;
