import { Button, Flex, ScrollArea, TextInput, Title } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import dayjs from 'dayjs';
import { useState } from 'react';

import { signUpSchema as schema } from '../../../helpers/schemas';
import { AppointmentResponseType } from '../../../helpers/types';
import { FlexibleAccordion } from '../../UI/FlexibleAccordion';

const wizyty = [
  {
    appointmentId: 1,
    patientName: 'Jan Paweł',
    doctorName: 'Krystian Bąk',
    appointmentDate: '2023-07-04',
    patientSymptoms: 'Mocny ból głowy z zawrotami, zwędzenie rąk.',
    medicinesTaken: 'Ibuprofen',
    appointmentStatus: 'NEW',
    doctorRecommendations: '',
    createdAt: '2023-06-21',
    modifiedAt: '2023-06-21',
  },
  {
    appointmentId: 2,
    patientName: 'Karol Strzyk',
    doctorName: 'Adam Piotrowski',
    appointmentDate: '2023-07-04',
    patientSymptoms: 'Mocny ból głowy z zawrotami, zwędzenie rąk.',
    medicinesTaken: 'Ibuprofen',
    appointmentStatus: 'NEW',
    doctorRecommendations: '',
    createdAt: '2023-06-21',
    modifiedAt: '2023-06-21',
  },
  {
    appointmentId: 3,
    patientName: 'Michał Małysz',
    doctorName: 'Krystian Bąk',
    appointmentDate: '2023-07-04',
    patientSymptoms: 'Mocny ból głowy z zawrotami, zwędzenie rąk.',
    medicinesTaken: 'Ibuprofen',
    appointmentStatus: 'NEW',
    doctorRecommendations: '',
    createdAt: '2023-06-21',
    modifiedAt: '2023-06-21',
  },
  {
    appointmentId: 4,
    patientName: 'Jan Paweł',
    doctorName: 'Krystian Bąk',
    appointmentDate: '2023-07-04',
    patientSymptoms:
      'WWWWWWW WWWWWWWWWWWWWWWWWWW WWWWWWWW WWWWWWWW WWWWWWWWWWWWWWWWW',
    medicinesTaken: 'Ibuprofen',
    appointmentStatus: 'NEW',
    doctorRecommendations: '',
    createdAt: '2023-06-21',
    modifiedAt: '2023-06-21',
  },
  {
    appointmentId: 5,
    patientName: 'Karol Strzyk',
    doctorName: 'Krystian Bąk',
    appointmentDate: '2023-06-02',
    patientSymptoms: 'Mocny ból głowy z zawrotami, zwędzenie rąk.',
    medicinesTaken: 'Ibuprofen',
    appointmentStatus: 'NEW',
    doctorRecommendations: '',
    createdAt: '2023-06-21',
    modifiedAt: '2023-06-21',
  },
  {
    appointmentId: 6,
    patientName: 'Michał Małysz',
    doctorName: 'Krystian Bąk',
    appointmentDate: '2023-06-03',
    patientSymptoms:
      'Mocny ból głowy z zawrotami, zwędzenie rąk. Jestem ciągle głodny i nie mogę tego wytzymać',
    medicinesTaken: 'Ibuprofen',
    appointmentStatus: 'NEW',
    doctorRecommendations: '',
    createdAt: '2023-06-21',
    modifiedAt: '2023-06-21',
  },
  {
    appointmentId: 7,
    patientName: 'Jan Paweł',
    doctorName: 'Krystian Bąk',
    appointmentDate: '2023-06-10',
    patientSymptoms:
      'WWWWWWW WWWWWWWWWWWWWWWWWWW WWWWWWWW WWWWWWWW WWWWWWWWWWWWWWWWW',
    medicinesTaken: 'Ibuprofen',
    appointmentStatus: 'NEW',
    doctorRecommendations: '',
    createdAt: '2023-06-21',
    modifiedAt: '2023-06-21',
  },
  {
    appointmentId: 8,
    patientName: 'Karol Strzyk',
    doctorName: 'Krystian Bąk',
    appointmentDate: '2023-07-04',
    patientSymptoms: 'Mocny ból głowy z zawrotami, zwędzenie rąk.',
    medicinesTaken: 'Ibuprofen',
    appointmentStatus: 'NEW',
    doctorRecommendations: '',
    createdAt: '2023-06-21',
    modifiedAt: '2023-06-21',
  },
  {
    appointmentId: 9,
    patientName: 'Michał Małysz',
    doctorName: 'Krystian Bąk',
    appointmentDate: '2023-07-04',
    patientSymptoms:
      'Mocny ból głowy z zawrotami, zwędzenie rąk. Jestem ciągle głodny i nie mogę tego wytzymać',
    medicinesTaken: 'Ibuprofen',
    appointmentStatus: 'NEW',
    doctorRecommendations: '',
    createdAt: '2023-06-21',
    modifiedAt: '2023-06-21',
  },
];
const Archives = () => {
  const form = useForm({
    initialValues: {
      maxDate: new Date(),
      patient: '',
      doctor:''
    },
    validate: zodResolver(schema),
  });

  const [filteredAppointments, setFilteredAppointments] = useState<AppointmentResponseType[]>([])

  const handleClick = () => {
    setFilteredAppointments(wizyty.filter(
      (appointment) =>
        new Date(appointment.appointmentDate) <= new Date(dayjs(form.getInputProps('maxDate').value).format('YYYY-MM-DD'))
    ))
    if(form.getInputProps('patient').value !== ''){
      setFilteredAppointments((prevState) => prevState.filter(
        (appointment) =>
          appointment.patientName.includes(form.getInputProps('patient').value)
      ))
    }
    if(form.getInputProps('doctor').value !== ''){
      setFilteredAppointments((prevState) => prevState.filter(
        (appointment) =>
          appointment.doctorName.includes(form.getInputProps('doctor').value)
      ))
    }
  }

  return (
    <Flex w="100%" justify="center">
      <Flex miw="50%" direction="column" align="center" gap="md">
        <Flex w="100%" align="center" direction="column">
          <Title>Archiwum</Title>
          <Flex w="100%" align="end" justify="space-between" gap="md">
            <Flex gap="md">
              <DateInput
                valueFormat='YYYY-MM-DD'
                label='Do dnia'
                {...form.getInputProps('maxDate')}
              />
              <TextInput
                label={'Pacjent'}
                placeholder={'Wpisz dane pacjenta'}
                {...form.getInputProps('patient')}
              />
              <TextInput
                label={'Doktor'}
                placeholder={'Wpisz dane doktora'}
                {...form.getInputProps('doctor')}
              />
            </Flex>
            <Button
              onClick={() => handleClick()}
            >
              Szukaj
            </Button>
          </Flex>
        </Flex>
        <ScrollArea mah="50rem" w="100%" maw={'55rem'}>
          <Flex justify="center">
              <FlexibleAccordion
                dataList={filteredAppointments}
                firstTableTitle={'Stosowane leki:'}
                secondTableTitle={'Objawy:'}
                isWithStatus={false}
                withButtons={false}
                withEditButton={true}
                withPatient={true}
              />
          </Flex>
        </ScrollArea>
      </Flex>
    </Flex>
  );
};

export default Archives;
