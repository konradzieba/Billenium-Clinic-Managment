import {
  ActionIcon,
  Button,
  Container,
  Flex,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { useViewportSize } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useState } from 'react';

import ConfirmModal from '../../../components/UI/ConfirmModal';
import { signUpSchema as schema } from '../../../helpers/schemas';
import ModalAllergy from './ModalAllergy';
import ModalMedicines from './ModalMedicines';
// type DoctorListProps = {

// };

export const ProfileInfo = () => {
  const { width } = useViewportSize();
  const [openMedicines, setOpenMedicines] = useState(false);
  const [openAllergy, setOpenAllergy] = useState(false);
  const [save, setSave] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const form = useForm({
    initialValues: {
      email: '',
      phoneNumber: '',
    },
    validate: zodResolver(schema),
  });
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
          {isEditing && (
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Edytuj dane
            </Button>
          )}
          {!isEditing && (
            <Flex gap="md">
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Anuluj
              </Button>
              <Button variant="filled" onClick={() => setSave(true)}>
                Zapisz
              </Button>
            </Flex>
          )}
        </Flex>
        <Flex direction={width < 1080 ? 'column' : 'row'}>
          <TextInput miw="12rem" disabled radius="md" p="md" label="Imię" />
          <TextInput miw="12rem" disabled radius="md" p="md" label="Nazwisko" />
          <DateInput
            miw="12rem"
            disabled
            radius="md"
            valueFormat="DD.MM.YYYY"
            p="md"
            label="Data urodzenia"
          />
          <TextInput miw="12rem" disabled radius="md" p="md" label="PESEL" />
        </Flex>
        <Flex direction={width < 1080 ? 'column' : 'row'}>
          <TextInput
            miw="12rem"
            radius="md"
            p="md"
            label="Kod pocztowy"
            disabled={isEditing}
          />
          <TextInput
            miw="12rem"
            radius="md"
            p="md"
            label="Miasto"
            disabled={isEditing}
          />
          <TextInput
            miw="15rem"
            radius="md"
            p="md"
            w={width < 1080 ? '100%' : '50%'}
            label="Adres"
            disabled={isEditing}
          />
        </Flex>
        <Flex direction={width < 1080 ? 'column' : 'row'}>
          <TextInput
            miw="12rem"
            radius="md"
            p="md"
            label="Email"
            disabled={isEditing}
            {...form.getInputProps('email')}
          />
          <TextInput
            miw="12rem"
            radius="md"
            p="md"
            label="Numer telefonu"
            disabled={isEditing}
            {...form.getInputProps('phoneNumber')}
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
      </Flex>
      <ModalMedicines opened={openMedicines} setOpen={setOpenMedicines} />
      <ModalAllergy opened={openAllergy} setOpen={setOpenAllergy} />
      <ConfirmModal
        title="Czy na pewno chcesz zmienić dane?"
        opened={save}
        setOpen={setSave}
        acceptText="Zapisz"
      />
    </Container>
  );
};
