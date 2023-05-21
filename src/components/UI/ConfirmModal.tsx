import { Button, Center, Flex, Modal, Text } from '@mantine/core';
import { Dispatch } from 'react';

type ConfirmModal = {
  title: string;
  opened: boolean;
  setOpen: Dispatch<boolean>;
  acceptText?: string;
  cancelText?: string;
  onAccept?: () => void;
};

const ConfirmModal = ({
  title,
  opened,
  setOpen,
  acceptText,
  cancelText,
  onAccept,
}: ConfirmModal) => {
  return (
    <Center>
      <Modal opened={opened} onClose={() => setOpen(false)} zIndex={9999}>
        <Flex direction="column">
          <Text align="center">{title}</Text>
          <Flex mt="xl" justify="space-evenly">
            <Button variant="outline" onClick={() => setOpen(false)}>
              {cancelText || 'Anuluj'}
            </Button>
            <Button variant="filled" onClick={onAccept}>{acceptText || 'Zatwierdź'}</Button>
          </Flex>
        </Flex>
      </Modal>
    </Center>
  );
};

export default ConfirmModal;
