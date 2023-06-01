import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  createStyles,
  Drawer,
  Flex,
  Input,
  Loader,
  rem,
  ScrollArea,
  Table,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowBack, IconSearch, IconSettings2 } from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import { ChangeEvent, useState } from 'react';
import { IMaskInput } from 'react-imask';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  AppointmentResponseType,
  DoctorInfoType,
  UserProfileInfoType,
} from '../../../helpers/types';
import ConfirmModal from '../../UI/ConfirmModal';

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: 'white',
    overflow: 'hidden',
    zIndex: 1,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      overflow: 'hidden',
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[2]
      }`,
    },
  },
  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));
const photoUrlRegex = new RegExp(/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm);
const DOCTOR_URL = 'http://localhost:8080/api/doctors/';
const DOCTOR_PATIENTS_URL = 'http://localhost:8080/api/patients/by-doctor/';
const DOCTOR_VISITS_URL = 'http://localhost:8080/api/doctors/';

export const DoctorProfile = () => {
  const userRole = sessionStorage.getItem('role');
  const todaysDate = dayjs(new Date()).format('YYYY-MM-DD').toString();
  const todaysDateShort = dayjs(new Date()).format('DD-MM').toString();
  const navigate = useNavigate();
  const { classes, cx } = useStyles();
  const { pathname } = useLocation();
  const doctorId = pathname.split('/')[2];
  const [scrolledVisits, setScrolledVisits] = useState(false);
  const [scrolledPacients, setScrolledPacients] = useState(false);
  const [searchPESELInput, setSearchPESELInput] = useState<string | ''>('');
  const [doctorSpecialization, setDoctorSpecialization] = useState<string | ''>(
    ''
  );
  const [opened, { open, close }] = useDisclosure(false);
  const [doctorDescription, setDoctorDescription] = useState<string | ''>('');
  const [doctorPhotoUrl, setDoctorPhotoUrl] = useState<string | ''>('');
  const [inputError, setInputError] = useState({ description: '', photo: '' });
  const [save, setSave] = useState(false);
  const fetchDoctor = async () => {
    const response = await axios.get(`${DOCTOR_URL}${doctorId}`);
    return response.data as DoctorInfoType;
  };
  const fetchPatients = async () => {
    const response = await axios.get(`${DOCTOR_PATIENTS_URL}${doctorId}`);
    return response.data as UserProfileInfoType[];
  };

  const fetchVisits = async () => {
    const response = await axios.get(
      `${DOCTOR_VISITS_URL}${doctorId}/appointments?appointmentDate=${todaysDate}`
    );
    return response.data as AppointmentResponseType[];
  };

  const patients = useQuery([`patients-${doctorId}`], fetchPatients);
  const doctorInfo = useQuery([`doctorInfo-${doctorId}`], fetchDoctor, {
    onSuccess: (data) => {
      setDoctorDescription(data.description);
      setDoctorPhotoUrl(data.photo);
      if (data.specialization === 'gastroenterologist') {
        setDoctorSpecialization('Gastrolog');
      } else if (data.specialization === 'internist') {
        setDoctorSpecialization('Internista');
      } else if (data.specialization === 'ophthalmologist') {
        setDoctorSpecialization('Okulista');
      } else if (data.specialization === 'pulmonologist') {
        setDoctorSpecialization('Pulmonolog');
      }
    },
  });
  const patchDoctorInfo = async () => {
    const response = await axios.patch(
      `${DOCTOR_URL}${doctorId}?photo=${doctorPhotoUrl}&description=${doctorDescription}`
    );
    return response.data as DoctorInfoType;
  };

  const mutation = useMutation(patchDoctorInfo, {
    onSuccess: () => {
      doctorInfo.refetch();
    },
  });

  const handleSave = () => {
    mutation.mutate();
    setSave(false);
    close();
  };

  const visits = useQuery([`visits-${doctorId}`], fetchVisits);
  const visitsRows =
    visits.data?.length !== 0
      ? visits.data?.map((visit) => (
          <tr key={visit.appointmentId}>
            <td>{visit.appointmentDate}</td>
            <td>{visit.patientName}</td>
            <td>{visit.medicinesTaken}</td>
            <td>{visit.patientSymptoms}</td>
          </tr>
        ))
      : [];
  const pacientsRows =
    patients.data?.length !== 0
      ? patients.data
          ?.filter((patient) =>
            patient.patientUserInfo.pesel.startsWith(searchPESELInput)
          )
          .map((patient) => (
            <tr key={patient.patientId}>
              <td>
                {patient.patientUserInfo.firstName}{' '}
                {patient.patientUserInfo.lastName}
              </td>
              <td>{patient.patientUserInfo.pesel}</td>
              <td>{patient.patientUserInfo.phoneNumber}</td>
              <td>{patient.patientUserInfo.birthdate}</td>
              <td>{patient.patientUserInfo.email}</td>
              <td>
                <Button
                  variant="outline"
                  onClick={() => console.log(patient.patientId)}
                >
                  Sprawdz historię
                </Button>
              </td>
            </tr>
          ))
      : [];
  return (
    <Container miw="80%">
      <Flex direction="column" gap={50} py="lg">
        <Flex justify="space-evenly" align="center" w="100%" gap="md" h="20%">
          {doctorInfo.isLoading ? (
            <Loader />
          ) : (
            <>
              <Flex justify="center" align="center">
                <Avatar
                  radius="md"
                  size="9rem"
                  miw="8rem"
                  mih="8rem"
                  src={doctorInfo.data?.photo}
                  mx={'md'}
                />
                <Box>
                  <Title>{`Profil doktora ${doctorInfo.data?.userInfoResponseDTO.firstName} ${doctorInfo.data?.userInfoResponseDTO.lastName}`}</Title>
                  <Text fz="lg">{`${doctorSpecialization}, tel. ${doctorInfo.data?.userInfoResponseDTO.phoneNumber}`}</Text>
                </Box>
              </Flex>
              <Flex direction="column" gap="xl">
                <IconSettings2
                  size={30}
                  style={{ cursor: 'pointer' }}
                  onClick={open}
                  display={
                    userRole === 'doctor' &&
                    doctorId === sessionStorage.getItem('doctorId')
                      ? 'block'
                      : 'none'
                  }
                />
                <IconArrowBack
                  size={30}
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate('/reception')}
                />
              </Flex>
            </>
          )}
        </Flex>
        <Flex direction="column" h="80%" gap="xl">
          <Flex justify="center" direction="column" mih="50%">
            <Flex justify="space-between">
              <Text
                fz="lg"
                fw={700}
              >{`Wizyty na dzień ${todaysDateShort}: `}</Text>
              {visits.data?.length === 0 ? null : (
                <Button variant="filled">Pobierz wizyty</Button>
              )}
            </Flex>
            {visits.isLoading ? (
              <Flex justify="center" align="center" h="100%">
                <Loader />
              </Flex>
            ) : visits.data?.length === 0 ? (
              <Flex justify="center" align="center" h="100%">
                <Text fz="lg">Brak wizyt na dziś</Text>
              </Flex>
            ) : (
              <ScrollArea
                h="300px"
                onScrollPositionChange={({ y }) => setScrolledVisits(y !== 0)}
              >
                <Table
                  miw="700px"
                  horizontalSpacing="xl"
                  striped
                  highlightOnHover
                  fontSize="md"
                >
                  <thead
                    className={cx(classes.header, {
                      [classes.scrolled]: scrolledVisits,
                    })}
                  >
                    <tr>
                      <th style={{ color: '#fd7e14' }}>Godzina</th>
                      <th style={{ color: '#fd7e14' }}>Pacjent</th>
                      <th style={{ color: '#fd7e14' }}>Leki</th>
                      <th style={{ color: '#fd7e14' }}>Objawy</th>
                    </tr>
                  </thead>
                  <tbody>{visitsRows}</tbody>
                </Table>
              </ScrollArea>
            )}
          </Flex>
          <Flex justify="center" direction="column" mih="50%">
            <Text fz="lg" fw={700}>
              Lista pacjentów:
            </Text>
            {patients.isLoading ? (
              <Flex justify="center" align="center" h="100%">
                <Loader />
              </Flex>
            ) : patients.data?.length === 0 ? (
              <Flex justify="center" align="center" h="100%">
                <Text fz="lg">Brak pacientów</Text>
              </Flex>
            ) : (
              <ScrollArea
                h="300px"
                onScrollPositionChange={({ y }) => setScrolledPacients(y !== 0)}
              >
                <Table
                  miw="700px"
                  horizontalSpacing="xl"
                  striped
                  highlightOnHover
                  fontSize="md"
                >
                  <thead
                    className={cx(classes.header, {
                      [classes.scrolled]: scrolledPacients,
                    })}
                  >
                    <tr>
                      <th style={{ color: '#fd7e14' }}>Imię i nazwisko</th>
                      <th style={{ color: '#fd7e14' }}>PESEL</th>
                      <th style={{ color: '#fd7e14' }}>Telefon</th>
                      <th style={{ color: '#fd7e14' }}>Data urodzenia</th>
                      <th style={{ color: '#fd7e14' }}>Email</th>
                      <th style={{ color: '#fd7e14' }}>
                        <Input.Wrapper maw="9rem">
                          <Input
                            placeholder="Wpisz PESEL"
                            icon={<IconSearch size={20} />}
                            component={IMaskInput}
                            mask="00000000000"
                            value={searchPESELInput}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              setSearchPESELInput(e.target.value);
                            }}
                          />
                        </Input.Wrapper>
                      </th>
                    </tr>
                  </thead>
                  <tbody>{pacientsRows}</tbody>
                </Table>
              </ScrollArea>
            )}
          </Flex>
        </Flex>
      </Flex>
      <Drawer
        opened={opened}
        onClose={close}
        title="Edycja danych doktora"
        position="right"
        overlayProps={{ opacity: 0, blur: 0 }}
      >
        <Textarea
          value={doctorDescription}
          onChange={(event) => {
            setInputError({ ...inputError, description: '' });
            setDoctorDescription(event.currentTarget.value);
          }}
          onBlur={() => {
            if (doctorDescription === '') {
              setInputError({
                ...inputError,
                description: 'Opis nie może być pusty',
              });
            }
          }}
          label="Opis"
          error={inputError.description !== '' ? inputError.description : false}
          description="Maksymalnie 300 znaków"
          autosize
          minRows={2}
          maxRows={8}
          maxLength={300}
        />

        <TextInput
          pt={20}
          description="Podaj link do nowego zdjęcia"
          value={doctorPhotoUrl}
          error={inputError.photo !== '' ? inputError.photo : false}
          onBlur={() => {
            if (doctorPhotoUrl.match(photoUrlRegex) === null) {
              setInputError({
                ...inputError,
                photo: 'Podany link jest niepoprawny',
              });
            }
          }}
          onChange={(event) => {
            setInputError({ ...inputError, photo: '' });
            setDoctorPhotoUrl(event.currentTarget.value);
          }}
          label="Zdjęcie"
        />

        <Center pt={20}>
          <Button
            disabled={inputError.description !== '' || inputError.photo !== ''}
            onClick={() => setSave(true)}
          >
            Prześlij
          </Button>
        </Center>
      </Drawer>
      <ConfirmModal
        title="Czy na pewno chcesz zmienić dane?"
        opened={save}
        setOpen={setSave}
        acceptText="Zapisz"
        onAccept={handleSave}
      />
    </Container>
  );
};
