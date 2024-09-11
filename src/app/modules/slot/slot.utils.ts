export const formatTime = (totalMinutes: number): string => {
const hours = totalMinutes / 60;
const minutes = totalMinutes % 60;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  console.log(`${formattedHours}:${formattedMinutes}`)
  return `${formattedHours}:${formattedMinutes}`;
};
