/* eslint-disable react/prop-types */
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { compararFechaHora, completarSemana } from '../../utils/utilitiesFn';
import moment from 'moment';
import logo from '../../images/cycle-logo4.png';

import { IoChevronBackOutline } from 'react-icons/io5';

const Calendar = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const filterDate = searchParams.get('filterDate');

  const classSchedule = useQuery({
    queryKey: ['classesSchedule', filterDate],
    queryFn: async () =>
      await axios(`${import.meta.env.VITE_BASE_URL}/class-schedule/`, {
        params: {
          filterDate,
        },
      }).then((res) => res.data),
    enabled: !!filterDate,
  });

  useEffect(() => {
    if (!filterDate) {
      // Obtener la fecha actual
      const fechaActual = new Date();

      // Obtener los componentes de la fecha actual
      const año = fechaActual.getFullYear();
      const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Se agrega 1 al mes porque los meses van de 0 a 11
      const dia = fechaActual.getDate().toString().padStart(2, '0');

      // Formatear la fecha actual en formato yyyy/mm/dd
      const formatoFecha = `${año}/${mes}/${dia}`;

      // Mostrar la fecha actual en formato yyyy/mm/dd
      console.log(formatoFecha);
      navigate(`/calendario/?filterDate=${formatoFecha}`);
    }

    // Mostrar la nueva fecha en formato yyyy/mm/dd
  }, [filterDate]);

  if (classSchedule.isError) return <p>Ocurrio Algo</p>;

  if (classSchedule.isLoading)
    return (
      <div className="container-page my-10">
        <header className="mb-5">
          <img src={logo} className="max-w-xs mx-auto" />

          <div className="text-3xl mx-auto w-fit">
            <button disabled>
              <IoChevronBackOutline />
            </button>

            {/* {obtenerMesesEnSemana(dataSorted)} */}

            <button className="rotate-180" disabled>
              <IoChevronBackOutline />
            </button>
          </div>
        </header>

        <div className="animate-pulse bg-primary-dark h-[25rem] gap-5 min-w-[50rem]"></div>
      </div>
    );

  console.log(classSchedule.data);

  // if (classSchedule.isLoading) return <p>Cargando</p>;

  const dataSorted = completarSemana(classSchedule?.data, filterDate);

  console.log(dataSorted);

  const filteringDate = (onFilter) => {
    let fechaNueva;

    if (onFilter === 'prev') {
      fechaNueva = moment(dataSorted[0].fecha)
        .subtract(1, 'd')
        .format('YYYY/MM/DD');
    }

    if (onFilter === 'next') {
      fechaNueva = moment(dataSorted[dataSorted.length - 1]?.fecha)
        .add(1, 'd')
        .format('YYYY/MM/DD');
    }

    console.log(fechaNueva);
    navigate(`/calendario/?filterDate=${fechaNueva}`);
  };

  return (
    <div className="container-page my-10">
      <header className="mb-5">
        <img src={logo} className="max-w-xs mx-auto" />

        <div className="text-3xl mx-auto w-fit">
          <button onClick={() => filteringDate('prev')}>
            <IoChevronBackOutline />
          </button>

          {/* {obtenerMesesEnSemana(dataSorted)} */}

          <button onClick={() => filteringDate('next')} className="rotate-180">
            <IoChevronBackOutline />
          </button>
        </div>
      </header>

      <div className="overflow-x-auto pb-5">
        <div className="grid grid-cols-7 gap-5 min-w-[50rem]">
          {dataSorted?.map((item) => {
            item.clases.sort(
              (a, b) =>
                +a.horaInicio.split(':')[0] - +b.horaInicio.split(':')[0]
            );
            return (
              <div key={item?.nombre}>
                <header className="text-center text-xl mb-5">
                  <span className="block capitalize">{item?.nombre}</span>
                  <span className="flex items-center justify-center bg-primary-dark text-white w-9 h-9 rounded-full mx-auto mt-2">
                    {item?.fecha.split('/')[2]}
                  </span>
                </header>
                <div className="">
                  {item.clases.map((classInfo, idx) => (
                    <ClassBox
                      date={item?.fecha}
                      classInfo={classInfo}
                      key={idx}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ClassBox = ({ classInfo, date }) => {
  const navigate = useNavigate();
  const compareDate = compararFechaHora(`${date} ${classInfo.horaInicio}`);

  const handleClick = () => {
    if (!compareDate) return;
    navigate(`/reservar/${classInfo?._id || 0}`);
  };

  return (
    <button
      onClick={handleClick}
      disabled={!compareDate}
      className="
       disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-white disabled:hover:scale-100 
      block hover:scale-105 hover:shadow-lg transition-all bg-primary-light text-primary-dark text-xl rounded-lg w-full text-center overflow-hidden pb-5 mb-5 last:mb-0"
    >
      <div className="text-end">
        <span className="bg-primary-color/15 w-fit py-1 px-2 inline-block rounded-l-3xl text-sm">
          {classInfo?.instructor?.nombre}
        </span>
      </div>

      <div className="mt-2">
        <span className="text-2xl">{classInfo.horaInicio}</span>
      </div>
    </button>
  );
};

export default Calendar;
