export const convertTime = (minutes: number) => {
  if (!minutes) return '';

  const mm = Math.floor(minutes % 60);
  const hour = Math.floor(minutes / 60);

  const minutesStr = String(mm).padStart(2, '0');
  const hourStr = String(hour).padStart(2, "0");

  return `${hourStr}:${minutesStr}`;
};
