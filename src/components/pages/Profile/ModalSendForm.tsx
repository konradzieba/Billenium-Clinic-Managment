import { Button, Center, Flex, Modal, Text } from '@mantine/core';
import { Dispatch } from 'react';

type ModalSendFormProps = {
  opened: boolean;
  setOpen: Dispatch<boolean>;
};

const ModalSendForm = (props: ModalSendFormProps) => {
  return (
    <Center>
      <Modal
        opened={props.opened}
        onClose={() => props.setOpen(false)}
        zIndex={9999}
      >
        <Flex direction="column">
          <Text align="center">Czy na pewno chcesz chcesz zmienić dane?</Text>
          <Flex mt="xl" justify="space-evenly">
            <Button variant="outline" onClick={() => props.setOpen(false)}>
              Anuluj
            </Button>
            <Button variant="filled">Zapisz</Button>
          </Flex>
        </Flex>
      </Modal>
    </Center>
  );
};

export default ModalSendForm;
