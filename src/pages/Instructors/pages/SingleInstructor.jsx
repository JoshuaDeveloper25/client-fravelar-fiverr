import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../../../components/Spinner';

const SingleInstructor = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['instructor', id],
    queryFn: async () =>
      await axios?.get(`${import.meta.env.VITE_BASE_URL}/instructors/${id}`),
  });

  if (isLoading) return <Spinner />;

  if (isError) return <p>Ocurrio Algo</p>;

  return (
    <section className="container-page mt-10">
      <div className="shadow-lg px-5 py-10 mb-10">
        <Link to={-1} className="btn-back">
          Regresar
        </Link>
        <div className="flex flex-col md:flex-row gap-10">
          <article className='self-center'>
            <img
              className="h-80 w-[15rem] object-cover"
              src={data?.data?.image?.[0]?.cloudinary_url}
            />
          </article>
          <article>
            <h2 className="text-2xl font-bold capitalize">
              {data?.data?.instructorName}
            </h2>
            <p className="my-3 text-justify text-gray-600">
              {data?.data?.description}
            </p>
            <Link to={'/calendario'} className="text-center btn px-5">
              Ver Horarios
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
};

export default SingleInstructor;
