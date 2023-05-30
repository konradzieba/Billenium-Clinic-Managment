import { Avatar, Button, Flex, Text } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useLocation, useNavigate } from 'react-router-dom';

import { clearAppointmentData } from '../../../helpers/functions';
type DoctorProps = {
  avatar: string;
  name: string;
  lastname: string;
  description: string;
  doctorId: number;
};

const Doctor = (props: DoctorProps) => {
  const { width } = useViewportSize();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleCheckAppointment = () => {
    clearAppointmentData();
    navigate(`${pathname}/appointment/calendar/${props.doctorId}`, {
      state: { doctorId: props.doctorId },
    });
  };
  return (
    <Flex
      miw={width < 1080 ? '100%' : '40rem'}
      maw="80rem"
      justify="center"
      align="start"
      mt="4rem"
      p="md"
      sx={(theme) => {
        return {
          // backgroundColor: props.index % 2 == 1 ? theme.colors.gray[1] : 'none',
          borderRadius: theme.radius.md,
        };
      }}
      direction={width < 1080 ? 'column' : 'row'}
    >
      <Flex w="100%">
        <Flex justify="center">
          <Avatar
            radius="md"
            size="8rem"
            miw="8rem"
            mih="8rem"
            src={props.avatar}
            mx={'md'}
          />
        </Flex>
        <Flex miw="70%" direction={'column'} align={'start'}>
          <Text fw="bold" align="start">
            {props.name + ' ' + props.lastname}
          </Text>
          <Flex>
            <Text mt={'xs'} align={width < 1080 ? 'justify' : 'start'}>
              {props.description}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        h={'100%'}
        w={'100%'}
        align={'center'}
        justify={width < 1080 ? 'start' : 'end'}
      >
        {sessionStorage.getItem('sessionId') &&
        sessionStorage.getItem('userId') ? (
          <Button
            mt={width < 1080 ? 'md' : 'none'}
            variant="outline"
            ml={'md'}
            size={'md'}
            onClick={handleCheckAppointment}
          >
            Sprawdź terminy
          </Button>
        ) : (
          <Button
            mt={width < 1080 ? 'md' : 'none'}
            variant="outline"
            ml={'md'}
            size={'md'}
            onClick={() => navigate('/sign-in')}
          >
            Zaloguj się by sprawdzić terminy
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
export default Doctor;
