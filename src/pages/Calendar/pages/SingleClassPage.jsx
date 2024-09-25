/* eslint-disable react/prop-types */
import { Link, Navigate, useParams } from "react-router-dom";
import cycle from "../../../images/stationary-bike.png";

import { IoMdBicycle } from "react-icons/io";
import { BsBicycle } from "react-icons/bs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../../../utils/getError";
import { useContext } from "react";
import AppContext from "../../../context/AppProvider";
import moment from "moment";
import Spinner from "../../../components/Spinner";

const SingleClassPage = ({ isAdmin }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { userInfo } = useContext(AppContext);
  console.log(id);

  const classesQuery = useQuery({
    queryKey: ["qunatityClass", userInfo?.token],
    queryFn: async () =>
      await axios(`${import.meta.env.VITE_BASE_URL}/users/get-saldo`, {
        params: {
          currentDate: moment().format("YYYY-MM-DDTHH:mm:ssZ"),
        },
      }).then((res) => res.data),

    enabled: !!userInfo.token,
  });

  const reservateMutation = useMutation({
    mutationFn: async (noBici) =>
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/class-schedule/${id}`,
        {
          noBici,
        },
        {
          params: {
            currentDate: moment().format("YYYY-MM-DDTHH:mm:ssZ"),
          },
        }
      ),

    onSuccess: (data) => {
      console.log(data);
      toast.success("Reservado");
      queryClient.invalidateQueries(["singleClass", id]);
    },

    onError: (err) => {
      toast.error(getError(err));
      classesQuery.refetch();
    },
  });

  const classInfo = useQuery({
    queryKey: ["singleClass", id],
    queryFn: async () =>
      await axios(`${import.meta.env.VITE_BASE_URL}/class-schedule/${id}`).then(
        (res) => res.data
      ),
  });

  if (classesQuery.isLoading || classInfo.isLoading) return <Spinner />;

  if (classesQuery.isError || classInfo.isError) return <p>Error</p>;

  if (classesQuery?.data.tusClases?.classQuantity === 0 && !isAdmin) {
    toast.warning("No tienes clases comprados");
    return <Navigate to={"/comprar-clases"} />;
  }

  console.log(classInfo.data);

  return (
    <div className="container-page my-10">
      <header className="mb-10">
        <Link to={-1} className="btn-back">
          Regresar
        </Link>

        {isAdmin && <h1 className="text-xl">Clase: {id}</h1>}

        {!isAdmin && (
          <h1 className="text-center text-2xl font-semibold">
            Escoge tu bicicleta
          </h1>
        )}
      </header>

      <div className="overflow-x-auto">
        <div className="min-w-[40rem]">
          <div className="mx-auto w-fit mb-5">
            <CycleBox isTaken={true} isInstructor={true} />
          </div>
          <div className="grid grid-cols-5 gap-10 justify-center max-w-2xl mx-auto">
            {Array.from({ length: 10 }).map((item, key) => (
              <div className="max-w-32" key={key}>
                <CycleBox
                  isTaken={classInfo.data?.bicis?.findIndex(
                    (item) => item.noBici === key
                  )}
                  isDisabled={isAdmin || reservateMutation.isPending}
                  onReservate={reservateMutation}
                  positionCycle={key}
                  isAdmin={isAdmin}
                  data={classInfo.data?.bicis?.find(
                    (item) => item.noBici === key
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CycleBox = ({
  isTaken,
  onReservate,
  positionCycle,
  isDisabled,
  isInstructor,
  isAdmin,
  data,
}) => {
  let text = "Ocupado";

  if (isInstructor && !isAdmin) {
    text = "Instructor";
  }

  if (isAdmin) {
    text = data?.nameClient;
    console.log(data);
  }

  console.log(isTaken, "esta tomado");
  if (isTaken >= 0)
    return (
      <div className="text-center">
        <span className="font-semibold">
          {typeof positionCycle === "number" && positionCycle + 1}
        </span>
        <div
          className={`${
            isInstructor ? "bg-primary-dark" : "bg-red-500"
          } p-2 rounded-lg text-5xl text-white w-fit mx-auto`}
        >
          <IoMdBicycle />
        </div>
        <p className="text-xl">{text}</p>
      </div>
    );

  return (
    <button
      disabled={isDisabled}
      className={`${isAdmin ? "pointer-events-none" : null}`}
      onClick={() => {
        const confirmReq = confirm("Seguro que deseas esta Bici?");

        if (!confirmReq) return;

        onReservate.mutate(positionCycle);
      }}
    >
      <span className="font-semibold">
        {typeof positionCycle === "number" && positionCycle + 1}
      </span>
      <div
        className={`p-2 rounded-lg text-5xl bg-slate-200 hover:bg-green-500 hover:text-white transition-all cursor-pointer w-fit mx-auto`}
      >
        <BsBicycle />
      </div>
      <p className="text-xl">Disponible</p>
    </button>
  );
};

export default SingleClassPage;
