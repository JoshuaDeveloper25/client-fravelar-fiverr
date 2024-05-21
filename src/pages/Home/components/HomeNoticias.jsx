import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import TextRich from '../../../admin/ManageNews/components/TextRich';
import { Link } from 'react-router-dom';

const HomeNoticias = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['news'],
    queryFn: async () =>
      await axios
        ?.get(`${import.meta.env.VITE_BASE_URL}/news/`)
        .then((res) => res.data),
  });

  if (isError) {
    return <p>Ocurrio Algo</p>;
  }

  if (isLoading) {
    return (
      <section className="container-page my-10 disable-menu">
        <h2 className="uppercase text-4xl text-center py-6">Noticias</h2>

        <article className="flex flex-wrap items-end gap-y-6 justify-center gap-6 p-6">
          <div className="animate-pulse bg-primary-color/40 rounded-lg w-[19rem] h-[25rem]"></div>
          <div className="animate-pulse bg-primary-color/40 rounded-lg w-[19rem] h-[25rem]"></div>
          <div className="animate-pulse bg-primary-color/40 rounded-lg w-[19rem] h-[25rem]"></div>
        </article>
      </section>
    );
  }

  console.log(data);
  return (
    <section className="container-page my-10 disable-menu">
      <h2 className="uppercase text-4xl text-center py-6">Noticias</h2>

      <article className="flex flex-wrap items-end gap-y-6 justify-center gap-6 p-6">
        {data?.map((item) => (
          <div
            key={item?._id}
            className="min-w-[19rem] max-w-[19rem] flex-1 hover:scale-105 ease-out transition-transform duration-300 border shadow-lg"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div>
              <img
                className="w-full h-96 object-cover"
                src={item?.image[0]?.cloudinary_url}
              />
            </div>
            <div className="px-3 py-3">
              <h4 className="text-gray-800 font-medium pb-2">
                {item?.newsTitle}
              </h4>
              <p className="text-gray-500 text-sm ">
                {/* {item?.newsDescription} */}
                {/* <TextRich value={item?.newsDescription} readOnly={true}/> */}
              </p>
              <Link
                to={`/new/${item?._id}`}
                className="block text-center w-full border border-primary-color text-primary-color mt-3 hover:bg-primary-color hover:text-white animation-fade uppercase text-xs font-bold px-2 py-2"
              >
                Leer Más
              </Link>
            </div>
          </div>
        ))}
      </article>
    </section>
  );
};

export default HomeNoticias;
