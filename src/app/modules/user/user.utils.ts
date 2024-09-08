export const capitalize = (value: string) => {
  if (!value) return '';
  return value.replace(/\b\w/g, (char) => char.toUpperCase());
};
