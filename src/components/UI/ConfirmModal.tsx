import { Button, Center, Flex, Modal, Text } from '@mantine/core';
import { Dispatch } from 'react';

type ConfirmModal = {
  title: string;
  opened: boolean;
  setOpen: Dispatch<boolean>;
  acceptText?: string;
  cancelText?: string;
  isErrorModal?: boolean;
  appointmentId?: number | null;
  onAccept?: () => void;
  onApproveAppointment?: (id: number | null) => void;
};

const ConfirmModal = ({
  title,
  opened,
  setOpen,
  acceptText,
  cancelText,
  isErrorModal,
  appointmentId,
  onAccept,
  onApproveAppointment,
}: ConfirmModal) => {
  return (
    <Center>
      <Modal opened={opened} onClose={() => setOpen(false)} zIndex={9999}>
        <Flex direction="column">
          <Text align="center">{title}</Text>
          <Flex mt="xl" justify="space-evenly">
            {isErrorModal ? (
              <Button variant="filled" onClick={() => setOpen(false)}>
                Rozumiem
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  {cancelText || 'Anuluj'}
                </Button>
                {onApproveAppointment ? (
                  <Button
                    variant="filled"
                    onClick={() => {
                      appointmentId && onApproveAppointment(appointmentId);
                      setOpen(false);
                    }}
                  >
                    {acceptText || 'Zatwierdź'}
                  </Button>
                ) : (
                  <Button variant="filled" onClick={onAccept}>
                    {acceptText || 'Zatwierdź'}
                  </Button>
                )}
              </>
            )}
          </Flex>
        </Flex>
      </Modal>
    </Center>
  );
};

export default ConfirmModal;
