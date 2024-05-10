import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const ClassesSection = () => {
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
    <div className="container-page my-10">
      <h2 className='text-2xl mb-5'>Comprar clases</h2>
      
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.map((classItem) => (
          <div key={classItem?._id} className="border p-2 rounded-lg">
            <div className="bg-primary-light text-primary-dark text-xl rounded-lg w-full text-center overflow-hidden">
              <div className="text-end">
                <span className="bg-primary-color/15 w-fit py-1.5 px-3 inline-flex rounded-l-3xl text-2xl">
                  ${classItem?.packagePrice} <span className="text-sm">MXN</span>
                </span>
              </div>
              <div className="px-5 pb-5">
                <p className="font-bold text-2xl">{classItem.packageName}</p>

                <p className="text-center text-5xl my-5">
                  {classItem?.packageQuantity}
                </p>

                <p>
                  Plan{' '}
                  <span className="font-bold">
                    Expira {classItem?.packageDuration} dias
                  </span>
                </p>

                <Link
                  to={`/comprar-paquete/${classItem._id}`}
                  className="mt-5 btn"
                >
                  Comprar
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassesSection;
