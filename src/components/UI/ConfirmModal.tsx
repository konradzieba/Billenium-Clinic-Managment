import { Button, Center, Flex, Modal, Text } from '@mantine/core';
import { Dispatch } from 'react';

type ConfirmModal = {
  title: string;
  opened: boolean;
  setOpen: Dispatch<boolean>;
  acceptText?: string;
  cancelText?: string;
  isErrorModal?: boolean;
  isMessage?: boolean;
  messageFunction?: () => void;
  appointmentId?: number | null;
  onAccept?: () => void;
  locked?: boolean;
  onApproveAppointment?: (id: number | null) => void;
};

const ConfirmModal = ({
  title,
  opened,
  setOpen,
  acceptText,
  cancelText,
  isErrorModal,
  isMessage,
  messageFunction,
  appointmentId,
  locked,
  onAccept,
  onApproveAppointment,
}: ConfirmModal) => {
  const handleMessage = () => {
    if (isMessage && messageFunction) {
      messageFunction();
    }
    setOpen(false);
  };

  return (
    <Center>
      <Modal
        opened={opened}
        onClose={() => setOpen(false)}
        zIndex={9999}
        closeOnClickOutside={locked ? false : true}
        closeOnEscape={locked ? false : true}
        withCloseButton={locked ? false : true}
      >
        <Flex direction="column">
          <Text align="center">{title}</Text>
          <Flex mt="xl" justify="space-evenly">
            {isErrorModal ? (
              <Button variant="filled" onClick={handleMessage}>
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
