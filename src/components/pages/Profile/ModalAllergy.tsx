import React from 'react';
import { Modal, MultiSelect, Flex, Button } from '@mantine/core';

type ModalAllergyProps = {
    opened:boolean;
    setOpen:React.Dispatch<boolean>;
}
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
  'kartofle'
]

const ModalAllergy = (props:ModalAllergyProps) => {
  return(
    <Modal
      radius='md'
      opened={props.opened}
      onClose={() => props.setOpen(false)}
      title="Dodaj alergię"
    >
      <Flex
        h='300px'
        direction={'column'}
        align={'center'}
        justify={'space-between'}
      >
        <MultiSelect
          w='100%'
          data={alergie}
          label="Wpisz swoje alregie"
          placeholder="Nazwa alergii"
          getCreateLabel={(query) => `+ Dodaj ${query}`}
          searchable
          creatable
          maxDropdownHeight={200}
        />
        <Button mt='md' variant='outline'>Dodaj alergię</Button>
      </Flex>
    </Modal>
  )
}

export default ModalAllergy