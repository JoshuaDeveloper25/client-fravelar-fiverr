import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Table } from "../../components/Table";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppProvider";
import dayjs from "dayjs";

const ReservedClasses = () => {
  const [reservedClasses, setReservedClasses] = useState([]);
  const [filterClassesValue, setFilterClassesValue] = useState("activas");
  const queryClient = useQueryClient();
  const { userInfo } = useContext(AppContext);

  const columns = [
    {
      header: <h3 className="px-3">Instructor</h3>,
      accessorKey: "instructorName",
      cell: (row) => row?.row?.original?.instructorInfo?.instructorName,
    },
    {
      header: <h3 className="px-3">Día de la Semana</h3>,
      accessorKey: "dayWeek",
    },
    {
      header: <h3 className="px-3">Fecha</h3>,
      accessorKey: "date",
    },
    {
      header: <h3 className="px-3">Hora Inicio</h3>,
      accessorKey: "startTime",
    },
    {
      header: <h3 className="px-3">N° Bici</h3>,
      accessorKey: "biciId",
      cell: (row) => row?.cell?.row?.original?.bicis?.[0]?.noBici,
    },
    {
      header: "Actions",
      cell: (info) => {
        const { mutate, isPending } = useMutation({
          mutationFn: () =>
            axios.delete(
              `${import.meta.env.VITE_BASE_URL}/users/cancel-class/${
                info?.row?.original?._id
              }`
            ),
          onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries(["all-classes"]);
            toast.success(`Exitosamente cancelado!`);
          },
          onError: (err) => {
            toast.error(getError(err));
            console.log(getError(err));
          },
        });

        const handleCancelClassed = () => {
          const user_quest = confirm(
            "Estás seguro de que quieres cancelar esta clase?"
          );

          if (!user_quest) return;
          
          mutate({});
        };

        if (isPending) return "Cargando...";

        const classData = info?.row?.original;
        const classDateTime = dayjs(
          `${classData?.date} ${classData?.startTime}`
        );
        const hoursLeft = classDateTime.diff(dayjs(), "hour");

        return hoursLeft > 4 ? (
          <Link
            onClick={handleCancelClassed}
            className="bg-red-500 text-white px-2 rounded-lg block text-center"
          >
            Cancelar
          </Link>
        ) : (
          <Link className="bg-gray-500/20 text-white px-2 rounded-lg block text-center pointer-events-none">
            Sin acción
          </Link>
        );
      },
    },
  ];

  const { data, isLoading, isError } = useQuery({
    queryKey: ["all-classes"],
    queryFn: async () =>
      await axios
        ?.get(`${import.meta.env.VITE_BASE_URL}/users/user-history`)
        .then((res) => res.data),
  });

  useEffect(() => {
    if (data) {
      const now = dayjs(); // Obtener fecha y hora actuales una vez
      const filteredClasses = data.filter((classData) => {
        const classDateTime = dayjs(
          `${classData?.date} ${classData?.startTime}`
        );

        if (filterClassesValue === "activas") {
          return classDateTime.isAfter(now);
        } else if (filterClassesValue === "pasadas") {
          return classDateTime.isBefore(now);
        } else {
          return true; // "todas"
        }
      });

      setReservedClasses(filteredClasses);
    }
  }, [data, filterClassesValue]); // Elimina la dependencia `now`

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p>Ocurrió algo...</p>;
  }

  return (
    <div className="container-page md:px-3 px-0 my-5">
      <h2 className="font-semibold text-3xl py-3">
        Historial de Clases Reservadas
      </h2>

      <select
        value={filterClassesValue}
        onChange={(e) => setFilterClassesValue(e.target.value)}
      >
        <option value="activas">Clases Activas</option>
        <option value="pasadas">Clases Pasadas</option>
        <option value="todas">Todas</option>
      </select>

      <Table columns={columns} data={reservedClasses} />
    </div>
  );
};

export default ReservedClasses;
