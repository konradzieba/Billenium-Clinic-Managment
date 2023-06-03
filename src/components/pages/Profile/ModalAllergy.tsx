import { Button, Flex, Modal, Select } from '@mantine/core';
import { Dispatch, useState } from 'react';

type ModalAllergyProps = {
  opened: boolean;
  saveFunction: (allergy: string | null) => void;
  setOpen: Dispatch<boolean>;
};

const alergie = [
  { value: 'kurz', label: 'kurz' },
  { value: 'pyłki', label: 'pyłki' },
  { value: 'sierść', label: 'sierść' },
  { value: 'roztocza', label: 'roztocza' },
  { value: 'plesń', label: 'plesń' },
  { value: 'słonecznik', label: 'słonecznik' },
  { value: 'orzechy', label: 'orzechy' },
  { value: 'ryby', label: 'ryby' },
  { value: 'mleko', label: 'mleko' },
  { value: 'jaja', label: 'jaja' },
  { value: 'pszenica', label: 'pszenica' },
  { value: 'soja', label: 'soja' },
  { value: 'seler', label: 'seler' },
  { value: 'gorczyca', label: 'gorczyca' },
  { value: 'sezam', label: 'sezam' },
];

const ModalAllergy = (props: ModalAllergyProps) => {
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [data, setData] = useState(alergie);
  const [allergy, setAllergy] = useState<string | null>('');
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
        <Select
          onDropdownOpen={() => setDropdownOpened(true)}
          onDropdownClose={() => setDropdownOpened(false)}
          w="100%"
          data={data}
          label="Wpisz swoje alregie"
          placeholder="Nazwa alergii"
          getCreateLabel={(query) => `+ Dodaj ${query}`}
          onCreate={(query) => {
            const item = query;
            setData((current) => [...current, { value: item, label: item }]);
            return item;
          }}
          searchable
          onChange={setAllergy}
          creatable
          maxDropdownHeight={120}
        />
        <Button mt="md" variant="outline" onClick={() => props.saveFunction(allergy)}>
          Dodaj alergię
        </Button>
      </Flex>
    </Modal>
  );
};

export default ModalAllergy;
