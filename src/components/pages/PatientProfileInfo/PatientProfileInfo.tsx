import {
  Button,
  Center,
  Container,
  Flex,
  List,
  Loader,
  ScrollArea,
  Text,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  AppointmentResponseType,
  UserProfileInfoType,
} from '../../../helpers/types';
import { FlexibleAccordion } from '../../UI/FlexibleAccordion';

const PATIENT_INFO_URL = 'http://localhost:8080/api/patients';
const infoBorder = { borderLeft: '2px solid #fd7e14' };

const PatientProfileInfo = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const patientId = pathname.split('/')[2];

  const fetchPatientInfo = async () => {
    const response = await axios.get(`${PATIENT_INFO_URL}/${patientId}`);
    return response.data as UserProfileInfoType;
  };
  const NEW_APPOINTMENT_URL = `http://localhost:8080/api/patients/${patientId}/appointments`;

  const fetchNewAppointments = async () => {
    const response = await axios.get(NEW_APPOINTMENT_URL);
    return response.data as AppointmentResponseType[];
  };

  const patientInfo = useQuery(
    [`patientInfoProfile`, patientId],
    fetchPatientInfo
  );

  const patientAppointments = useQuery(
    [`appointments`, patientId],
    fetchNewAppointments
  );

  return (
    <Container miw="80%">
      <Flex direction="column" py="lg">
        <Flex
          direction="column"
          justify="center"
          align="center"
          w="100%"
          gap="md"
        >
          <Text fz="xl" fw="bold">
            Informacje o pacjencie
          </Text>
          <Flex gap="lg">
            {patientInfo.isLoading ? (
              <Loader my="lg" />
            ) : (
              <>
                <Flex gap="sm" direction="column">
                  <Text style={infoBorder} pl={3}>
                    Imię Nazwisko:{' '}
                    <Text span fw="bold">
                      {patientInfo.data?.patientUserInfo.firstName}{' '}
                      {patientInfo.data?.patientUserInfo.lastName}
                    </Text>
                  </Text>
                  <Text style={infoBorder} pl={3}>
                    Telefon:{' '}
                    <Text span fw="bold">
                      {patientInfo.data?.patientUserInfo.phoneNumber}
                    </Text>
                  </Text>
                  <Text style={infoBorder} pl={3}>
                    Data urodzenia:{' '}
                    <Text span fw="bold">
                      {patientInfo.data?.patientUserInfo.birthdate}
                    </Text>
                  </Text>
                  <Text mt="md">Stosowane leki: </Text>
                  <List>
                    <List.Item>lek</List.Item>
                    <List.Item>lek</List.Item>
                    <List.Item>lek</List.Item>
                  </List>
                </Flex>
                <Flex gap="sm" direction="column">
                  <Text style={infoBorder} pl={3}>
                    PESEL:{' '}
                    <Text span fw="bold">
                      {patientInfo.data?.patientUserInfo.pesel}
                    </Text>
                  </Text>
                  <Text style={infoBorder} pl={3}>
                    Email:{' '}
                    <Text span fw="bold">
                      {patientInfo.data?.patientUserInfo.email}
                    </Text>
                  </Text>
                  <Text style={infoBorder} pl={3}>
                    Adres:{' '}
                    <Text span fw="bold">
                      {patientInfo.data?.addressResponseDTO.street},{' '}
                      {patientInfo.data?.addressResponseDTO.city}{' '}
                      {patientInfo.data?.addressResponseDTO.zipCode}
                    </Text>
                  </Text>
                  <Text mt="md">Alergie: </Text>
                  <List>
                    <List.Item>lek</List.Item>
                    <List.Item>lek</List.Item>
                  </List>
                </Flex>
              </>
            )}
          </Flex>
        </Flex>
        <Flex direction="column" align="center">
          <Text fz="lg" fw="bold" my="md">
            Historia wizyt pacjenta
          </Text>
          {patientAppointments.isLoading ? (
            <Loader my="lg" />
          ) : (
            <ScrollArea h={440} offsetScrollbars w="50vw">
              <Center>
                <FlexibleAccordion
                  dataList={patientAppointments.data || []}
                  firstTableTitle="Leki:"
                  secondTableTitle="Objawy:"
                  isWithStatus
                  fullWidth
                />
              </Center>
            </ScrollArea>
          )}
        </Flex>
      </Flex>
      <Center>
        <Button onClick={() => navigate('/reception')}my='md'>Powrót do panelu recepcji</Button>
      </Center>
    </Container>
  );
};

export default PatientProfileInfo;
