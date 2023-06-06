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
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppointmentStatus } from '../../../helpers/enums';
import {
  AppointmentDeclineError,
  AppointmentResponseType,
} from '../../../helpers/types';
import ConfirmModal from '../../UI/ConfirmModal';
import { FlexibleAccordion } from '../../UI/FlexibleAccordion';

const CHANGE_APPOINTMENT_STATUS = 'http://localhost:8080/api/appointments';

export const VisitsList = () => {
  const NEW_APPOINTMENT_URL = `http://localhost:8080/api/patients/${sessionStorage.getItem(
    'patientId'
  )}/appointments?limit=30`;

  const userInfoId = sessionStorage.getItem('userId') || '';
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    number | null
  >(null);
  const fetchNewAppointments = async () => {
    const response = await axios.get(NEW_APPOINTMENT_URL);
    return response.data as AppointmentResponseType[];
  };

  const { data, isLoading, refetch } = useQuery(
    [`appointments-${sessionStorage.getItem('patientId')}`],
    fetchNewAppointments,
    { refetchOnMount: 'always' }
  );
  const navigate = useNavigate();

  const patchAppointmentStatus = async (requestBody: {
    appointmentId: number | null;
    userInfoId: string;
    status: string;
  }) => {
    const response = await axios.patch(CHANGE_APPOINTMENT_STATUS, {
      appointmentId: requestBody.appointmentId,
      userInfoId: userInfoId,
      newStatus: requestBody.status,
    });
    return response.data as AppointmentResponseType;
  };

  const mutation = useMutation(patchAppointmentStatus, {
    onSuccess: () => {
      refetch();
    },
    onError: (error: AxiosError<AppointmentDeclineError>) => {
      const { response } = error;
      if (response?.status === 422) {
        setIsErrorModalOpen(true);
      }
    },
  });

  const handleCancelAppointment = (appointmentId: number | null) => {
    mutation.mutate({
      appointmentId: appointmentId,
      userInfoId: userInfoId,
      status: 'canceled',
    });
  };
  const handleOpenModal = () => {
    setIsCancelModalOpen(true);
  };

  return (
    <>
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
                <Text>Nie masz jeszcze żadnych wizyt</Text>
                <Button
                  variant="outline"
                  onClick={() => navigate('/specializations')}
                >
                  Umów wizytę
                </Button>
              </Flex>
            ) : (
              <Tabs w="90%" defaultValue={AppointmentStatus.NEW}>
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
                  <Tabs.Tab fz="md" value={AppointmentStatus.CONTROL}>
                    Kontrolne
                  </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel mt="xl" value={AppointmentStatus.APPROVED}>
                  <ScrollArea h={550}>
                    <Center>
                      {data?.filter(
                        (appointment) =>
                          appointment.appointmentStatus ===
                          AppointmentStatus.APPROVED
                      ).length === 0 ? (
                        <Text>Brak zatwierdzonych wizyt</Text>
                      ) : (
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
                          withEditButton
                          editButtonText="Anuluj wizytę"
                          onEdit={handleOpenModal}
                          setApprovalAppointmentId={setSelectedAppointmentId}
                        />
                      )}
                    </Center>
                  </ScrollArea>
                </Tabs.Panel>
                <Tabs.Panel mt="xl" value={AppointmentStatus.NEW}>
                  <ScrollArea h={550}>
                    <Center>
                      {data?.filter(
                        (appointment) =>
                          appointment.appointmentStatus ===
                          AppointmentStatus.NEW
                      ).length === 0 ? (
                        <Text>Brak oczekujących wizyt</Text>
                      ) : (
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
                          withEditButton
                          editButtonText="Anuluj wizytę"
                          onEdit={handleOpenModal}
                          setApprovalAppointmentId={setSelectedAppointmentId}
                        />
                      )}
                    </Center>
                  </ScrollArea>
                </Tabs.Panel>
                <Tabs.Panel mt="xl" value={AppointmentStatus.CANCELED}>
                  <ScrollArea h={550}>
                    <Center>
                      {data?.filter(
                        (appointment) =>
                          appointment.appointmentStatus ===
                          AppointmentStatus.CANCELED
                      ).length === 0 ? (
                        <Text>Brak anulowanych wizyt</Text>
                      ) : (
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
                      )}
                    </Center>
                  </ScrollArea>
                </Tabs.Panel>
                <Tabs.Panel mt="xl" value={AppointmentStatus.CONTROL}>
                  <ScrollArea h={550}>
                    <Center>
                      {data?.filter(
                        (appointment) =>
                          appointment.appointmentStatus ===
                          AppointmentStatus.CONTROL
                      ).length === 0 ? (
                        <Text>Brak wizyt kontrolnych</Text>
                      ) : (
                        <FlexibleAccordion
                          isWithStatus
                          dataList={
                            data?.filter(
                              (appointment) =>
                                appointment.appointmentStatus ===
                                AppointmentStatus.CONTROL
                            ) || []
                          }
                          firstTableTitle="Leki:"
                          secondTableTitle="Objawy:"
                          withEditButton
                          editButtonText="Anuluj wizytę"
                          onEdit={handleOpenModal}
                          setApprovalAppointmentId={setSelectedAppointmentId}
                        />
                      )}
                    </Center>
                  </ScrollArea>
                </Tabs.Panel>
              </Tabs>
            )}
          </Flex>
        </Flex>
      </Container>
      {isErrorModalOpen && (
        <ConfirmModal
          title="Nie można anulować wizyty 24h przed jej rozpoczęciem"
          opened={isErrorModalOpen}
          setOpen={setIsErrorModalOpen}
          isErrorModal
        />
      )}
      {isCancelModalOpen && (
        <ConfirmModal
          title="Czy na pewno chcesz anulować wizytę?"
          opened={isCancelModalOpen}
          setOpen={setIsCancelModalOpen}
          onApproveAppointment={handleCancelAppointment}
          appointmentId={selectedAppointmentId}
        />
      )}
    </>
  );
};
