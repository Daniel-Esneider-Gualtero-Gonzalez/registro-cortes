/**
 * Formatea una fecha en el formato `YYYY-MM-DDTHH:MM`.
 * 
 * @param {string|Date} date - La fecha a formatear. Puede ser una cadena de texto en formato ISO 8601 o un objeto `Date`. Si no se proporciona, se usará la fecha y hora actuales.
 * @param {boolean} [converUtc5=false] - Si es `true`, ajusta la fecha a la zona horaria de Colombia (UTC-5). Por defecto es `false`.
 * @returns {string} La fecha formateada en el formato `YYYY-MM-DDTHH:MM`.
 * 
 * @example
 * // Ejemplo 1: Usar la fecha actual sin conversión a UTC-5
 * const fechaActual = formatDate();
 * console.log(fechaActual); // "2023-10-05T14:30"
 * 
 * @example
 * // Ejemplo 2: Formatear una fecha específica y convertirla a UTC-5
 * const fechaFormateada = formatDate("2025-02-26T20:42:06.651532", true);
 * console.log(fechaFormateada); // "2025-02-26T15:42"
 */
export const formatDate = (date, converUtc5 = false) => {
  // 1. Crear un objeto Date a partir de la fecha proporcionada o usar la fecha actual
  const fecha = date ? new Date(date) : new Date();

  // 2. Ajustar a la zona horaria de Colombia (UTC-5) si se solicita
  //  if(converUtc5) fecha.setHours(fecha.getHours() - 5)

  // 3. Formatear la fecha en el formato YYYY-MM-DDTHH:MM
  const año = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
  const dia = String(fecha.getDate()).padStart(2, '0');
  const horas = String(fecha.getHours()).padStart(2, '0');
  const minutos = String(fecha.getMinutes()).padStart(2, '0');
  const segundos = String(fecha.getUTCSeconds()).padStart(2, '0');

  // if(converUtc5) return `${año}-${mes}-${dia}T${horas}:${minutos}`
  return `${año}-${mes}-${dia}T${horas}:${minutos}:${segundos}`;
};
  
