import { Accordion, Box, Button, Flex, List, Text } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { IconPointFilled } from '@tabler/icons-react';

import { AppointmentResponseType } from '../../helpers/types';

type FlexibleAccordionProps = {
  dataList: AppointmentResponseType[];
  firstTableTitle: 'Leki:' | 'Stosowane leki:';
  secoundTableTitle: 'Zalecenia:' | 'Objawy:';
  isWithStatus: boolean;
  descriptionTitle?: string;
  descriptionBody?: string;
  withButtons?: boolean;
  onAccept?: () => void;
  onDecline?: () => void;
};

const BREAKPOINT = 700;

export const FlexibleAccordion = ({
  dataList,
  firstTableTitle,
  secoundTableTitle,
  withButtons,
  onAccept,
  onDecline,
  descriptionTitle,
  descriptionBody,
  isWithStatus,
}: FlexibleAccordionProps) => {
  const { width } = useViewportSize();
  return (
    <Accordion
      variant="separated"
      radius="md"
      multiple
      w={width < BREAKPOINT ? '90%' : '80%'} //tutaj responywność dodać
      styles={{
        item: {
          // styles added to all items
          backgroundColor: '#fff',
          border: `1px solid #fd7e14`,
        },
      }}
    >
      {dataList.map((data) => (
        <Accordion.Item
          value={data.appointmentId.toString()}
          key={data.appointmentId}
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
                  {isWithStatus ? (
                    <Text>
                      <Text span fw="bold" mr={3}>
                        Status:
                      </Text>
                      {data.appointmentStatus === 'NEW' && 'Oczekująca'}
                      {data.appointmentStatus === 'APPROVED' && 'Zatwierdzona'}
                      {data.appointmentDate === 'CANCELED' && 'Odrzucona'}
                      {data.appointmentDate === 'RESCHEDULED' && 'Przeniesiona'}
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
          </Flex>
          <Accordion.Panel>
            <Flex
              px="xl"
              justify="space-around"
              direction={width < BREAKPOINT ? 'column' : 'row'}
            >
              <Box>
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
              <Box>
                <Text fw="bold">{secoundTableTitle}</Text>
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
                  {data.patientSymptoms
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