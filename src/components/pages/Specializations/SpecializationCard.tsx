
import {
  Card,
  Image,
  Text,
  Group,
  createStyles,
  rem, Button,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  rating: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: rem(12),
    pointerEvents: 'none',
  },

  title: {
    display: 'block',
    marginTop: theme.spacing.md,
    marginBottom: rem(5),
  },

  action: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    }),
  },

  footer: {
    marginTop: theme.spacing.md,
  },
}));

interface ArticleCardProps {
  image: string;
  link: string;
  title: string;
  description: string;
}

export function SpecializationCard({
                              className,
                              image,
                              link,
                              title,
                              description,
                              ...others
                            }: ArticleCardProps & Omit<React.ComponentPropsWithoutRef<'div'>, keyof ArticleCardProps>) {
  const { classes, cx } = useStyles();
  const linkProps = { href: link, target: '_blank', rel: 'noopener noreferrer' };
  const navigate = useNavigate();

  return (
    <Card  w={'20rem'} withBorder radius="md" className={cx(classes.card, className)} {...others}>
      <Card.Section>
        <a {...linkProps}>
          <Image src={image} height={250} />
        </a>
      </Card.Section>

      <Text className={classes.title} fw={500} component="a" {...linkProps}>
        {title}
      </Text>

      <Text fz="sm" color="dimmed" lineClamp={5}>
        {description}
      </Text>

      <Group position="apart" className={classes.footer}>
        <Button
          variant={'outline'}
          onClick={() => {
            navigate('/'+link);
          }}
        >
          Wybierz
        </Button>
      </Group>
    </Card>
  )
}