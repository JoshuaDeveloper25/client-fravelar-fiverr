import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const SingleInstructor = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["instructor", id],
    queryFn: async () =>
      await axios?.get(`${import.meta.env.VITE_BASE_URL}/instructors/${id}`),
  });

  return (
    <section className="container-page">
      <div className="flex gap-10 shadow-lg px-5 py-10 mb-10">
        <article>
          <img className="h-80 w-80 object-contain" src={data?.data?.image?.[0]?.cloudinary_url} />
        </article>

        <article>
          <h2 className="text-2xl font-bold capitalize">{data?.data?.instructorName}</h2>
          <p className="my-3 text-justify text-gray-600">{data?.data?.description}</p>
          <button className="w-full border border-primary-color text-primary-color mt-3 hover:bg-primary-color hover:text-white animation-fade uppercase text-xs font-bold px-2 py-2">
            Ver Horarios
          </button>
        </article>
      </div>
    </section>
  );
};

export default SingleInstructor;
