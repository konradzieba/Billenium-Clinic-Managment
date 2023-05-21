import {
  Anchor,
  Box,
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { signInSchema as schema } from '../../../helpers/schemas';

const URL = 'http://localhost:8080/api/users/login';

type loginValues = {
  email: string;
  password: string;
};

type responseValues = {
  userInfoId: number;
  sessionId: string;
  email: string;
  firstName: string;
  lastName: string;
  pesel: string;
  role: string;
  patientId: number;
  doctorId: number;
};

const SignIn = () => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodResolver(schema),
  });

  const login = async (value: loginValues) => {
    const response = await axios.post(URL, value);
    return response.data as responseValues;
  };
  const mutation = useMutation(login, {
    onSuccess: (data) => {
      form.reset();
      sessionStorage.setItem('sessionId', data.sessionId);
      sessionStorage.setItem('userId', data.userInfoId.toString());
      sessionStorage.setItem('role', data.role);
      if(data.patientId){
        sessionStorage.setItem('patientId', data.patientId.toString())
      }
      if(data.doctorId){
        sessionStorage.setItem('doctorId', data.doctorId.toString())
      }
      navigate('/');
    },
    onError: () => {
      form.setFieldError('email', 'Email bądź hasło nie są poprawne. Spróbuj ponownie.');
    },
  });

  const handleSubmit = (values: loginValues, e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(values);
  };

  return (
    <Container w={420} my={40}>
      <Title align="center" fw={700} lts={1}>
        Logowanie
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Nie posiadasz konta?{' '}
        <Anchor
          size="sm"
          component="button"
          onClick={() => navigate('/sign-up')}
        >
          Utwórz konto
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
          style={{ border: `2px solid #fd7e14` }}
        >
          <TextInput
            label="Email:"
            placeholder="Wpisz email"
            required
            withAsterisk={false}
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Hasło:"
            placeholder="Wpisz hasło"
            mt="md"
            required
            withAsterisk={false}
            {...form.getInputProps('password')}
          />
          <Group position="apart" mt="lg">
            <Anchor
              component="button"
              size="sm"
              onClick={() => navigate('/forgot-password')}
            >
              Zapomniałeś hasła?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" radius="md" type="submit">
            Zaloguj się
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default SignIn;
