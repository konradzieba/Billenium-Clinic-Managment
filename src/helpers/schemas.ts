import dayjs from 'dayjs';
import { validatePolish } from 'validate-polish';
import { z } from 'zod';

const phoneRegex = new RegExp(/^\d{9}$/);

export const signInSchema = z.object({
  email: z.string().email('Podany adres email jest nieprawidłowy'),
  password: z
    .string()
    .min(8, 'Hasło nie może być krótsze niż 8 znaków')
    .max(100, 'Hasło nie może mieć więcej niz 100 znaków'),
});

export const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(3, 'Imię musi zawierać minimum 3 znaki')
      .max(20, 'Imię może zawierać maksymalnie 20 znaków')
      .nonempty('Imię jest wymagane'),
    lastName: z
      .string()
      .min(3, 'Nazwisko musi zawierać minimum 3 znaki')
      .max(20, 'Nazwisko może zawierać maksymalnie 20 znaków')
      .nonempty('Nazwisko jest wymagane'),
    email: z
      .string()
      .email('Niepoprawny adres email')
      .nonempty('Adres email jest wymagany'),
    phoneNumber: z
      .string()
      .nonempty('Numer telefonu jest wymagany')
      .regex(phoneRegex, 'Niepoprawny numer telefonu'),
    pesel: z.string().refine((value) => validatePolish.pesel(value), {
      message: 'Niepoprawny numer PESEL',
    }),
    birthDate: z.date().refine((value) => dayjs(value).isValid(), {
      message: 'Niepoprawna data urodzenia',
    }),
    password: z
      .string()
      .min(8, 'Hasło musi zawierać minimum 8 znaków')
      .nonempty('Hasło jest wymagane'),
    confirmPassword: z
      .string()
      .min(8, 'Hasło musi zawierać minimum 8 znaków')
      .nonempty('Hasło jest wymagane'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Hasła muszą być takie same',
    path: ['confirmPassword'],
  });
