import { Box, Button, Center, Flex, Loader, Text, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { DoctorListType } from '../../../helpers/types';
import AppointmentStepper from '../../UI/AppointmentStepper';
import Doctor from './Doctor';

type DoctorListProps = {
  specialization: string;
};
const URL =
  'http://localhost:8080/api/doctors/by-specialization?specialization=';

export const DoctorList = ({ specialization }: DoctorListProps) => {
  const navigate = useNavigate();
  const fetchDoctors = async (specialization: string) => {
    const response = await axios.get(`${URL}${specialization}`);
    return response.data as DoctorListType[];
  };
  const { data, isLoading } = useQuery([`${specialization}`], () =>
    fetchDoctors(specialization)
  );
  return (
    <Flex
      maw="100%"
      direction={'column'}
      align={'center'}
      justify={'space-between'}
      mt={40}
      mx={'auto'}
    >
      <Box>
        <Title align={'center'}> Wybierz interesującego Cię lekarza</Title>
        <Center pt="xl">
          {isLoading && <Loader mt="xl" />}
          {!isLoading && !data && ( <Text fz='xl'>Nie znaleziono lekarzy w wybranej specjalizacji</Text>)}
        </Center>
        {data?.map((doc, index) => {
          return (
            <Doctor
              key={index}
              avatar={doc.photo}
              name={doc.firstName}
              lastname={doc.lastName}
              description={doc.description}
              doctorId={doc.doctorId}
            />
          );
        })}
      </Box>
      <Button
        ml={'md'}
        size={'md'}
        onClick={() => navigate('/specializations')}
      >
        Powrót do strony wybour specjalizacji
      </Button>
      <AppointmentStepper activeStep={0} />
    </Flex>
  );
};
