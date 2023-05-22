import { Container, Flex, Loader, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { AppointmentResponseType } from '../../../helpers/types';
import { FlexibleAccordion } from '../../UI/FlexibleAccordion';

// type VisitsListProps = {

// };

// const patientId = sessionStorage.getItem('patientId');
// console.log(patientId);

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
    fetchNewAppointments
  );
  return (
    <Container my={40} w="100%">
      <Flex direction="column" w="100%" align="center">
        <Text size="xl" fw={700} lts={1}>
          Twoje wizyty
        </Text>
        {isLoading ? (
          <Loader mt="xl" />
        ) : (
          <FlexibleAccordion
            isWithStatus
            dataList={data || []}
            firstTableTitle="Leki:"
            secoundTableTitle="Objawy:"
          />
        )}
      </Flex>
    </Container>
  );
};
