/**
 * Возвращает текстовку в соответствии с количеством элементов
 * @param count количество элементов
 * @param forms текстовки для 1, 3 и 5 элементов
 *
 * @example plural(1, ['элемент', 'элемента', 'элементов'])
 */
export const plural = (count: number, forms: string[]) => {
  if (count % 10 === 1 && count % 100 !== 11) {
    return forms[0];
  }

  if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
    return forms[1];
  }

  return forms[2];
};
