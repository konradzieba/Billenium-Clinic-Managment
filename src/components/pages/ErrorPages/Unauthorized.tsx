import {
  Button,
  Container,
  createStyles,
  Group,
  rem,
  Text,
  Title,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(220),
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(120),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(38),

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(500),
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}));

const Unauthorized = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  return (
    <Container className={classes.root}>
      <div className={classes.label}>401</div>
      <Title className={classes.title}>Brak autoryzacji</Title>
      <Text
        color="dimmed"
        size="lg"
        align="center"
        className={classes.description}
      >
        Niestety ta strona jest dostępna tylko dla zalogowanych użytkowników.
      </Text>
      <Group position="center">
        <Button
          variant="outline"
          color="#fd7e14"
          onClick={() => navigate('/')}
          size="md"
        >
          Powrót do strony głównej
        </Button>
      </Group>
    </Container>
  );
};

export default Unauthorized;
