import {
  Center,
  Flex,
  Loader,
  ScrollArea,
  Select,
  Text,
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import { useState } from 'react';

import {
  AppointmentResponseType,
  DoctorListType,
} from '../../../helpers/types';
import { FlexibleAccordion } from '../../UI/FlexibleAccordion';
import DoctorItem from './DoctorItem';
import UserSearch from './UserSearch';

const BREAKPOINT = 1080;
const DOCTORS_URL = 'http://localhost:8080/api/doctors';
const NEW_APPOINTMENTS = 'http://localhost:8080/api/appointments/new';

const ReceptionMain = () => {
  const { width } = useViewportSize();
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const fetchDoctors = async () => {
    const response = await axios.get(DOCTORS_URL);
    return response.data as DoctorListType[];
  };
  const fetchNewAppointments = async () => {
    const response = await axios.get(NEW_APPOINTMENTS);
    return response.data as AppointmentResponseType[];
  };
  const doctorList = useQuery(['doctorsList'], fetchDoctors, {
    onSuccess: (data) => {
      setSelectedDoctorId(data[0].doctorId.toString());
    },
  });

  const newAppointmentsList = useQuery(
    ['newAppointments'],
    fetchNewAppointments
  );

  const todaysDate = dayjs(new Date()).format('YYYY-MM-DD').toString();

  const fetchDoctorTodayAppointments = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/doctors/${selectedDoctorId}/appointments?appointmendDate=${todaysDate}`
    );
    return response.data as AppointmentResponseType[];
  };
  const doctorTodayAppointmentsList = useQuery(
    [`todayAppointments-${selectedDoctorId}`, selectedDoctorId],
    fetchDoctorTodayAppointments,
    { enabled: selectedDoctorId !== null }
  );
  const selectDoctorData = doctorList.data
    ? doctorList.data?.map((doc) => {
        return {
          value: doc.doctorId.toString(),
          label: `${doc.firstName} ${doc.lastName}`,
          image: doc.photo,
        };
      })
    : [{ value: '1', label: 'Brak lekarzy', image: '' }];
  return (
    <Flex
      justify="space-around"
      w="100%"
      p="md"
      gap={width < BREAKPOINT ? 25 : 0}
      direction={width < BREAKPOINT ? 'column' : 'row'}
      miw={width < BREAKPOINT ? '' : '1080px'}
    >
      <Flex
        w={width < BREAKPOINT ? '100%' : '25rem'}
        direction="column"
        gap={width < BREAKPOINT ? 'md' : 0}
        justify="space-around"
        mah="95vh"
      >
        <Flex
          h="10rem"
          miw={width < BREAKPOINT ? '100%' : '15rem'}
          sx={(theme) => {
            return {
              borderRadius: theme.radius.md,
              border: '3px #fd7e14 solid',
            };
          }}
        >
          <UserSearch />
        </Flex>
        <Flex
          h="30rem"
          w="100%"
          miw={width < BREAKPOINT ? '100%' : '15rem'}
          direction="column"
          sx={(theme) => {
            return {
              borderRadius: theme.radius.md,
              border: '3px #fd7e14 solid',
            };
          }}
        >
          {doctorList.isLoading ? (
            <Flex justify="center" align="center" h="100%">
              <Loader />
            </Flex>
          ) : (
            doctorList.data?.map((doctor, index) => {
              return (
                <DoctorItem
                  key={doctor.doctorId}
                  index={index}
                  lastName={doctor.lastName}
                  specialization={doctor.specialization}
                  photo={doctor.photo}
                  doctorId={doctor.doctorId}
                />
              );
            })
          )}
        </Flex>
      </Flex>
      <Flex
        miw={width < BREAKPOINT ? '100%' : '30rem'}
        w={width < BREAKPOINT ? '100%' : '50rem'}
        h="95vh"
        justify="start"
        direction="column"
        sx={(theme) => {
          return {
            borderRadius: theme.radius.md,
            border: '3px #fd7e14 solid',
          };
        }}
      >
        <Text align={'center'} fz='xl' fw='bold' p="md">
          Oczekujące rezerwacje
        </Text>
        {newAppointmentsList.isLoading ? (
          <Flex justify="center" align="center" h="100%">
            <Loader />
          </Flex>
        ) : (
          <ScrollArea offsetScrollbars type="always">
            <Flex w="100%" justify="center">
              <FlexibleAccordion
                dataList={newAppointmentsList.data || []}
                firstTableTitle={'Stosowane leki:'}
                secondTableTitle={'Objawy:'}
                isWithStatus={true}
                withButtons={true}
              />
            </Flex>
          </ScrollArea>
        )}
      </Flex>
      <Flex
        miw={width < BREAKPOINT ? '100%' : '25rem'}
        w="25rem"
        h="95vh"
        gap="md"
        direction="column"
        sx={(theme) => {
          return {
            borderRadius: theme.radius.md,
            border: '3px #fd7e14 solid',
          };
        }}
      >
        <Text p="md" fw={700} fz='md' align="center">
          Dzisiejsze wizyty
        </Text>
        <Center>
          <Select
            value={selectedDoctorId}
            label="Lekarz:"
            data={selectDoctorData}
            w="90%"
            onChange={setSelectedDoctorId}
          />
        </Center>

        {doctorTodayAppointmentsList.isLoading ? (
          <Flex justify="center" align="center" h="100%">
            <Loader />
          </Flex>
        ) : doctorTodayAppointmentsList.data?.length === 0 ? (
          <Center>
            <Text>Brak wizyt na dziś</Text>
          </Center>
        ) : (
          <ScrollArea type="always">
            <Flex justify="center">
              <FlexibleAccordion
                dataList={doctorTodayAppointmentsList.data || []}
                firstTableTitle={'Stosowane leki:'}
                secondTableTitle={'Objawy:'}
                isWithStatus={true}
                withEditButton={true}
                directionColumn
              />
            </Flex>
          </ScrollArea>
        )}
      </Flex>
    </Flex>
  );
};

export default ReceptionMain;
