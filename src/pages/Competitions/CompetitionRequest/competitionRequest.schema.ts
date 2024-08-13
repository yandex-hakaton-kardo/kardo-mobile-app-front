import * as z from 'zod';
import { isValidDate, isValidPhone } from './utils';

export const competitionRequestSchema1 = z
  .object({
    role: z.string(),
    type: z.string(),
    direction: z.string(),
    country: z.string(),
    region: z.string().optional(),
    city: z
      .string()
      .min(2, 'Минимум 2 символа')
      .max(20, 'Максимум 20 символов')
      .regex(/^[а-яА-ЯёЁa-zA-Z -]+$/, 'Использованы недопустимые символы'),
  })
  .refine(
    data => {
      if (data.country === '1') {
        return data.region !== undefined && data.region !== '';
      }
      return true;
    },
    {
      message: 'Поле region обязательно для заполнения, для России',
      path: ['region'],
    },
  );

export const competitionRequestSchema2 = z.object({
  secondName: z.string().min(2, 'Минимум 2 символа').max(30, 'Максимум 30 символов'),
  firstName: z.string().min(2, 'Минимум 2 символа').max(30, 'Максимум 30 символов'),
  thirdName: z.string().max(20, 'Максимум 20 символов').optional(),
  email: z.string().email('Некорректный email').min(5, 'Минимум 5 символов').max(50, 'Максимум 50 символов'),
  phone: z.string().min(12, 'Минимум 12 символов').max(15, 'Максимум 15 символов').refine(isValidPhone, {
    message: 'Некорректный телефонный номер',
  }),
  birthDate: z.string().refine(isValidDate, {
    message: 'Дата должна быть в формате DD.MM.YYYY',
  }),
  gender: z.string(),
});

export const competitionRequestSchema3 = z.object({
  file: z.string().max(150, 'Максимум 150 символов').url('Введенное значение не является ссылкой'),
  socialLink: z
    .string()
    .max(150, 'Максимум 150 символов')
    .refine(value => value === '' || /^(http|https):\/\/[^ "]+$/.test(value), 'Введенное значение не является ссылкой'),
  about: z.string().max(500, 'Максимум 500 символов'),
});
