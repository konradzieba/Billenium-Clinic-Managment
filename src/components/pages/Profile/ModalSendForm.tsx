import { Button, Flex, Modal, Text } from '@mantine/core';
import React from 'react';

type ModalSendFormProps = {
  opened:boolean;
  setOpen:React.Dispatch<boolean>;
}

const ModalSendForm = (props:ModalSendFormProps) => {

  return(
    <Modal opened={props.opened} onClose={() => props.setOpen(false)}>
      <Flex
        direction='column'
      >
        <Text
          align='center'
        >
          Czy na pewno chcesz chcesz zmienić dane?
        </Text>
        <Flex
          mt='md'
          justify='space-between'
        >
          <Button
            variant='outline'
            onClick={() => props.setOpen(false)}
          >
            Anuluj
          </Button>
          <Button
            variant='filled'
          >
            Zapisz
          </Button>
        </Flex>
      </Flex>
    </Modal>
  )
}

export default ModalSendForm