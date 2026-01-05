/**
 * Convierte una fecha a formato YYYY-MM
 */
export const toMonthKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

/**
 * Convierte una fecha a formato YYYY-MM-DD
 */
export const toDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Parsea una fecha en formato YYYY-MM-DD a Date
 */
export const parseDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

/**
 * Obtiene el primer día del mes actual
 */
export const getFirstDayOfMonth = (date: Date = new Date()): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

/**
 * Obtiene el último día del mes actual
 */
export const getLastDayOfMonth = (date: Date = new Date()): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

/**
 * Compara dos fechas (solo la parte de fecha, ignorando hora)
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return toDateString(date1) === toDateString(date2);
};

/**
 * Verifica si una fecha está dentro del mes especificado
 */
export const isInMonth = (date: Date, monthKey: string): boolean => {
  return toMonthKey(date) === monthKey;
};

/**
 * Obtiene el nombre del mes en español
 */
export const getMonthName = (monthKey: string): string => {
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  const month = parseInt(monthKey.split('-')[1]);
  return months[month - 1];
};

/**
 * Obtiene todas las fechas en un mes (para gráficos)
 */
export const getDaysInMonth = (monthKey: string): string[] => {
  const [year, month] = monthKey.split('-').map(Number);
  const date = new Date(year, month - 1, 1);
  const days: string[] = [];

  while (date.getMonth() === month - 1) {
    days.push(toDateString(date));
    date.setDate(date.getDate() + 1);
  }

  return days;
};
