import { Accordion, Box, Button, Flex, List, Text } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { IconPointFilled } from '@tabler/icons-react';

import { AppointmentStatus } from '../../helpers/enums';
import { AppointmentResponseType } from '../../helpers/types';
type FlexibleAccordionProps = {
  dataList: AppointmentResponseType[];
  firstTableTitle: 'Leki:' | 'Stosowane leki:';
  secondTableTitle: 'Zalecenia:' | 'Objawy:';
  isWithStatus: boolean;
  withPatient?: boolean;
  descriptionTitle?: string;
  descriptionBody?: string;
  withButtons?: boolean;
  withEditButton?: boolean;
  directionColumn?: boolean;
  onAccept?: () => void;
  onDecline?: () => void;
  onEdit?: () => void;
};

const BREAKPOINT = 1080;

export const FlexibleAccordion = ({
  dataList,
  firstTableTitle,
  secondTableTitle,
  withButtons,
  onAccept,
  onDecline,
  descriptionTitle,
  descriptionBody,
  isWithStatus,
  withPatient,
  withEditButton,
  directionColumn,
  onEdit,
}: FlexibleAccordionProps) => {
  const { width } = useViewportSize();
  return (
    <Accordion
      variant="separated"
      radius="md"
      multiple
      w={width < BREAKPOINT ? '90%' : '80%'}
      miw='90%'
      styles={{
        item: {
          backgroundColor: '#fff',
          border: `1px solid #fd7e14`,
        },
      }}
    >
      {dataList.map((data) => (
        <Accordion.Item
          value={data.appointmentId.toString()}
          key={data.appointmentId}
          miw={withButtons ? '25rem' : '15rem'}
        >
          <Flex>
            <Accordion.Control>
              <Flex justify="space-between" align="center">
                <Flex direction="column">
                  <Text color="orange" fw="bold">
                    {data.appointmentDate.split(' ')[0]}
                  </Text>
                  <Text color="orange" fw="bold">
                    {data.appointmentDate.split(' ')[1]}
                  </Text>
                  <Text fw="bold">{`lek. ${data.doctorName}`}</Text>
                  {withPatient && (
                    <Text fw="bold">{`pac. ${data.patientName}`}</Text>
                  )}
                  {isWithStatus ? (
                    <Text>
                      <Text span fw="bold" mr={3}>
                        Status:
                      </Text>
                      {data.appointmentStatus === AppointmentStatus.NEW &&
                        'Oczekujący'}
                      {data.appointmentStatus === AppointmentStatus.APPROVED &&
                        'Zatwierdzony'}
                      {data.appointmentStatus === AppointmentStatus.CANCELED &&
                        'Odrzucony'}
                      {data.appointmentStatus ===
                        AppointmentStatus.RESCHEDULED && 'Przeniesiony'}
                      {data.appointmentStatus === AppointmentStatus.DONE &&
                        'Zakończony'}
                    </Text>
                  ) : (
                    <Text>
                      <Text span fw="bold" mr={3}>
                        {descriptionTitle || 'Tytuł:'}
                      </Text>
                      {descriptionBody || 'Opis'}
                    </Text>
                  )}
                </Flex>
              </Flex>
            </Accordion.Control>
            {withButtons && (
              <Flex justify="center" align="center" gap="xs" px="md">
                <Button size="xs" onClick={onAccept}>
                  Zakcpetuj
                </Button>
                <Button onClick={onDecline} variant="outline" size="xs">
                  Odrzuć
                </Button>
              </Flex>
            )}
            {withEditButton && (
              <Flex justify="center" align="center" gap="xs" px="md">
                <Button size="xs" variant="outline" onClick={onEdit}>
                  Edytuj
                </Button>
              </Flex>
            )}
          </Flex>
          <Accordion.Panel>
            <Flex px="md" direction={width < BREAKPOINT || directionColumn ? 'column' : 'row'}>
              <Box w={width < BREAKPOINT ? '100%' : '50%'}>
                <Text fw="bold">{firstTableTitle}</Text>
                <List
                  icon={
                    <IconPointFilled
                      size="1rem"
                      style={{
                        color: '#fd7e14',
                        textAlign: 'center',
                        marginTop: '0.25rem',
                      }}
                    />
                  }
                >
                  {data.medicinesTaken.split(', ').map((medicine, index) => (
                    <List.Item key={index}>{medicine}</List.Item>
                  ))}
                </List>
              </Box>
              <Box w={width < BREAKPOINT ? '100%' : '50%'}>
                <Text fw="bold">{secondTableTitle}</Text>
                <List
                  icon={
                    <IconPointFilled
                      size="1rem"
                      style={{
                        color: '#fd7e14',
                        textAlign: 'center',
                        marginTop: '0.25rem',
                      }}
                    />
                  }
                >
                  {data.appointmentStatus === AppointmentStatus.DONE
                    ? data.doctorRecommendations
                        .split(', ')
                        .map((recommendation, index) => (
                          <List.Item key={index}>{recommendation}</List.Item>
                        ))
                    : data.patientSymptoms
                        .split(', ')
                        .map((recommendation, index) => (
                          <List.Item key={index}>{recommendation}</List.Item>
                        ))}
                </List>
              </Box>
            </Flex>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
