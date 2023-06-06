import { Button, Flex, Modal, Select } from '@mantine/core';
import { Dispatch, useState } from 'react';

type ModalAllergyProps = {
  opened: boolean;
  saveFunction: (allergy: string | null) => void;
  setOpen: Dispatch<boolean>;
};

const alergie = [
  { value: 'pyłki roślin', label: 'pyłki roślin' },
  { value: 'pleśń', label: 'pleśń' },
  { value: 'sierść zwierząt', label: 'sierść zwierząt' },
  {
    value: 'orzechy',
    label: 'orzechy',
  },
  { value: 'pyłki traw', label: 'pyłki traw' },
  { value: 'osy i pszczoły', label: 'osy i pszczoły' },
  {
    value: 'penicylina',
    label: 'penicylina',
  },
  { value: 'lateks', label: 'lateks' },
  { value: 'nikiel', label: 'nikiel' },
  {
    value: 'kurz domowy',
    label: 'kurz domowy',
  },
  { value: 'truskawki', label: 'truskawki' },
  { value: 'ryby', label: 'ryby' },
  {
    value: 'perfumy',
    label: 'perfumy',
  },
  { value: 'pszczeli jad', label: 'pszczeli jad' },
  { value: 'czekolada', label: 'czekolada' },
  {
    value: 'pomarańcze',
    label: 'pomarańcze',
  },
  {
    value: 'krewetki',
    label: 'krewetki',
  },
  { value: 'włosy koni', label: 'włosy koni' },
  { value: 'soja', label: 'soja' },
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
        <Button
          mt="md"
          variant="outline"
          onClick={() => props.saveFunction(allergy)}
        >
          Dodaj alergię
        </Button>
      </Flex>
    </Modal>
  );
};

export default ModalAllergy;
