export const formatTime = (isoTime: string): string => {
  const d = new Date(isoTime);
  return `${d.getUTCHours().toString().padStart(2, '0')}:${d.getUTCMinutes().toString().padStart(2, '0')}`;
};

export const formatDate = (isoDate: string): string =>
  new Date(isoDate).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

export const formatCurrency = (value: string | number): string =>
  Number(value).toLocaleString('id-ID');
