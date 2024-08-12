export const isValidDate = (input: string) => {
  // Проверяем формат DD.MM.YYYY
  const regex = /^\d{2}\.\d{2}\.\d{4}$/;
  if (!regex.test(input)) return false;

  const [day, month, year] = input.split('.').map(Number);
  const date = new Date(year!, month! - 1, day);

  // Проверяем, что дата корректна
  return date.getFullYear() === year && date.getMonth() === month! - 1 && date.getDate() === day;
};

export const isValidPhone = (input: string) => {
  const allowedChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', ' ', '(', ')'];

  return input.split('').every(char => allowedChars.includes(char));
};
