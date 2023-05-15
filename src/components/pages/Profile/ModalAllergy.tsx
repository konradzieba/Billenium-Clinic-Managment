import { Dispatch, useState } from 'react';
import { Modal, MultiSelect, Flex, Button } from '@mantine/core';

type ModalAllergyProps = {
  opened: boolean;
  setOpen: Dispatch<boolean>;
};
const alergie = [
  'powietrze',
  'woda',
  'mleko',
  'nabiał',
  'pomarańcza',
  'słońce',
  'zimny makaron',
  'masło',
  'szynka',
  'kartofle',
];

const ModalAllergy = (props: ModalAllergyProps) => {
  const [dropdownOpened, setDropdownOpened] = useState(false);
  return (
    <Modal
      radius="md"
      opened={props.opened}
      onClose={() => props.setOpen(false)}
      title="Dodaj alergię"
      zIndex={9999}
    >
      <Flex
        h={dropdownOpened ? '280px' : 'auto'}
        direction={'column'}
        align={'center'}
        justify={'space-between'}
      >
        <MultiSelect
          onDropdownOpen={() => setDropdownOpened(true)}
          onDropdownClose={() => setDropdownOpened(false)}
          w="100%"
          data={alergie}
          label="Wpisz swoje alregie"
          placeholder="Nazwa alergii"
          getCreateLabel={(query) => `+ Dodaj ${query}`}
          searchable
          creatable
          maxDropdownHeight={120}
        />
        <Button mt="md" variant="outline">
          Dodaj alergię
        </Button>
      </Flex>
    </Modal>
  );
};

export default ModalAllergy;
