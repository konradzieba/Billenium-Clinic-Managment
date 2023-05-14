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
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { signUpSchema as schema } from '../../../helpers/schemas';

const SignUp = () => {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      pesel: '',
      birthDate: '',
      password: '',
      confirmPassword: '',
    },
    validate: zodResolver(schema),
  });
  return (
    <Container w={640} my={40}>
      <Title
        align="center"
        fw={700}
        sx={() => {
          return {
            fontSize: '2rem',
          };
        }}
      >
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
        onSubmit={form.onSubmit((values) => console.log(values))}
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
              valueFormat="DD.MM.YYYY"
              label="Data urodzenia"
              defaultLevel="decade"
              placeholder="DD.MM.YYYY"
              maxDate={new Date()}
              minDate={dayjs(new Date()).subtract(100, 'year').toDate()}
              required
              {...form.getInputProps('birthDate')}
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
          <Button fullWidth mt="xl" radius="md" type="submit" w="40%" mx="auto">
            Zarejestruj się
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default SignUp;
