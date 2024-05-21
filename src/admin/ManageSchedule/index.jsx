/* eslint-disable react/prop-types */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Table } from "../../components/Table";
import Header from "./components/Header";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import { getError } from "../../utils/getError";
import ModalComponent from "../../components/ModalComponent";

import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import InputBox from "../../components/InputBox";
import Select from "../../components/Select";
import moment from "moment";
import { diasSemana } from "../../utils/data";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";

const ManageSchedule = () => {
  const columns = [
    {
      header: "Instructor",
      accessorKey: "instructorInfo.instructorName",
    },

    {
      header: "Dia de la Semana",
      accessorKey: "dayWeek",
    },

    {
      header: "Fecha",
      accessorKey: "date",
    },

    {
      header: "Tiempo Inicio",
      accessorKey: "startTime",
    },

    {
      header: "Reservas",
      cell: (info) => {
        const value = info?.row?.original;
        console.log(value);

        return (
          <Link
            to={`/admin/administrar-calendario/${value?._id}`}
            className="bg-blue-500 text-white px-2 rounded-lg"
          >
            Ver Gente ({value?.bicis.length})
          </Link>
        );
      },
    },

    {
      header: "Actions",
      cell: (info) => <CellCustomInstructor dataRow={info?.row?.original} />,
    },
  ];

  const { data, isLoading, isError } = useQuery({
    queryKey: ["all-classes"],
    queryFn: async () =>
      await axios
        ?.get(
          `${import.meta.env.VITE_BASE_URL}/class-schedule/all-class-schedule`
        )
        .then((res) => res.data),
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p>Ocurrió algo...</p>;
  }

  console.log(data);

  return (
    <div className="container-page md:px-3 px-0 my-5">
      <Header />

      {/* --> Table */}
      <Table columns={columns} data={data} />
    </div>
  );
};

const CellCustomInstructor = ({ dataRow }) => {
  const [selectedOption, setSelectedOption] = useState(
    dataRow?.instructorInfo._id
  );

  const [showModal, setShowModal] = useState(false);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (instructorInfo) =>
      axios.put(
        `${import.meta.env.VITE_BASE_URL}/class-schedule/${dataRow?._id}`,
        instructorInfo
      ),

    onSuccess: () => {
      queryClient.invalidateQueries(["all-classes"]);
      toast.success(`Exitosamente editado!`);
      setShowModal(!showModal);
    },

    onError: (err) => {
      toast.error(getError(err));
      console.log(err);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (instructorInfo) =>
      axios.delete(
        `${import.meta.env.VITE_BASE_URL}/class-schedule/${dataRow?._id}`,
        instructorInfo
      ),

    onSuccess: () => {
      queryClient.invalidateQueries(["all-classes"]);
      toast.success(`Exitosamente editado!`);
    },

    onError: (err) => {
      toast.error(getError(err));
      console.log(err);
    },
  });
  const handleDelete = () => {
    const confirmDelete = confirm("Desea eliminar este clase?");

    if (!confirmDelete) return;

    deleteMutation.mutate();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    const dataSend = {
      date: moment(data.get("date")).format("YYYY/MM/DD"),
      startTime: data.get("startTime"),
      dayWeek: obtenerNombreDia(data.get("date")),
      instructorInfo: data.get("instructorInfo"),
    };

    function obtenerNombreDia(fecha) {
      return diasSemana[new Date(fecha).getDay()];
    }

    mutate(dataSend);
  };

  const onhandleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <>
      <div className="flex gap-2 text-3xl">
        <button
          disabled={deleteMutation.isPending}
          onClick={() => setShowModal(true)}
          className="text-blue-500"
        >
          <MdModeEdit />
        </button>
        <button
          disabled={deleteMutation.isPending}
          onClick={handleDelete}
          className="text-primary-color"
        >
          <MdDelete />
        </button>
      </div>

      <ModalComponent
        setShowModal={setShowModal}
        showModal={showModal}
        titleModal={"Editar Clase"}
        showBtn={false}
      >
        <form onSubmit={handleSubmit}>
          <div className="px-3">
            <div className="flex gap-5">
              <div className="flex-1">
                <InputBox
                  propInput={{
                    name: "date",
                    required: true,
                    type: "date",
                    disabled: isPending,
                    defaultValue: moment(dataRow?.date).format("YYYY-MM-DD"),
                  }}
                  labelTitle={"Fecha"}
                />
              </div>

              <div className="flex-1">
                <InputBox
                  propInput={{
                    name: "startTime",
                    required: true,
                    type: "time",
                    disabled: isPending,
                    defaultValue: dataRow?.startTime,
                  }}
                  labelTitle={"Hora Inicio"}
                />
              </div>
            </div>

            <Select
              labelTitle={"Escoge Instructor"}
              endpoint={"/instructors/"}
              name={"instructorInfo"}
              optionName={"instructorName"}
              defaultValue={"-- Selecciona Instructor --"}
              disabled={isPending}
              value={selectedOption}
              onhandleChange={onhandleChange}
              required
            />
          </div>
          <button className="btn w-full" disabled={isPending}>
            Registrar
          </button>
        </form>
      </ModalComponent>
    </>
  );
};

export default ManageSchedule;
