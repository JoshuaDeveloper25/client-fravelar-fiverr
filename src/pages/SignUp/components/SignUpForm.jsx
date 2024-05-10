import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from '../../../utils/getError';

const SignUpForm = () => {
  const navigate = useNavigate();

  const signUpMutate = useMutation({
    mutationFn: async (dataBody) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        dataBody
      ),
    onSuccess: (data) => {
      navigate('/emailenviado');
    },
    onError: (err) => {
      toast.error(getError(err));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataForm = new FormData(e.target);

    const dataSend = {
      email: dataForm.get('email'),
      name: dataForm.get('name'),
      password: dataForm.get('password'),
    };

    if (dataForm.get('passwordVerify') !== dataSend.password) {
      return toast.error('No coinciden las contraseñas');
    }

    signUpMutate.mutate(dataSend);
  };

  const isDisabled = signUpMutate.isPending;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto shadow-lg rounded space-y-5 px-6 py-6"
    >
      <div>
        <h4 className="text-sm pt-1">Completa el siguiente formulario</h4>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="fullName" className="text-black block">
            <span className="text-red-500">*</span> Nombre Completo
          </label>
          <input
            className="bg-white border w-full focus:blue-focus px-2 py-1"
            type="text"
            id="fullName"
            name="name"
            required
            disabled={isDisabled}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label htmlFor="email" className="text-black block">
              <span className="text-red-500">*</span> Email
            </label>
            <input
              className="bg-white border w-full focus:blue-focus px-2 py-1"
              type="email"
              id="email"
              name="email"
              required
              disabled={isDisabled}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label htmlFor="password" className="text-black block">
              <span className="text-red-500">*</span> Contraseña
            </label>
            <input
              className="bg-white border w-full focus:blue-focus px-2 py-1"
              type="password"
              id="password"
              name="password"
              required
              disabled={isDisabled}
            />
          </div>

          <div className="flex-1">
            <label htmlFor="confirmPassword" className="text-black block">
              <span className="text-red-500">*</span> Confirmar contraseña
            </label>
            <input
              className="bg-white border w-full focus:blue-focus px-2 py-1"
              type="password"
              id="confirmPassword"
              name="passwordVerify"
              required
              disabled={isDisabled}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div>
          <h3 className="mb-2">
            ¿Ya tienes una{' '}
            <Link to={`/`}>
              <span className="text-primary-color">cuenta</span>?
            </Link>
          </h3>
        </div>

        <div>
          <button
            disabled={isDisabled}
            className="text-sm text-white font-medium w-full rounded py-2 px-2 bg-primary-color hover:opacity-60 animation-fade"
            type="submit"
          >
            Registrarse
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
