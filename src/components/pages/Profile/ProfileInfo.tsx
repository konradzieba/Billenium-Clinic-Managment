import {
  ActionIcon,
  Button,
  Container,
  Flex,
  Skeleton,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useViewportSize } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useReducer, useState } from 'react';

import ConfirmModal from '../../../components/UI/ConfirmModal';
import { fetchUserInfo } from '../../../helpers/queries';
import {
  userProfileInitialValues,
  userProfileReducer,
} from '../../../helpers/reducers';
import ModalAllergy from './ModalAllergy';
import ModalMedicines from './ModalMedicines';
// type DoctorListProps = {

// };
const URL = 'http://localhost:8080/api/patients/';
const fetchUserData = () => fetchUserInfo(URL, sessionStorage.getItem('patientId'));

export const ProfileInfo = () => {
  const { width } = useViewportSize();
  const [openMedicines, setOpenMedicines] = useState(false);
  const [openAllergy, setOpenAllergy] = useState(false);
  const [save, setSave] = useState(false);
  const [isBlocked, setIsBlocked] = useState(true);
  const [state, dispatch] = useReducer(
    userProfileReducer,
    userProfileInitialValues
  );
  const { data, isLoading } = useQuery(
    [`patientInfo${sessionStorage.getItem('patientId')}`],
    fetchUserData,
    {
      onSuccess: (data) => {
        dispatch({ type: 'email', payload: data.patientUserInfo.email });
        dispatch({
          type: 'phoneNumber',
          payload: data.patientUserInfo.phoneNumber,
        });
      },
    }
  );

  const handleSave = () => {
    setSave(false);
    setIsBlocked(true);
    // console.log('hejka');
  };

  // const form = useForm({
  //   initialValues: {
  //     email: '',
  //     phoneNumber: '',
  //   },
  //   validate: zodResolver(schema),
  // });
  // console.log(state.zipCode);
  // console.log(state.city);
  // console.log(state.street);
  // console.log(state.phoneNumber);
  // console.log(state.email);
  return (
    <Container p="md" miw={'22rem'}>
      <Flex
        sx={(theme) => {
          return {
            borderRadius: theme.radius.md,
            border: '3px #fd7e14 solid',
          };
        }}
        direction="column"
      >
        <Title align="center" fw={700} lts={1} mt="sm">
          Profil pacjenta
        </Title>
        <Flex m="md" justify="space-between">
          <Text>Dane Osobowe</Text>
          {isBlocked && (
            <Button variant="outline" onClick={() => setIsBlocked(false)}>
              Edytuj dane
            </Button>
          )}
          {!isBlocked && (
            <Flex gap="md">
              <Button variant="outline" onClick={() => setIsBlocked(true)}>
                Anuluj
              </Button>
              <Button variant="filled" onClick={() => setSave(true)}>
                Zapisz
              </Button>
            </Flex>
          )}
        </Flex>
        {/* Zrobić szkielet dla każdego z pól */}
        <Skeleton visible={isLoading}>
          <Flex direction={width < 1080 ? 'column' : 'row'}>
            <TextInput
              miw="12rem"
              disabled
              radius="md"
              p="md"
              label="Imię"
              value={data?.patientUserInfo.firstName || ''}
            />
            <TextInput
              miw="12rem"
              disabled
              radius="md"
              p="md"
              label="Nazwisko"
              value={data?.patientUserInfo.lastName || ''}
            />
            <DateInput
              miw="12rem"
              disabled
              radius="md"
              valueFormat="MM.DD.YYYY"
              p="md"
              label="Data urodzenia"
              value={dayjs(data?.patientUserInfo.birthdate).toDate() || ''}
            />
            <TextInput
              miw="12rem"
              disabled
              radius="md"
              p="md"
              label="PESEL"
              value={data?.patientUserInfo.pesel || ''}
            />
          </Flex>
          <Flex direction={width < 1080 ? 'column' : 'row'}>
            <TextInput
              miw="12rem"
              radius="md"
              p="md"
              label="Kod pocztowy"
              value={state.zipCode}
              onChange={(e) =>
                dispatch({ type: 'zipCode', payload: e.currentTarget.value })
              }
              disabled={isBlocked}
            />
            <TextInput
              miw="12rem"
              radius="md"
              p="md"
              label="Miasto"
              value={state.city}
              onChange={(e) =>
                dispatch({ type: 'city', payload: e.currentTarget.value })
              }
              disabled={isBlocked}
            />
            <TextInput
              miw="15rem"
              radius="md"
              p="md"
              w={width < 1080 ? '100%' : '50%'}
              label="Adres"
              value={state.street}
              onChange={(e) =>
                dispatch({ type: 'street', payload: e.currentTarget.value })
              }
              disabled={isBlocked}
            />
          </Flex>
          <Flex direction={width < 1080 ? 'column' : 'row'}>
            <TextInput
              miw="12rem"
              radius="md"
              p="md"
              label="Email"
              value={state.email}
              onChange={(e) =>
                dispatch({ type: 'email', payload: e.currentTarget.value })
              }
              disabled={isBlocked}
              // {...form.getInputProps('email')}
            />
            <TextInput
              miw="12rem"
              radius="md"
              p="md"
              label="Numer telefonu"
              value={state.phoneNumber}
              onChange={(e) =>
                dispatch({
                  type: 'phoneNumber',
                  payload: e.currentTarget.value,
                })
              }
              disabled={isBlocked}
              // {...form.getInputProps('phoneNumber')}
            />
          </Flex>
          <Flex direction={width < 1080 ? 'column' : 'row'}>
            <Flex direction="column" w={width < 1080 ? '100%' : '50%'} p="md">
              <Flex justify="space-between">
                <Text>Stosowane leki</Text>
                <ActionIcon
                  color="#fd7e14"
                  variant="light"
                  onClick={() => setOpenMedicines(true)}
                >
                  <IconPlus size="1rem" />
                </ActionIcon>
              </Flex>
              <Flex
                mt="xs"
                sx={(theme) => {
                  return {
                    borderRadius: theme.radius.md,
                    border: '2px #fd7e14 solid',
                  };
                }}
                p="md"
              ></Flex>
            </Flex>
            <Flex direction="column" w={width < 1080 ? '100%' : '50%'} p="md">
              <Flex justify="space-between">
                <Text>Alergie</Text>
                <ActionIcon
                  color="#fd7e14"
                  variant="light"
                  onClick={() => setOpenAllergy(true)}
                >
                  <IconPlus size="1rem" />
                </ActionIcon>
              </Flex>
              <Flex
                mt="xs"
                sx={(theme) => {
                  return {
                    borderRadius: theme.radius.md,
                    border: '2px #fd7e14 solid',
                  };
                }}
                p="md"
              ></Flex>
            </Flex>
          </Flex>
        </Skeleton>
      </Flex>
      <ModalMedicines opened={openMedicines} setOpen={setOpenMedicines} />
      <ModalAllergy opened={openAllergy} setOpen={setOpenAllergy} />
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
