import moment from 'moment/moment';
import 'moment/locale/es';
import { diasSemana } from './data';

export function completarSemana(array = [], fecha = null) {
  // Si el array está vacío o no se proporcionó una fecha, no se puede completar la semana
  if (array.length === 0 || !fecha) {
    if (!fecha) return;
    // Obtener el inicio de la semana para la fecha proporcionada
    const inicioSemana = moment(fecha, 'YYYY/MM/DD').startOf('isoWeek');

    // Crear un arreglo para almacenar los días de la semana
    const diasSemana = [];

    // Agregar cada día de la semana al arreglo
    for (let i = 0; i < 7; i++) {
      const fechaDia = inicioSemana.clone().add(i, 'days');
      diasSemana.push({
        nombre: fechaDia.format('dddd').toLowerCase(),
        fecha: fechaDia.format('YYYY/MM/DD'),
        clases: [],
      });
    }

    return diasSemana;
  }

  const fechaInicio = moment(fecha).startOf('isoWeek');

  // Si el array de objeto trae días, simplemente rellenamos los días faltantes, con su fecha y nombre
  if (
    array.every((objeto) => diasSemana.includes(objeto.nombre.toLowerCase()))
  ) {
    const resultado = diasSemana.map((nombreDia, index) => {
      const fechaDia = fechaInicio.clone().add(index, 'days');
      const objetoExistente = array.find(
        (objeto) => objeto.nombre.toLowerCase() === nombreDia
      );
      if (objetoExistente) {
        return objetoExistente;
      } else {
        return {
          nombre: nombreDia,
          fecha: fechaDia.format('YYYY/MM/DD'),
          clases: [],
        };
      }
    });
    return resultado;
  }

  // Si no trae días, tomamos la fecha y generamos la semana completa del lunes a domingo de esa fecha
  const diaInicio = moment(fecha).format('dddd').toLowerCase();
  const diaLunes = diasSemana[(diasSemana.indexOf(diaInicio) + 1) % 7];
  let fechaActual = fechaInicio.clone();

  // Generamos los días de la semana con la fecha correspondiente a cada día
  const diasRestantes = [];
  diasSemana.forEach((nombreDia, index) => {
    const fechaDia = fechaInicio.clone().add(index, 'days');
    const objetoExistente = array.find(
      (objeto) => objeto.nombre.toLowerCase() === nombreDia
    );
    if (objetoExistente) {
      diasRestantes.push(objetoExistente);
    } else {
      diasRestantes.push({
        nombre: nombreDia,
        fecha: fechaDia.format('YYYY/MM/DD'),
        clases: [],
      });
    }
  });

  return diasRestantes;
}

export function compararFechaHora(fechaHora) {
  // Obtener la fecha y hora actual
  const fechaActual = moment();

  // Obtener la fecha y hora proporcionadas
  const fechaHoraProporcionada = moment(fechaHora, 'YYYY/MM/DD HH:mm');

  // Comparar la fecha y hora actual con la proporcionada
  if (fechaActual.isAfter(fechaHoraProporcionada)) {
    return false;
  } else {
    return true;
  }
}