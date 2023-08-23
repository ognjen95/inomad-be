export const generateCaseName = (lastName: string) => {
  const date = new Date();
  return `C-${lastName.toUpperCase()}-${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear().toString().substring(2, 4)}`;
};
