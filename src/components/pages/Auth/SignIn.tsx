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
import { useNavigate } from 'react-router-dom';

import { signInSchema as schema } from '../../../helpers/schemas';

const SignIn = () => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodResolver(schema),
  });

  return (
    <Container w={420} my={40}>
      <Title align="center" fw={700}>
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
        onSubmit={form.onSubmit((values) => console.log(values))}
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
