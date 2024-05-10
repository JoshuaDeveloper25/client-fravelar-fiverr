import { useMutation, useQueryClient } from '@tanstack/react-query';
import ModalComponent from '../../../components/ModalComponent';
import { getError } from '../../../utils/getError';
import { toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';
import InputBox from '../../../components/InputBox';
import { diasSemana } from '../../../utils/data';
import Select from '../../../components/Select';

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (instructorInfo) =>
      axios.post(
        `${import.meta.env.VITE_BASE_URL}/class-schedule/`,
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

    const data = new FormData(e.target);

    const formatDate = () => {
      const [year, month, day] = data.get('date').split('-');

      return `${year}/${month}/${day}`;
    };

    function obtenerNombreDia(fecha) {
      return diasSemana[new Date(fecha).getDay()];
    }

    const dataSend = {
      startTime: data.get('startTime'),
      date: formatDate(),
      dayWeek: obtenerNombreDia(data.get('date')),
      instructorInfo: data.get('instructorInfo'),
    };

    console.log(dataSend);

    // return;

    mutate(dataSend);
  };

  return (
    <div>
      <ModalComponent
        setShowModal={setShowModal}
        showModal={showModal}
        textBtn={'Crear Clase'}
        titleModal={'Crear Clase'}
      >
        <form onSubmit={handleSubmit}>
          <div className="px-3">
            <div className="flex gap-5">
              <div className="flex-1">
                <InputBox
                  propInput={{
                    name: 'date',
                    required: true,
                    type: 'date',
                    disabled: isPending,
                  }}
                  labelTitle={'Fecha'}
                />
              </div>

              <div className="flex-1">
                <InputBox
                  propInput={{
                    name: 'startTime',
                    required: true,
                    type: 'time',
                    disabled: isPending,
                  }}
                  labelTitle={'Hora Inicio'}
                />
              </div>
            </div>

            <Select
              labelTitle={'Escoge Instructor'}
              endpoint={'/instructors/'}
              name={'instructorInfo'}
              optionName={'instructorName'}
              defaultValue={'-- Selecciona Instructor --'}
              required
              disabled={isPending}
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
