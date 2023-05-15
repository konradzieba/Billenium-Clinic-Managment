import React from 'react';
import { Button, Flex, Modal, MultiSelect } from '@mantine/core';

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

const ModalMedicines = (props:ModalMedicinesProps) => {
  return(
    <Modal
      radius='md'
      opened={props.opened}
      onClose={() => props.setOpen(false)}
      title="Dodaj lekarstwo"
    >
      <Flex
        h='300px'
        direction={'column'}
        align={'center'}
        justify={'space-between'}
      >
        <MultiSelect
          w='100%'
          data={leki}
          label="Wpisz swoje lekarstwa"
          placeholder="Nazwa lekarstwa"
          searchable
          creatable
          nothingFound="Brak leku"
          maxDropdownHeight={200}
        />
        <Button mt='md' variant='outline'>Dodaj lekarstwo</Button>
      </Flex>
    </Modal>
  )
}

export default ModalMedicines