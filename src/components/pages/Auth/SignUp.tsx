import {
  Anchor,
  Box,
  Button,
  Container,
  Flex,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { signUpSchema as schema } from '../../../helpers/schemas';
import ConfirmModal from '../../UI/ConfirmModal';
import { UserCreationErrorType } from '../../../helpers/types';

const URL = 'http://localhost:8080/api/users';

type registerValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthdate: string;
  pesel: string;
  password?: string;
  role: string;
  confirmPassword?: string;
};
type responseType = registerValues & {
  userInfoId: number;
  createdAt: string;
  modifiedAt: string;
};

const SignUp = () => {
  const [isRegisteredModalOpen, setIsRegisteredModalOpen] = useState(false);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      birthdate: '',
      pesel: '',
      password: '',
      role: 'patient',
      confirmPassword: '',
    },
    validate: zodResolver(schema),
  });

  const createUser = async (value: registerValues) => {
    const response = await axios.post(URL, value);
    return response.data as responseType;
  };

  const mutation = useMutation(createUser, {
    onSuccess: () => {
      form.reset();
      handleSubmitModal();
    },
    onError: (error: AxiosError<UserCreationErrorType[]>) => {
      if (error.response?.status === 422) {
        form.setFieldError('pesel', 'Taki użytkownik już istnieje.');
        form.setFieldError('email', 'Taki użytkownik już istnieje.');
      }
    },
  });

  const handleSubmit = (
    values: registerValues,
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const { confirmPassword, ...rest } = values;
    const date = dayjs(values.birthdate).format(`YYYY-MM-DD`);
    mutation.mutate({ ...rest, birthdate: date });
  };
  const handleSubmitModal = () => {
    setIsRegisteredModalOpen(true);
  };
  return (
    <>
      <Container w={640} my={40}>
        <Title align="center" fw={700} lts={1}>
          Rejestracja
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Posiadasz już konto?{' '}
          <Anchor
            size="sm"
            component="button"
            onClick={() => navigate('/sign-in')}
          >
            Zaloguj się
          </Anchor>
        </Text>

        <Box
          component="form"
          onSubmit={form.onSubmit((values, e) => handleSubmit(values, e))}
        >
          <Paper
            withBorder
            shadow="md"
            p={30}
            mt={30}
            radius="md"
            style={{ border: '2px solid #fd7e14' }}
          >
            <Flex gap="lg">
              <TextInput
                withAsterisk
                mt={3}
                w="50%"
                label="Imię:"
                placeholder="Wpisz imię"
                {...form.getInputProps('firstName')}
              />
              <TextInput
                withAsterisk
                w="50%"
                mt={3}
                label="Nazwisko:"
                placeholder="Wpisz nazwisko"
                {...form.getInputProps('lastName')}
              />
            </Flex>

            <Flex gap="lg">
              <TextInput
                withAsterisk
                mt={3}
                w="50%"
                label="Numer telefonu:"
                placeholder="Wpisz numer telefonu"
                icon={
                  <Text size={14} color="black">
                    +48
                  </Text>
                }
                maxLength={9}
                {...form.getInputProps('phoneNumber')}
              />
              <TextInput
                withAsterisk
                mt={3}
                w="50%"
                label="PESEL:"
                placeholder="Wpisz numer PESEL"
                {...form.getInputProps('pesel')}
                maxLength={11}
              />
            </Flex>
            <Flex gap="lg">
              <TextInput
                withAsterisk
                mt={3}
                w="70%"
                label="Email:"
                placeholder="Wpisz email"
                {...form.getInputProps('email')}
              />
              <DateInput
                mt={3}
                w="30%"
                withAsterisk
                valueFormat="YYYY-MM-DD"
                label="Data urodzenia"
                defaultLevel="decade"
                placeholder="YYYY-MM-DD"
                maxDate={new Date()}
                minDate={dayjs(new Date()).subtract(100, 'year').toDate()}
                required
                {...form.getInputProps('birthdate')}
              />
            </Flex>
            <Flex gap="lg">
              <PasswordInput
                withAsterisk
                mt={3}
                w="50%"
                label="Hasło:"
                placeholder="Wpisz hasło"
                {...form.getInputProps('password')}
              />
              <PasswordInput
                withAsterisk
                w="50%"
                mt={3}
                label="Potwierdź hasło:"
                placeholder="Wpisz hasło ponownie"
                {...form.getInputProps('confirmPassword')}
              />
            </Flex>
            <Button
              fullWidth
              mt="xl"
              radius="md"
              type="submit"
              w="40%"
              mx="auto"
            >
              Zarejestruj się
            </Button>
          </Paper>
        </Box>
      </Container>
      <ConfirmModal
        isErrorModal
        isMessage
        title="Zostałeś pomyślnie zarejestrowany"
        opened={isRegisteredModalOpen}
        setOpen={setIsRegisteredModalOpen}
        messageFunction={() => navigate('/sign-in')}
        locked
      />
    </>
  );
};

export default SignUp;
