/* eslint-disable react/prop-types */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Table } from '../../components/Table';
import Header from './components/Header';
import { toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';
import { getError } from '../../utils/getError';
import ModalComponent from '../../components/ModalComponent';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import InputBox from '../../components/InputBox';

const ManageInstructors = () => {
  const columns = [
    {
      header: 'Nombre',
      accessorKey: 'packageName',
    },

    {
      header: 'Precio',
      accessorKey: 'packagePrice',
    },
    {
      header: 'Cantidad de Clases',
      accessorKey: 'packageQuantity',
    },

    {
      header: 'Actions',
      cell: (info) => <CellCustomInstructor dataRow={info?.row?.original} />,
    },
  ];

  const { data, isLoading } = useQuery({
    queryKey: ['classes'],
    queryFn: async () =>
      await axios
        ?.get(`${import.meta.env.VITE_BASE_URL}/class-package/`)
        .then((res) => res.data),
  });

  if (isLoading) {
    return <p>Loading...</p>;
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
  const [showModal, setShowModal] = useState(false);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (dataBody) =>
      axios.put(
        `${import.meta.env.VITE_BASE_URL}/class-package/${dataRow?._id}`,
        dataBody
      ),

    onSuccess: () => {
      queryClient.invalidateQueries(['classes']);
      toast.success(`Editado creado!`);
      setShowModal(!showModal);
    },

    onError: (err) => {
      toast.error(getError(err));
      console.log(err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    const dataSend = {
      packageName: data.get('packageName'),
      packagePrice: data.get('packagePrice'),
      packageQuantity: data.get('packageQuantity'),
      packageDuration: data.get('packageDuration'),
    };

    mutate(dataSend);
  };

  const deleteMutation = useMutation({
    mutationFn: (instructorInfo) =>
      axios.delete(
        `${import.meta.env.VITE_BASE_URL}/class-package/${dataRow?._id}`,
        instructorInfo
      ),

    onSuccess: () => {
      queryClient.invalidateQueries(['instructors']);
      toast.success(`Exitosamente editado!`);
    },

    onError: (err) => {
      toast.error(getError(err));
      console.log(err);
    },
  });
  const handleDelete = () => {
    const confirmDelete = confirm('Desea eliminar este paquete?');

    if (!confirmDelete) return;

    deleteMutation.mutate();
  };

  const isDisabled = isPending || deleteMutation.isPending;
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
        showBtn={false}
        titleModal={'Editar Paquetes'}
      >
        <form onSubmit={handleSubmit}>
          <div className="px-3">
            <InputBox
              propInput={{
                name: 'packageName',
                defaultValue: dataRow.packageName,
                required: true,
                disabled: isPending,
              }}
              labelTitle={'Nombre'}
            />

            <InputBox
              propInput={{
                name: 'packagePrice',
                defaultValue: dataRow.packagePrice,
                required: true,
                disabled: isPending,
                min: 10,
                type: 'number'
              }}
              labelTitle={'Precio'}
            />

            <InputBox
              propInput={{
                name: 'packageQuantity',
                defaultValue: dataRow.packageQuantity,
                required: true,
                disabled: isPending,
              }}
              labelTitle={'Cantidad de Clases'}
            />
            <InputBox
              propInput={{
                name: 'packageDuration',
                defaultValue: dataRow.packageDuration,
                required: true,
                disabled: isPending,
              }}
              labelTitle={'Duración de Dias'}
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

export default ManageInstructors;
