import React, { useContext } from 'react';
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

  console.log(classesQuery.data);

  return (
    <div className="border border-primary-color rounded-xl px-3 py-1 text-black font-semibold">
      {classesQuery?.isLoading && <span>Cargando</span>}
      {!classesQuery?.isLoading && (
        <span>Tus clases: {classesQuery.data?.tusClases?.classQuantity}</span>
      )}
    </div>
  );
};

export default ClassQuantity;
