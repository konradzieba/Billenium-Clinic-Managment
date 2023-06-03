import {
  Center,
  createStyles,
  Image,
  Navbar,
  rem,
  Stack,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import {
  IconLogin,
  IconLogout,
  IconUser,
  TablerIconsProps,
} from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';

import StudentMed from '../../assets/StudentMed.svg';
import {
  DoctorMenuLinks,
  NoLoginMenuLinks,
  PatientMenuLinks,
  ReceptionistMenuLinks,
} from '../../helpers/sideMenuLinks';

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

export function SideMenu() {
  const { pathname } = useLocation();
  const session = {
    sessionId: sessionStorage.getItem('sessionId') || null,
    userId: sessionStorage.getItem('userId') || null,
    role: sessionStorage.getItem('role') || null,
    doctorId: sessionStorage.getItem('doctorId') || null,
  };
  const navigate = useNavigate();
  const mockdata =
    session.role === 'doctor'
      ? DoctorMenuLinks
      : session.role === 'receptionist'
      ? ReceptionistMenuLinks
      : session.role === 'patient'
      ? PatientMenuLinks
      : NoLoginMenuLinks;
  const links = mockdata.map((link) =>
    link.link === '/doctor-profile/' ? (
      <NavbarLink
        {...link}
        key={link.label}
        active={link.link === `/${pathname.split('/')[1]}/`}
        onClick={() => {
          navigate(`${link.link}${session.doctorId}`);
        }}
      />
    ) : link.link === '/specializations' ? (
      <NavbarLink
        {...link}
        key={link.label}
        active={link.link === `/${pathname.split('/')[1]}`}
        onClick={() => {
          navigate(link.link);
        }}
      />
    ) : (
      <NavbarLink
        {...link}
        key={link.label}
        active={link.link === pathname}
        onClick={() => {
          navigate(link.link);
        }}
      />
    )
  );

  return (
    <Navbar
      height="100%"
      width={{ base: 80 }}
      p="md"
      mih="100vh"
      style={{ position: 'sticky', top: 0 }}
    >
      <Center>
        <UnstyledButton style={{ cursor: 'pointer' }}>
          <Image
            maw={40}
            mx="auto"
            src={StudentMed}
            alt="StudentMed Logo"
            onClick={() => {
              navigate('/');
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
          {session.role === 'patient' && (
            <NavbarLink
              icon={IconUser}
              label="Profil pacjenta"
              onClick={() => {
                navigate('/profile');
              }}
              active={pathname === '/profile'}
            />
          )}
          {session.sessionId && session.userId ? (
            <NavbarLink
              icon={IconLogout}
              onClick={() => {
                sessionStorage.clear();
                navigate('/');
              }}
              label="Wyloguj się"
            />
          ) : (
            <NavbarLink
              icon={IconLogin}
              onClick={() => {
                navigate('/sign-in');
              }}
              label="Zaloguj się"
              active={pathname === '/sign-in'}
            />
          )}
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
