export const generateCaseName = (firstName: string, lastName: string) => {
  const date = new Date();
  return `C-${firstName.substring(0, 2).toUpperCase()}-${lastName
    .substring(0, 2)
    .toUpperCase()}-${date.getDate() + 1}-${date.getMonth() + 1}-${date
    .getFullYear()
    .toString()
    .substring(2, 4)}`;
};
