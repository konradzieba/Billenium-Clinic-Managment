import { Button, Flex, Input, Text } from '@mantine/core';
import { ChangeEvent, useState } from 'react';
import { IMaskInput } from 'react-imask';
import { useNavigate } from 'react-router-dom';

import { PatientPESELListType } from '../../../helpers/types';
import ConfirmModal from '../../UI/ConfirmModal';
type UserSearchProps = {
  patientPESELList: PatientPESELListType[] | null;
};

const UserSearch = ({ patientPESELList }: UserSearchProps) => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const handleSearch = () => {
    const patient = patientPESELList?.find(
      (patient) => patient.pesel === searchValue
    );
    if (patient) {
      navigate(`/patient-profile-info/${patient.patientId}`);
    } else {
      setIsErrorModalOpen(true);
    }
  };
  return (
    <>
      <Flex
        w="100%"
        justify="start"
        direction="column"
        align="center"
        gap="md"
        p="md"
      >
        <Flex justify="center" align="center">
          <Text fw="bold" fz="md">
            Wyszukaj pacjenta
          </Text>
        </Flex>
        <Input.Wrapper w="20rem">
          <Input
            placeholder="Wpisz PESEL"
            value={searchValue}
            component={IMaskInput}
            mask="00000000000"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchValue(e.currentTarget.value)
            }
            sx={(theme) => {
              return {
                borderRadius: theme.radius.md,
              };
            }}
          />
        </Input.Wrapper>
        <Button variant="outline" w="10rem" onClick={handleSearch}>
          Szukaj
        </Button>
      </Flex>
      {isErrorModalOpen && (
        <ConfirmModal
          title="Pacjent o podanym numerze PESEL nie istnieje w bazie danych."
          opened={isErrorModalOpen}
          setOpen={setIsErrorModalOpen}
          acceptText="Rozumiem"
          isErrorModal
        />
      )}
    </>
  );
};
export default UserSearch;
