import { Button, Container, Flex } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import {
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
} from 'react-router-dom';

import { clearAppointmentData } from '../../../helpers/functions';
import AppointmentStepper from '../../UI/AppointmentStepper';
import ConfirmModal from '../../UI/ConfirmModal';
type ContexType = {
  doctorId: string;
};

const URL = 'http://localhost:8080/api/appointments';

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
  const patientId = sessionStorage.getItem('patientId');
  const patientAppointmentDate = sessionStorage.getItem(
    `appointmentDate${patientId}`
  );
  const patientAppointmentTime = sessionStorage.getItem(
    `appointmentTime${patientId}`
  );
  const patientSymptoms = sessionStorage.getItem(`symptoms${patientId}`);
  const patientMedicines = sessionStorage.getItem(`meds${patientId}`);

  const postPatientAppointment = async (url: string) => {
    const response = await axios.post(url, {
      patientId: patientId,
      doctorId: doctorId,
      appointmentDate: `${patientAppointmentDate}T${patientAppointmentTime}`,
      patientSymptoms: patientSymptoms,
      medicinesTaken: patientMedicines,
    });
    return response.data;
  };

  const mutation = useMutation(postPatientAppointment, {
    onSuccess: () => {
      clearAppointmentData();
      navigate(`/visits`);
    },
  });

  const handleAccept = () => {
    mutation.mutate(URL);
    setIsModalOpen(false);
  };
  return (
    <Container w="auto">
      <Flex
        direction="column"
        justify="space-between"
        align="center"
        mih="100%"
        pt={120}
      >
        <Outlet context={{ doctorId }} />
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

export function useDoctorId() {
  return useOutletContext<ContexType>();
}
