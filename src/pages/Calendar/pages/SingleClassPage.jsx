/* eslint-disable react/prop-types */
import { useParams } from 'react-router-dom';
import cycle from '../../../images/stationary-bike.png';

import { IoMdBicycle } from 'react-icons/io';
import { BsBicycle } from 'react-icons/bs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../../../utils/getError';

const SingleClassPage = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  console.log(id);

  const reservateMutation = useMutation({
    mutationFn: async (noBici) =>
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/class-schedule/${id}`,
        {
          noBici,
        }
      ),

    onSuccess: (data) => {
      console.log(data);
      toast.success('Reservado');
      queryClient.invalidateQueries(['singleClass', id]);
    },

    onError: (err) => {
      toast.error(getError(err));
    },
  });

  const classInfo = useQuery({
    queryKey: ['singleClass', id],
    queryFn: async () =>
      await axios(`${import.meta.env.VITE_BASE_URL}/class-schedule/${id}`).then(
        (res) => res.data
      ),
  });

  console.log(classInfo.data);

  if (classInfo.isLoading) return <p>Cargando</p>;

  if (classInfo.isError) return <p>Error</p>;

  return (
    <div className="container-page my-10">
      <header className="mb-10">
        <h1 className="text-center text-2xl font-semibold">
          Escoge tu bicicleta
        </h1>

        {/* <ul className="flex justify-center gap-5">
          <li className="flex items-center gap-2">
            <div className="rounded-full bg-primary-color h-7 w-7"></div>
            <p className="text-xl">Ocupado</p>
          </li>
          <li className="flex items-center gap-2">
            <div className="rounded-full bg-green-500 h-7 w-7"></div>
            <p className="text-xl">Disponible</p>
          </li>
        </ul> */}
      </header>

      <div className="mx-auto w-fit mb-5">
        <CycleBox isTaken={true} isInstructor={true} />
      </div>

      <div className="flex flex-wrap gap-10 justify-center max-w-2xl mx-auto">
        {Array.from({ length: 10 }).map((item, key) => (
          <div className="max-w-32" key={key}>
            <CycleBox
              isTaken={classInfo.data?.bicis?.findIndex(
                (item) => item.noBici === key
              )}
              isDisabled={reservateMutation.isPending}
              onReservate={reservateMutation}
              positionCycle={key}
            />
          </div>
        ))}
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
}) => {
  console.log(isTaken, 'esta tomado');
  if (isTaken >= 0)
    return (
      <div className="">
        <div
          className={`${isInstructor ? 'bg-primary-dark' : 'bg-red-500'} p-2 rounded-lg text-5xl text-white w-fit mx-auto`}
        >
          <IoMdBicycle />
        </div>
        <p className="text-xl">{isInstructor ? 'Instructor' : 'Ocupado'}</p>
      </div>
    );

  return (
    <button
      disabled={isDisabled}
      className="disabled:opacity-10"
      onClick={() => onReservate.mutate(positionCycle)}
    >
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
