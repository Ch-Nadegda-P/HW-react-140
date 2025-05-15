import { format, formatDistance, isPast, differenceInMilliseconds } from 'date-fns';
import { ru } from 'date-fns/locale';

export const formatDate = (date) => {
  return format(new Date(date), 'dd.MM.yyyy HH:mm', { locale: ru });
};

export const formatTimeLeft = (deadline) => {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  
  if (isPast(deadlineDate)) {
    return 'Время истекло';
  }
  
  return formatDistance(deadlineDate, now, { 
    locale: ru, 
    addSuffix: true 
  });
};

export const getTimeLeftInMs = (deadline) => {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  
  if (isPast(deadlineDate)) {
    return 0;
  }
  
  return differenceInMilliseconds(deadlineDate, now);
};
