/**
 * Форматирует шаблоны типа "Hello {0}, {1}!" подставляя значения вместо `{n}`
 * @param template шаблон
 * @param values значения для подстановки
 * @returns форматированная строка
 */
export const format = (template: string, ...values: string[]) =>
  template.replace(/({\d+})/g, (match: string) => {
    const idx = parseInt(match.slice(1, -1), 10);
    if (typeof idx !== 'number') {
      throw new Error(`cant parse number from ${match}`);
    }

    const value = values[idx];
    if (value === undefined) {
      throw new Error(`missing value for index ${String(idx)}`);
    }
    return value;
  });
