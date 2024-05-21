/* eslint-disable react/prop-types */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Table } from '../../components/Table';
import Header from './components/Header';
import { toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';
import { getError } from '../../utils/getError';
import ModalComponent from '../../components/ModalComponent';
import TextRich from './components/TextRich';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import InputBox from '../../components/InputBox';
import CellPreviewImg from '../../components/CellPreviewImg';
import Spinner from '../../components/Spinner';

const ManageNews = () => {
  const columns = [
    {
      header: 'Nombre',
      accessorKey: 'newsTitle',
    },

    // {
    //   header: 'Descricion',
    //   accessorKey: 'newsDescription',
    // },

    {
      header: 'Imagen del Anuncio',
      cell: (info) => <CellPreviewImg dataRow={info?.row?.original} />,
    },

    {
      header: 'Actions',
      cell: (info) => <CellCustomInstructor dataRow={info?.row?.original} />,
    },
  ];

  const { data, isLoading, isError } = useQuery({
    queryKey: ['news'],
    queryFn: async () =>
      await axios
        ?.get(`${import.meta.env.VITE_BASE_URL}/news/`)
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
  const [showModal, setShowModal] = useState(false);
  const [richTxtValue, setRichTxtValue] = useState(dataRow?.newsDescription);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (instructorInfo) =>
      axios.put(
        `${import.meta.env.VITE_BASE_URL}/news/${dataRow?._id}`,
        instructorInfo
      ),

    onSuccess: () => {
      queryClient.invalidateQueries(['news']);
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
        `${import.meta.env.VITE_BASE_URL}/news/${dataRow?._id}`,
        instructorInfo
      ),

    onSuccess: () => {
      queryClient.invalidateQueries(['news']);
      toast.success(`Exitosamente Eliminado!`);
    },

    onError: (err) => {
      toast.error(getError(err));
      console.log(err);
    },
  });

  const handleDelete = () => {
    const confirmDelete = confirm('Desea eliminar este instructor?');

    if (!confirmDelete) return;

    deleteMutation.mutate();
  };

  console.log(dataRow);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    const dataSend = {
      newsTitle: data.get('newsTitle'),
      newsDescription: richTxtValue,
    };

    mutate(dataSend);
  };

  const isDisabled = isPending;

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
        titleModal={'Editar Noticia'}
        showBtn={false}
      >
        <form onSubmit={handleSubmit}>
          <div className="px-3">
            <InputBox
              propInput={{
                name: 'newsTitle',
                required: true,
                disabled: isDisabled,
                defaultValue: dataRow?.newsTitle,
              }}
              labelTitle={'Titulo'}
            />

            <div className="mb-10">
              <TextRich value={richTxtValue} setValue={setRichTxtValue} />
            </div>
            
          </div>
          <button className="btn w-full" disabled={isDisabled}>
            Editar
          </button>
        </form>
      </ModalComponent>
    </>
  );
};

export default ManageNews;
