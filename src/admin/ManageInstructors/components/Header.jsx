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
        `${import.meta.env.VITE_BASE_URL}/instructors/`,
        instructorInfo
      ),

    onSuccess: () => {
      queryClient.invalidateQueries(['instructors']);
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

    const data = new FormData();

    console.log(e.target.uploadImages.files[0]);
    data.append('uploadImages', e.target.uploadImages.files[0]);
    data.append('instructorName', e.target.instructorName.value);
    data.append('description', e.target.instructorDesc.value);

    mutate(data);
  };

  return (
    <div>
      <ModalComponent
        setShowModal={setShowModal}
        showModal={showModal}
        textBtn={'Crear Instructor'}
        titleModal={'Crear Instructor'}
      >
        <form onSubmit={handleSubmit}>
          <div className="px-3">
            <InputBox
              propInput={{
                name: 'instructorName',
                required: true,
                disabled: isPending,
              }}
              labelTitle={'Nombre'}
            />

            <InputBox
              propInput={{
                name: 'instructorDesc',
                required: true,
                disabled: isPending,
              }}
              labelTitle={'Descripción'}
            />

            <InputBox
              propInput={{
                name: 'uploadImages',
                required: true,
                accept: 'image/*',
              }}
              labelTitle={'Subir imagen'}
              type="file"
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
