import {
  ActionIcon,
  Button,
  Container,
  Flex,
  Input,
  // NumberInput,
  Skeleton,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
// import { isEmail } from '@mantine/form';
import { useViewportSize } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ChangeEvent, useReducer, useState } from 'react';
import { IMaskInput } from 'react-imask';

import ConfirmModal from '../../../components/UI/ConfirmModal';
import { fetchUserInfo } from '../../../helpers/queries';
import {
  userProfileInitialValues,
  userProfileReducer,
} from '../../../helpers/reducers';
import { UserProfileInfoType } from '../../../helpers/types';
import ModalAllergy from './ModalAllergy';
import ModalMedicines from './ModalMedicines';

// import ReactInputMask from 'react-input-mask';
// type DoctorListProps = {

// };
const URL = 'http://localhost:8080/api/patients/';
const fetchUserData = () =>
  fetchUserInfo(URL, sessionStorage.getItem('patientId'));
const emailRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export const ProfileInfo = () => {
  const { width } = useViewportSize();
  const [openMedicines, setOpenMedicines] = useState(false);
  const [openAllergy, setOpenAllergy] = useState(false);
  const [save, setSave] = useState(false);
  const [isBlocked, setIsBlocked] = useState(true);
  const [inputError, setInputError] = useState({ email: '', phoneNumber: '' });
  const [state, dispatch] = useReducer(
    userProfileReducer,
    userProfileInitialValues
  );
  const { data, isLoading, refetch } = useQuery(
    [`patientInfo${sessionStorage.getItem('patientId')}`],
    fetchUserData,
    {
      onSuccess: (data) => {
        dispatch({ type: 'city', payload: data.addressResponseDTO.city });
        dispatch({ type: 'zipCode', payload: data.addressResponseDTO.zipCode });
        dispatch({ type: 'street', payload: data.addressResponseDTO.street });
        dispatch({ type: 'email', payload: data.patientUserInfo.email });
        dispatch({
          type: 'phoneNumber',
          payload: data.patientUserInfo.phoneNumber,
        });
      },
    }
  );
  
  const patchUserInfo = async () => {
    const response = await axios.patch(URL, {
      patientId: data!.patientId,
      userInfoUpdateDTO: {
        userInfoId: data!.patientUserInfo.userInfoId,
        phoneNumber: state.phoneNumber,
        email: state.email,
      },
      allergies: '',
      medicines: '',
      addressUpdateDTO: {
        addressId: data!.addressResponseDTO.addressId,
        city: state.city,
        zipCode: state.zipCode,
        street: state.street,
      },
    });
    return response.data as UserProfileInfoType;
  };
  const mutation = useMutation(patchUserInfo, {
    onSuccess: (data) => {
      refetch();
      console.log(data);
      dispatch({ type: 'reset' });
    },
  });

  const handleSave = () => {
    mutation.mutate();
    setSave(false);
    setIsBlocked(true);
  };

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
              <Button
                variant="filled"
                disabled={
                  inputError.email !== '' || inputError.phoneNumber !== ''
                    ? true
                    : false
                }
                onClick={() => setSave(true)}
              >
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
            <TextInput
              miw="12rem"
              disabled
              radius="md"
              p="md"
              label="Data urodzenia"
              value={data?.patientUserInfo.birthdate || ''}
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
            <Input.Wrapper miw="12rem" p="md" label="Kod pocztowy">
              <Input
                radius="md"
                component={IMaskInput}
                mask="00-000"
                value={state.zipCode}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  dispatch({ type: 'zipCode', payload: e.currentTarget.value })
                }
                disabled={isBlocked}
              />
            </Input.Wrapper>
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
              onBlur={() => {
                if (state.email.match(emailRegex) === null) {
                  setInputError({
                    ...inputError,
                    email: 'Niepoprawny adres email',
                  });
                }
              }}
              error={inputError.email !== '' ? inputError.email : false}
              label="Email"
              value={state.email}
              onChange={(e) => {
                setInputError({ ...inputError, email: '' });
                dispatch({ type: 'email', payload: e.currentTarget.value });
              }}
              disabled={isBlocked}
            />
            <Input.Wrapper
              miw="12rem"
              p="md"
              label="Numer telefonu"
              error={
                inputError.phoneNumber !== '' ? inputError.phoneNumber : false
              }
            >
              <Input
                radius="md"
                onBlur={() => {
                  if (state.phoneNumber.length !== 9) {
                    setInputError({
                      ...inputError,
                      phoneNumber: 'Numer telefonu musi mieć 9 cyfr',
                    });
                  }
                }}
                error={
                  inputError.phoneNumber !== '' ? inputError.phoneNumber : false
                }
                component={IMaskInput}
                mask="000000000"
                value={state.phoneNumber}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setInputError({ ...inputError, phoneNumber: '' });
                  dispatch({
                    type: 'phoneNumber',
                    payload: e.currentTarget.value,
                  });
                }}
                disabled={isBlocked}
              />
            </Input.Wrapper>
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
