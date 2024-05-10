import { useMutation, useQueryClient } from '@tanstack/react-query';
import ModalComponent from '../../../components/ModalComponent';
import { getError } from '../../../utils/getError';
import { toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';
import InputBox from '../../../components/InputBox';

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (instructorInfo) =>
      axios.post(
        `${import.meta.env.VITE_BASE_URL}/class-package/`,
        instructorInfo
      ),

    onSuccess: () => {
      queryClient.invalidateQueries(['classes']);
      toast.success(`Exitosamente creado!`);
      setShowModal(!showModal);
    },

    onError: (err) => {
      toast.error(getError(err));
      console.log(err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    const dataSend = {
      packageName: data.get('packageName'),
      packagePrice: data.get('packagePrice'),
      packageQuantity: data.get('packageQuantity'),
      packageDuration: data.get('packageDuration'),
    };

    mutate(dataSend);
  };

  return (
    <div>
      <ModalComponent
        setShowModal={setShowModal}
        showModal={showModal}
        textBtn={'Crear Paquete'}
        titleModal={'Crear Paquete'}
      >
        <form onSubmit={handleSubmit}>
          <div className="px-3">
            <InputBox
              propInput={{ name: 'packageName', required: true, disabled: isPending }}
              labelTitle={'Nombre'}
            />

            <InputBox
              propInput={{ name: 'packagePrice', required: true, disabled: isPending }}
              labelTitle={'Precio'}
            />

            <InputBox
              propInput={{ name: 'packageQuantity', required: true, disabled: isPending }}
              labelTitle={'Cantidad de Clases'}
            />
            <InputBox
              propInput={{ name: 'packageDuration', required: true, disabled: isPending }}
              labelTitle={'Duración de Dias'}
            />
          </div>
          <button className="btn w-full" disabled={isPending}>
            Registrar
          </button>
        </form>
      </ModalComponent>
    </div>
  );
};

export default Header;
