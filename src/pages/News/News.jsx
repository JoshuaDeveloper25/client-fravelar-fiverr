import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TextRich from '../../admin/ManageNews/components/TextRich';

const SingleNew = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['news', id],
    queryFn: async () =>
      await axios?.get(`${import.meta.env.VITE_BASE_URL}/news/${id}`),
  });

  if (isLoading) return <p>Cargando</p>;

  return (
    <section className="container-page mt-10">
      <div className="flex flex-col md:flex-row gap-10 shadow-lg px-5 py-10 mb-10">
        <article className='flex-1 max-w-[20rem] mx-auto text-center'>
          <img
            className="h-80 w-80 object-cover"
            src={data?.data?.image?.[0]?.cloudinary_url}
          />
        </article>

        <article className='flex-1'>
          <h2 className="text-2xl font-bold capitalize">
            {data?.data?.newsTitle}
          </h2>
          <p className="my-3 text-justify text-gray-600 disable-menu border-l-4 pl-5 border-gray-400 ">
            <TextRich value={data?.data?.newsDescription} readOnly={true} />
          </p>
        </article>
      </div>
    </section>
  );
};

export default SingleNew;
