import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { getError } from '../../utils/getError';

import logo from '../../images/cycle-logo4.png';

const ConfirmAccount = () => {
  const { token } = useParams();

  console.log(token);
  return (
    <div className="container-page my-10 text-center text-2xl">
      <img src={logo} alt="logo" className="max-h-40 mx-auto mb-5" />
      <MessageBody token={token} />
    </div>
  );
};

const MessageBody = ({ token }) => {
  const { isLoading, isError, error } = useQuery({
    queryKey: ['validating', token],
    queryFn: async () =>
      await axios(`${import.meta.env.VITE_BASE_URL}/users/confirm/${token}`),
    retry: false,
  });

  if (isLoading) return <p>Verificando su cuenta</p>;

  if (isError) return <p>{getError(error)}</p>;

  return (
    <div>
      <p className='text-primary-color font-bold mb-5'>Su cuenta ha sido verificado</p>
      <Link to={'/'} className='text-primary-dark'>Iniciar sesión</Link>
    </div>
  );
};

export default ConfirmAccount;
