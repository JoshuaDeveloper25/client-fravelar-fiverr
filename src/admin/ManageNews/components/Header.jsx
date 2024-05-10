import { useMutation, useQueryClient } from '@tanstack/react-query';
import ModalComponent from '../../../components/ModalComponent';
import { getError } from '../../../utils/getError';
import { toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';
import TextRich from './TextRich';
import InputBox from '../../../components/InputBox';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [richTxtValue, setRichTxtValue] = useState('');

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (dataBody) =>
      axios.post(`${import.meta.env.VITE_BASE_URL}/news/`, dataBody),

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
    data.append('newsTitle', e.target.newsTitle.value);
    data.append('newsDescription', richTxtValue);

    mutate(data);
  };

  return (
    <div>
      <ModalComponent
        setShowModal={setShowModal}
        showModal={showModal}
        textBtn={'Crear Noticia'}
        titleModal={'Crear Noticia'}
      >
        <form onSubmit={handleSubmit}>
          <div className="px-3">
            <InputBox
              propInput={{
                name: 'newsTitle',
                required: true,
                disabled: isPending,
              }}
              labelTitle={'Titulo'}
            />

            <div className='mb-10'>
              <TextRich value={richTxtValue} setValue={setRichTxtValue} />
            </div>

            <InputBox
              propInput={{
                name: 'uploadImages',
                required: true,
                accept: 'image/*',
                disabled: isPending,
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
