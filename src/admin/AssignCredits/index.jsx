import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ModalComponent from "../../components/ModalComponent";
import InputBox from "../../components/InputBox";
import { GrDocumentUser } from "react-icons/gr";
import { getError } from "../../utils/getError";
import { Table } from "../../components/Table";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import { useState } from "react";
import moment from "moment";
import axios from "axios";

const AssignCredits = () => {
  // Columns of table
  const columns = [
    {
      header: "Nombre",
      accessorKey: "packageName",
    },

    {
      header: "Precio",
      accessorKey: "packagePrice",
    },
    {
      header: "Cantidad de Clases",
      accessorKey: "packageQuantity",
    },

    {
      header: "Actions",
      cell: (info) => <CellCustomCredits dataRow={info?.row?.original} />,
    },
  ];

  const { data, isLoading, isError } = useQuery({
    queryKey: ["classes"],
    queryFn: async () =>
      await axios
        ?.get(`${import.meta.env.VITE_BASE_URL}/class-package/`)
        .then((res) => res.data),
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p>Ocurrió algo...</p>;
  }

  return (
    <div className="container-page md:px-3 px-0 my-5">
      {/* --> Table */}
      <Table searchInput={true} columns={columns} data={data} />
    </div>
  );
};

const CellCustomCredits = ({ dataRow }) => {
  const [showRequestUserEmail, setShowRequestUserEmail] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const queryClient = useQueryClient();
  const packageId = dataRow?._id;

  // Obtener los usuarios por el mail
  const getUserByEmailMutation = useMutation({
    mutationFn: async () =>
      await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/get-user-by-email/${userEmail}`
      ),
    onSuccess: (suc) => {
      console.log(suc);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // Asignar paquete
  const assignPackageMutation = useMutation({
    mutationFn: (assignPackageInfo) =>
      axios.patch(
        `${import.meta.env.VITE_BASE_URL}/users/assign-class-package`,
        assignPackageInfo
      ),
    onSuccess: (data) => {
      toast.success("¡Paquete asignado correctamente!");
      queryClient.invalidateQueries(["classes"]);
      setShowRequestUserEmail(false);
      setShowModal(false);
      setUserEmail("");
      console.log(data);
    },
    onError: (err) => {
      toast.error(getError(err));
      console.log(err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const user_request = confirm(
      "¿Estás seguro de que quieres asignarle este paquete a este usuario?"
    );

    if (!user_request) return;

    assignPackageMutation?.mutate({
      idPackage: packageId,
      momentDateFrontEnd: moment().format("YYYY-MM-DDTHH:mm:ssZ"),
      idUser: getUserByEmailMutation?.data?.data?.id,
    });
  };

  // Buscar usuario por email
  const handleSearchUserByEmail = () => {
    // Form validation
    if (!userEmail.trim(" ")) return toast.error("¡Introduce un gmail!");

    setShowRequestUserEmail(true);

    getUserByEmailMutation.mutate();
  };

  return (
    <>
      {/* Botón para abrir modal  */}
      <div className="flex gap-2">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center border border-blue-500 text-blue-500 rounded px-2 hover:text-white hover:bg-blue-500 font-medium transition-colors duration-200"
        >
          <GrDocumentUser className="me-3" /> Asignar
        </button>
      </div>

      {/* Modal of Assign */}
      <ModalComponent
        titleModal={"Agregar Crédito"}
        setShowModal={setShowModal}
        showModal={showModal}
        showBtn={false}
      >
        <form onSubmit={handleSubmit}>
          {/* Search User by gmail */}
          <div className="flex gap-3 items-end">
            <div className="flex-[60%]">
              <InputBox
                propInput={{
                  name: "searchUser",
                  required: true,
                  type: "search",
                  placeholder: "johndoe@gmail.com",
                  onChange: (e) => setUserEmail(e?.target?.value),
                  value: userEmail,
                }}
                labelClassname={"mb-0"}
                labelTitle={"Buscar Por Gmail"}
              />
            </div>

            <div className="flex-1">
              <button
                disabled={getUserByEmailMutation?.isPending}
                className="mt-5 btn w-full font-semibold disabled:bg-primary-color/40"
                onClick={handleSearchUserByEmail}
                type="button"
              >
                {getUserByEmailMutation?.isPending ? "Buscando..." : "Buscar"}
              </button>
            </div>
          </div>

          {/* In case if the user exists or not */}
          {getUserByEmailMutation?.isPending ? (
            <div className="my-4 h-[28px] animate-pulse bg-primary-light rounded p-1.5 text-center"></div>
          ) : (
            showRequestUserEmail && (
              <div className="my-4 bg-primary-light rounded p-1.5 text-center">
                {getUserByEmailMutation?.status === "success" ? (
                  <h3 className="block text-xl font-semibold">
                    ¡Usuario "
                    <span className="capitalize text-primary-color">
                      {getUserByEmailMutation?.data?.data?.name}
                    </span>
                    " Encontrado!
                  </h3>
                ) : (
                  <h3 className="block text-xl font-semibold">
                    ¡Usuario No Encontrado!
                  </h3>
                )}
              </div>
            )
          )}

          {/* Package that user selected */}
          <div className="border p-2 rounded-lg mt-4">
            <div className="bg-primary-light text-primary-dark text-xl rounded-lg w-full text-center overflow-hidden">
              <div className="text-end">
                <span className="bg-primary-color/15 w-fit py-1.5 px-3 inline-flex rounded-l-3xl text-2xl">
                  {dataRow?.packagePrice} <span className="text-sm">MXN</span>
                </span>
              </div>
              <div className="px-5 pb-5">
                <p className="font-bold text-2xl">{dataRow.packageName}</p>

                <p className="text-center text-5xl my-5">
                  {dataRow?.packageQuantity}
                </p>

                <p>
                  Plan{" "}
                  <span className="font-bold">
                    Expira {dataRow?.packageDuration} dias
                  </span>
                </p>

                <button
                  disabled={
                    !showRequestUserEmail || assignPackageMutation?.isPending
                  }
                  className="mt-5 btn w-full font-semibold disabled:bg-primary-color/40"
                  type="submit"
                >
                  {assignPackageMutation?.isPending
                    ? "Asignando..."
                    : "Asignar Este Paquete"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </ModalComponent>
    </>
  );
};

export default AssignCredits;
