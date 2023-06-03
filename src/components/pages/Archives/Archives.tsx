import {
  Button,
  Flex,
  ScrollArea,
  Select,
  TextInput,
  Title,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import { useState } from 'react';

import { AppointmentStatus } from '../../../helpers/enums';
import {
  AppointmentResponseType,
  DoctorListType,
} from '../../../helpers/types';
import { FlexibleAccordion } from '../../UI/FlexibleAccordion';
import { isWeekend } from '../Appointment/Calendar';

const AllAppointmentsURL = 'http://localhost:8080/api/appointments/all';
const DOCTORS_URL = 'http://localhost:8080/api/doctors';

const Archives = () => {
  const [selectedDoctorName, setSelectedDoctorName] = useState<string | null>(
    null
  );
  const [selectedPatientName, setSelectedPatientName] = useState<string>('');

  const fetchAllAppointments = async () => {
    const response = await axios.get(AllAppointmentsURL);
    return response.data as AppointmentResponseType[];
  };

  const fetchAllDoctors = async () => {
    const response = await axios.get(DOCTORS_URL);
    return response.data as DoctorListType[];
  };

  const allAppointmentsList = useQuery(
    ['AllAppointments'],
    fetchAllAppointments
  );
  const allDoctors = useQuery(['AllDoctors'], fetchAllDoctors, {
    onSuccess: () => {
      setSelectedDoctorName('0');
    },
  });

  const fetchedDoctorData = allDoctors.data
    ? allDoctors.data?.map((doc) => {
        return {
          value: `${doc.firstName} ${doc.lastName}`,
          label: `${doc.firstName} ${doc.lastName}`,
        };
      })
    : [{ value: '1', label: 'Brak lekarzy' }];

  const selectDoctorData = [
    { value: '0', label: 'Wszyscy lekarze' },
    ...fetchedDoctorData,
  ];
  const [filteredAppointments, setFilteredAppointments] = useState<
    AppointmentResponseType[]
  >([]);

  const [date, setDate] = useState<Date>(new Date());
  const formattedDate = dayjs(date).format('DD.MM.YYYY');

  const handleClick = () => {
    if (allAppointmentsList.data) {
      const filteredAppointmentsList = allAppointmentsList.data?.filter(
        (appointment) => {
          if (
            appointment.doctorName === selectedDoctorName &&
            appointment.patientName.startsWith(selectedPatientName) &&
            appointment.appointmentDate.includes(formattedDate)
          ) {
            if (
              appointment.appointmentStatus === AppointmentStatus.DONE ||
              appointment.appointmentStatus === AppointmentStatus.CANCELED
            ) {
              return appointment;
            }
          }
          if (
            selectedDoctorName === '0' &&
            appointment.patientName.startsWith(selectedPatientName) &&
            appointment.appointmentDate.includes(formattedDate) &&
            appointment.appointmentDate.includes(formattedDate)
          ) {
            if (
              appointment.appointmentStatus === AppointmentStatus.DONE ||
              appointment.appointmentStatus === AppointmentStatus.CANCELED
            ) {
              return appointment;
            }
          }
        }
      );
      setFilteredAppointments(filteredAppointmentsList);
    }
  };

  return (
    <Flex w="100%" justify="center">
      <Flex miw="50%" direction="column" align="center" gap="md">
        <Flex w="100%" align="center" direction="column">
          <Title>Archiwum</Title>
          <Flex w="100%" align="end" justify="space-between" gap="md">
            <Flex gap="md">
              <DateInput
                valueFormat="YYYY-MM-DD"
                maxDate={new Date()}
                excludeDate={(date) => isWeekend(dayjs(date))}
                label="Data: "
                value={date}
                onChange={(value) => value && setDate(value)}
              />
              <TextInput
                label={'Pacjent:'}
                value={selectedPatientName}
                onChange={(e) => setSelectedPatientName(e.target.value)}
                placeholder={'Imię i nazwisko'}
              />
              <Select
                value={selectedDoctorName}
                label="Lekarz:"
                data={selectDoctorData}
                onChange={setSelectedDoctorName}
              />
            </Flex>
            <Button onClick={handleClick}>Szukaj</Button>
          </Flex>
        </Flex>
        <ScrollArea mah="50rem" w="100%" maw={'55rem'}>
          <Flex justify="center">
            <FlexibleAccordion
              dataList={filteredAppointments}
              firstTableTitle={'Stosowane leki:'}
              secondTableTitle={'Objawy:'}
              isWithStatus={true}
              withPatient={true}
            />
          </Flex>
        </ScrollArea>
      </Flex>
    </Flex>
  );
};

export default Archives;
