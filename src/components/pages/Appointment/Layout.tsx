import { Button, Container, Flex, Text } from '@mantine/core';
import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import AppointmentStepper from '../../UI/AppointmentStepper';
import ConfirmModal from '../../UI/ConfirmModal';

const Layout = () => {
  const [active, setActive] = useState(1);
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const doctorId = state.doctorId;
  const doctorSpecialization = pathname.split('/')[2];
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAccept = () => {
    console.log('accept');
    setIsModalOpen(false);
    navigate(`/visits`);
  };
  return (
    <Container w="auto">
      <Flex
        direction="column"
        justify="space-between"
        align="center"
        mih="100%"
      >
        <Text>{doctorId}</Text>
        <Outlet />
        <Flex gap="md">
          <Button
            variant="outline"
            onClick={() => {
              prevStep();
              {
                active === 1
                  ? navigate(`/specializations/${doctorSpecialization}`)
                  : navigate(`calendar/${doctorId}`, {
                      state: { doctorId: doctorId },
                    });
              }
            }}
          >
            Powrót
          </Button>
          <Button
            onClick={() => {
              {
                active === 1 && nextStep();
                navigate(`symptoms-meds/${doctorId}`, {
                  state: { doctorId: doctorId },
                });
              }
              {
                active === 2 && setIsModalOpen(true);
              }
            }}
          >
            {active === 2 ? 'Umów wizytę' : 'Dalej'}
          </Button>
        </Flex>
        <AppointmentStepper activeStep={active} />
      </Flex>
      {isModalOpen && (
        <ConfirmModal
          title="Czy na pewno chcesz umówić wizytę?"
          acceptText="Umów"
          setOpen={setIsModalOpen}
          opened={isModalOpen}
          onAccept={handleAccept}
        />
      )}
    </Container>
  );
};

export default Layout;
