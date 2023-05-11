import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  rem,
  Image,
} from '@mantine/core';
import {
  IconHome2,
  IconUser,
  IconLogout,
  TablerIconsProps,
  IconNurse,
  IconBook,
  IconNotes,
} from '@tabler/icons-react';

import StudentMed from '../../assets/StudentMed.svg';

const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },
}));

interface NavbarLinkProps {
  icon: React.FC<TablerIconsProps>;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 200 }}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon size="1.4rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: 'Strona główna', link: '/' },
  { icon: IconNurse, label: 'Specjaliści', link: '/specializations' },
  { icon: IconBook, label: 'Wizyty', link: '/visits' },
  { icon: IconNotes, label: 'Historia wizyt', link: '/history' },
];

export function SideMenu() {
  const { pathname } = useLocation();
  console.log(pathname);
  const [active, setActive] = useState(pathname);
  const navigate = useNavigate();

  const links = mockdata.map((link) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={link.link === active}
      onClick={() => {
        navigate(link.link);
        setActive(link.link);
      }}
    />
  ));

  return (
    <Navbar height="100%" width={{ base: 80 }} p="md">
      <Center>
        <UnstyledButton style={{ cursor: 'pointer' }}>
          <Image
            maw={40}
            mx="auto"
            src={StudentMed}
            alt="StudentMed Logo"
            onClick={() => {
              navigate('/');
              setActive('/');
            }}
          />
        </UnstyledButton>
      </Center>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink
            icon={IconUser}
            label="Profil pacjenta"
            onClick={() => {
              navigate('/profile');
              setActive('/profile');
            }}
            active={active === '/profile'}
          />
          <NavbarLink icon={IconLogout} label="Wyloguj się" />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
