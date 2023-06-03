import { Autocomplete, Button, Flex, Modal, Select } from '@mantine/core';
import { Dispatch, useState } from 'react';

type ModalMedicinesProps = {
  opened: boolean;
  saveFunction: (medicine: string) => void;
  setOpen: Dispatch<boolean>;
};

const leki = [
  { value: 'Paracetamol', label: 'Paracetamol' },
  { value: 'Aspiryna', label: 'Aspiryna' },
  { value: 'Ketonal', label: 'Ketonal' },
  { value: 'Apap', label: 'Apap' },
  { value: 'Nurofen', label: 'Nurofen' },
  { value: 'Nasivin', label: 'Nasivin' },
  { value: 'Gripex', label: 'Gripex' },
  { value: 'Lekadol', label: 'Lekadol' },
  { value: 'Fervex', label: 'Fervex' },
  { value: 'Vicks', label: 'Vicks' },
  { value: 'Claritine', label: 'Claritine' },
  { value: 'Nalgesin', label: 'Nalgesin' },
  { value: 'Strepsils', label: 'Strepsils' },
  { value: 'Sinupret', label: 'Sinupret' },
  { value: 'Septolete', label: 'Septolete' },
  { value: 'Mucosolvan', label: 'Mucosolvan' },
  { value: 'Coldrex', label: 'Coldrex' },
  { value: 'Rutinoscorbin', label: 'Rutinoscorbin' },
  { value: 'Doppelherz', label: 'Doppelherz' },
];

const autoCompleteRegex = new RegExp(/^\d+$/);
const dawki_lekow = ['mg', 'g', 'ug', 'ng', 'szt.'];
const ModalMedicines = (props: ModalMedicinesProps) => {
  const [data, setData] = useState(leki);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [dose, setDose] = useState<string>('');
  const [medicine, setMedicine] = useState<string | null>(null);
  const dawki =
    dose.trim().length > 0 && dose.match(autoCompleteRegex)
      ? dawki_lekow.map((provider) => `${dose} ${provider}`)
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
            onChange={setMedicine}
            getCreateLabel={(query) => `+ Dodaj ${query}`}
            onCreate={(query) => {
              const item = query;
              setData((current) => [...current, { value: item, label: item }]);
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
            value={dose}
            onChange={setDose}
            label="Dawka"
            placeholder="Dawka"
            maxDropdownHeight={120}
          />
        </Flex>
      </Flex>
      <Flex justify={'center'}>
        <Button
          mt="md"
          variant="outline"
          onClick={() => {
            setDose('');
            props.saveFunction(`${medicine} ${dose}`);
          }}
        >
          Dodaj lekarstwo
        </Button>
      </Flex>
    </Modal>
  );
};

export default ModalMedicines;
