import React from 'react';
import { useState } from 'react';
import { Button, Flex, Modal, Select, Autocomplete } from '@mantine/core';

type ModalMedicinesProps = {
    opened:boolean;
    setOpen:React.Dispatch<boolean>;
}

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
  'Doppelherz'
];

const reg = new RegExp(/^\d+$/);
const dawki_lekow = ['mg', 'g', 'ug', 'ng', 'szt']
const ModalMedicines = (props:ModalMedicinesProps) => {
  const [data, setData] = useState(leki);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [value, setValue] = useState('');
  const dawki =
    value.trim().length > 0 && value.match(reg)
      ? dawki_lekow.map((provider) => `${value} ${provider}`)
      : [];
  return(
    <Modal
      radius='md'
      opened={props.opened}
      onClose={() => props.setOpen(false)}
      title="Dodaj lekarstwo"
      size='md'
    >
      <Flex
        h={open || open2 ? '200px' : '80px'}
      >
        <Flex>
        <Select
          onDropdownOpen={() => setOpen(true)}
          onDropdownClose={() => setOpen(false)}
          w='80%'
          data={data}
          label="Wpisz swoje lekarstwa"
          placeholder="Nazwa lekarstwa"
          searchable
          getCreateLabel={(query) => `+ Dodaj ${query}`}
          onCreate={(query) => {
            const item = query ;
            setData((current) => [...current, item]);
            return item;
          }}
          creatable
          nothingFound="Brak leku"
          maxDropdownHeight={120}
        />
        <Autocomplete
          onDropdownOpen={() => setOpen2(true)}
          onDropdownClose={() => setOpen2(false)}
          w='30%'
          data={dawki}
          value={value}
          onChange={setValue}
          label="Dawka"
          placeholder="Dawka"
          maxDropdownHeight={120}
        />
        </Flex>

      </Flex>
      <Button mt='md' variant='outline'>Dodaj lekarstwo</Button>
    </Modal>
  )
}

export default ModalMedicines