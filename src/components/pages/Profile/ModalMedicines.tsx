import { Autocomplete, Button, Flex, Modal, Select } from '@mantine/core';
import { Dispatch, useState } from 'react';

type ModalMedicinesProps = {
  opened: boolean;
  setOpen: Dispatch<boolean>;
};

const leki = [
  'Paracetamol',
  'Ibuprofen',
  'Aspiryna',
  'Ketonal',
  'Apap',
  'Nurofen',
  'Nasivin',
  'Gripex',
  'Lekadol',
  'Fervex',
  'Vicks',
  'Claritine',
  'Nalgesin',
  'Strepsils',
  'Sinupret',
  'Septolete',
  'Mucosolvan',
  'Coldrex',
  'Rutinoscorbin',
  'Doppelherz',
];

const autoCompleteRegex = new RegExp(/^\d+$/);
const dawki_lekow = ['mg', 'g', 'ug', 'ng', 'szt.'];
const ModalMedicines = (props: ModalMedicinesProps) => {
  const [data, setData] = useState(leki);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [value, setValue] = useState('');
  const dawki =
    value.trim().length > 0 && value.match(autoCompleteRegex)
      ? dawki_lekow.map((provider) => `${value} ${provider}`)
      : [];
  return (
    <Modal
      radius="md"
      opened={props.opened}
      onClose={() => props.setOpen(false)}
      title="Dodaj lekarstwo"
      size="md"
      zIndex={9999}
    >
      <Flex h={open || open2 ? '200px' : '80px'}>
        <Flex gap="sm">
          <Select
            onDropdownOpen={() => setOpen(true)}
            onDropdownClose={() => setOpen(false)}
            w="80%"
            data={data}
            label="Wpisz swoje lekarstwa"
            placeholder="Nazwa lekarstwa"
            searchable
            getCreateLabel={(query) => `+ Dodaj ${query}`}
            onCreate={(query) => {
              const item = query;
              setData((current) => [...current, item]);
              return item;
            }}
            creatable
            maxDropdownHeight={120}
          />
          <Autocomplete
            onDropdownOpen={() => setOpen2(true)}
            onDropdownClose={() => setOpen2(false)}
            w="30%"
            data={dawki}
            value={value}
            onChange={setValue}
            label="Dawka"
            placeholder="Dawka"
            maxDropdownHeight={120}
          />
        </Flex>
      </Flex>
      <Button mt="md" variant="outline">
        Dodaj lekarstwo
      </Button>
    </Modal>
  );
};

export default ModalMedicines;
