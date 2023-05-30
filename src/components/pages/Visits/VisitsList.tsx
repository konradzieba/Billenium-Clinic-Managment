import {
  Button,
  Center,
  Container,
  Flex,
  Loader,
  ScrollArea,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { AppointmentStatus } from '../../../helpers/enums';
import { AppointmentResponseType } from '../../../helpers/types';
import { FlexibleAccordion } from '../../UI/FlexibleAccordion';

export const VisitsList = () => {
  const NEW_APPOINTMENT_URL = `http://localhost:8080/api/patients/${sessionStorage.getItem(
    'patientId'
  )}/appointments`;

  const fetchNewAppointments = async () => {
    const response = await axios.get(NEW_APPOINTMENT_URL);
    return response.data as AppointmentResponseType[];
  };

  const { data, isLoading } = useQuery(
    [`appointments-${sessionStorage.getItem('patientId')}`],
    fetchNewAppointments,
    { refetchOnMount: 'always' }
  );
  const navigate = useNavigate();
  return (
    <Container my={40} w="100%" p="md">
      <Flex
        sx={(theme) => {
          return {
            borderRadius: theme.radius.md,
            border: '3px #fd7e14 solid',
          };
        }}
        direction="column"
        pb="md"
        mih="50vh"
      >
        <Title align="center" fw={700} lts={1} mt="sm" mb="sm">
          Twoje wizyty
        </Title>
        <Flex direction="column" w="100%" align="center" pt="xl">
          {isLoading ? (
            <Loader mt="xl" />
          ) : data?.length === 0 ? (
            <Flex direction="column" gap="sm" pt="xl">
              <Text>Nie masz jeszcze żadnych zakończonych wizyt</Text>
              <Button
                variant="outline"
                onClick={() => navigate('/specializations')}
              >
                Umów wizytę
              </Button>
            </Flex>
          ) : (
            <Tabs w="90%" defaultValue={AppointmentStatus.APPROVED}>
              <Tabs.List grow>
                <Tabs.Tab fz="md" value={AppointmentStatus.APPROVED}>
                  Zatwierdzone
                </Tabs.Tab>
                <Tabs.Tab fz="md" value={AppointmentStatus.NEW}>
                  Oczekujące
                </Tabs.Tab>
                <Tabs.Tab fz="md" value={AppointmentStatus.CANCELED}>
                  Anulowane
                </Tabs.Tab>
                <Tabs.Tab fz="md" value={AppointmentStatus.RESCHEDULED}>
                  Przełożone
                </Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel mt="xl" value={AppointmentStatus.APPROVED}>
                <ScrollArea h={550}>
                  <Center>
                    <FlexibleAccordion
                      isWithStatus
                      dataList={
                        data?.filter(
                          (appointment) =>
                            appointment.appointmentStatus ===
                            AppointmentStatus.APPROVED
                        ) || []
                      }
                      firstTableTitle="Leki:"
                      secondTableTitle="Objawy:"
                    />
                  </Center>
                </ScrollArea>
              </Tabs.Panel>
              <Tabs.Panel mt="xl" value={AppointmentStatus.NEW}>
                <ScrollArea h={550}>
                  <Center>
                    <FlexibleAccordion
                      isWithStatus
                      dataList={
                        data?.filter(
                          (appointment) =>
                            appointment.appointmentStatus ===
                            AppointmentStatus.NEW
                        ) || []
                      }
                      firstTableTitle="Leki:"
                      secondTableTitle="Objawy:"
                    />
                  </Center>
                </ScrollArea>
              </Tabs.Panel>
              <Tabs.Panel mt="xl" value={AppointmentStatus.CANCELED}>
                <ScrollArea h={550}>
                  <Center>
                    <FlexibleAccordion
                      isWithStatus
                      dataList={
                        data?.filter(
                          (appointment) =>
                            appointment.appointmentStatus ===
                            AppointmentStatus.CANCELED
                        ) || []
                      }
                      firstTableTitle="Leki:"
                      secondTableTitle="Objawy:"
                    />
                  </Center>
                </ScrollArea>
              </Tabs.Panel>
              <Tabs.Panel mt="xl" value={AppointmentStatus.RESCHEDULED}>
                <ScrollArea h={550}>
                  <Center>
                    <FlexibleAccordion
                      isWithStatus
                      dataList={
                        data?.filter(
                          (appointment) =>
                            appointment.appointmentStatus ===
                            AppointmentStatus.RESCHEDULED
                        ) || []
                      }
                      firstTableTitle="Leki:"
                      secondTableTitle="Objawy:"
                    />
                  </Center>
                </ScrollArea>
              </Tabs.Panel>
            </Tabs>
          )}
        </Flex>
      </Flex>
    </Container>
  );
};
