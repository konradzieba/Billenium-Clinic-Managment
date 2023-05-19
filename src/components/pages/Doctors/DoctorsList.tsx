import { Flex, Loader, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { DoctorListType } from '../../../helpers/types';
import Doctor from './Doctor';

type DoctorListProps = {
  specialization: string;
};
const URL =
  'http://localhost:8080/api/doctors/by-specialization?specialization=';

export const DoctorList = ({ specialization }: DoctorListProps) => {
  const fetchDoctors = async (specialization: string) => {
    const response = await axios.get(`${URL}${specialization}`);
    return response.data as DoctorListType[];
  };
  const { data, isLoading } = useQuery([`${specialization}`], () =>
    fetchDoctors(specialization)
  );
  console.log(data);
  return (
    <Flex
      maw="100%"
      direction={'column'}
      align={'center'}
      my={'80px'}
      mx={'auto'}
    >
      <Title align={'center'}> Wybierz interesującego Cię lekarza</Title>
      {isLoading && <Loader mt="xl" />}
      {data?.map((doc, index) => {
        return (
          <Doctor
            avatar={doc.photo}
            name={doc.firstName}
            lastname={doc.lastName}
            description={doc.description}
            index={index}
          />
        );
      })}
    </Flex>
  );
};
