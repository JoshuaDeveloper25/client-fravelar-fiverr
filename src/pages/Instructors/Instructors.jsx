import InstructorsCards from './components/InstructorsCards';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Instructors = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['instructors'],
    queryFn: async () =>
      await axios?.get(`${import.meta.env.VITE_BASE_URL}/instructors/`),
  });

  if (isLoading) {
    return (
      <section className="container-page my-10 disable-menu">
        <h2 className="uppercase text-4xl text-center py-6">INSTRUCTORES</h2>

        <article className="flex flex-wrap items-end gap-y-6 justify-center gap-6 p-6">
          <div className="animate-pulse bg-primary-color/40 rounded-lg w-[15rem] h-[25rem]"></div>
          <div className="animate-pulse bg-primary-color/40 rounded-lg w-[15rem] h-[25rem]"></div>
          <div className="animate-pulse bg-primary-color/40 rounded-lg w-[15rem] h-[25rem]"></div>
        </article>
      </section>
    );
  }

  return (
    <section className="container-page my-10">
      <InstructorsCards instructors={data?.data} />
    </section>
  );
};

export default Instructors;
