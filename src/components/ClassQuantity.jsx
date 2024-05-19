import { useContext } from 'react';
import AppContext from '../context/AppProvider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import moment from 'moment';

const ClassQuantity = () => {
  const { userInfo } = useContext(AppContext);
  const classesQuery = useQuery({
    queryKey: ['qunatityClass', userInfo?.token],
    queryFn: async () =>
      await axios(`${import.meta.env.VITE_BASE_URL}/users/get-saldo`, {
        params: {
          currentDate: moment().format('YYYY-MM-DDTHH:mm:ssZ'),
        },
      }).then((res) => res.data),

    enabled: !!userInfo.token,
  });

  if (!userInfo?.token) return;

  if (classesQuery.isLoading) return;

  if (classesQuery.data?.tusClases?.classQuantity === 0) return;

  console.log(classesQuery.data);

  return (
    <div className="group relative z-40 border border-primary-color rounded-xl px-3 py-1 text-black font-semibold">
      {classesQuery?.isLoading && <span>Cargando</span>}
      {!classesQuery?.isLoading && (
        <>
          <span>Tus clases: {classesQuery.data?.tusClases?.classQuantity}</span>

          <span className="text-center px-2 py-1.5 rounded-full group-hover:block hidden min-w-44 bg-primary-color text-white absolute top-full left-1/2 mt-2 -translate-x-1/2">
            Expiran:{' '}
            {moment(classesQuery.data?.tusClases?.expiresIn).format(
              'YYYY/MM/DD'
            )}
          </span>
        </>
      )}
    </div>
  );
};

export default ClassQuantity;
