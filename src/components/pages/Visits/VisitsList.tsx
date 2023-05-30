import { Button, Container, Flex, Loader, Text, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { AppointmentResponseType } from '../../../helpers/types';
import { FlexibleAccordion } from '../../UI/FlexibleAccordion';

export const VisitsList = () => {
  const NEW_APPOINTMENT_URL = `http://localhost:8080/api/patients/${sessionStorage.getItem(
    'patientId'
  )}/appointments?status=new`;

  const fetchNewAppointments = async () => {
    const response = await axios.get(NEW_APPOINTMENT_URL);
    return response.data as AppointmentResponseType[];
  };

  const { data, isLoading } = useQuery(
    [`newAppointments-${sessionStorage.getItem('patientId')}`],
    fetchNewAppointments, {refetchOnMount: 'always'}
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
            <FlexibleAccordion
              isWithStatus
              dataList={data || []}
              firstTableTitle="Leki:"
              secondTableTitle="Objawy:"
            />
          )}
        </Flex>
      </Flex>
    </Container>
  );
};
