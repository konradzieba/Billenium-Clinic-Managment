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
  fullWidth?: boolean;
  isWithDiagnosis?: boolean;
  setApprovalAppointmentId?: (id: number) => void;
  onAccept?: (opened: boolean) => void;
  onDecline?: (appointmentId: number) => void;
  onEdit?: (appointmentId: number) => void;
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
  fullWidth,
  isWithDiagnosis,
  onEdit,
  setApprovalAppointmentId,
}: FlexibleAccordionProps) => {
  const { width } = useViewportSize();
  return (
    <Accordion
      variant="separated"
      radius="md"
      multiple
      w={fullWidth ? '100%' : width < BREAKPOINT ? '90%' : '80%'}
      miw="90%"
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
                        'Oczekująca'}
                      {data.appointmentStatus === AppointmentStatus.APPROVED &&
                        'Zatwierdzona'}
                      {data.appointmentStatus === AppointmentStatus.CANCELED &&
                        'Odrzucona'}
                      {data.appointmentStatus ===
                        AppointmentStatus.RESCHEDULED && 'Przeniesiony'}
                      {data.appointmentStatus === AppointmentStatus.DONE &&
                        'Zakończona'}
                      {data.appointmentStatus === AppointmentStatus.CONTROL &&
                        'Kontrola'}
                    </Text>
                  ) : (
                    <Text>
                      <Text span fw="bold" mr={3}>
                        {descriptionTitle || 'Tytuł:'}
                      </Text>
                      {descriptionBody || 'Opis'}
                    </Text>
                  )}
                  {isWithDiagnosis &&
                    data.appointmentStatus === AppointmentStatus.DONE && (
                      <Text>
                        <Text span fw="bold" mr={3}>
                          Diagnoza:
                        </Text>
                        {data.diagnosis || 'Brak diagnozy'}
                      </Text>
                    )}
                </Flex>
              </Flex>
            </Accordion.Control>
            {withButtons && (
              <Flex justify="center" align="center" gap="xs" px="md">
                <Button
                  size="xs"
                  onClick={() => {
                    if (onAccept && setApprovalAppointmentId) {
                      setApprovalAppointmentId(data.appointmentId);
                      onAccept(true);
                    }
                  }}
                >
                  Zaakcpetuj
                </Button>
                <Button
                  onClick={() => {
                    if (onDecline) {
                      onDecline(data.appointmentId);
                    }
                  }}
                  variant="outline"
                  size="xs"
                >
                  Odrzuć
                </Button>
              </Flex>
            )}
            {withEditButton && (
              <Flex justify="center" align="center" gap="xs" px="md">
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() => {
                    if (onEdit) {
                      onEdit(data.appointmentId);
                    }
                  }}
                >
                  Zakończ
                </Button>
              </Flex>
            )}
          </Flex>
          <Accordion.Panel>
            <Flex
              px="md"
              direction={
                width < BREAKPOINT || directionColumn ? 'column' : 'row'
              }
            >
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
                  {data.medicinesTaken &&
                    data.medicinesTaken
                      .split(', ')
                      .map((medicine, index) => (
                        <List.Item key={index}>{medicine}</List.Item>
                      ))}
                  {!data.medicinesTaken && (
                    <List.Item key={0}>Nie wprowadzono leków</List.Item>
                  )}
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
                  {data.patientSymptoms &&
                    data.patientSymptoms
                      .split(', ')
                      .map((recommendation, index) => (
                        <List.Item key={index}>{recommendation}</List.Item>
                      ))}
                  {!data.patientSymptoms && (
                    <List.Item key={0}>Nie wprowadzono objawów</List.Item>
                  )}
                </List>
              </Box>
              {isWithDiagnosis && data.appointmentStatus === AppointmentStatus.DONE && (
                <Box w={width < BREAKPOINT ? '100%' : '50%'}>
                  <Text fw="bold">Rekomendacje</Text>
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
                    {data.doctorRecommendations &&
                      data.doctorRecommendations
                        .split(', ')
                        .map((doctorRecommendations, index) => (
                          <List.Item key={index}>{doctorRecommendations}</List.Item>
                        ))}
                    {!data.doctorRecommendations && (
                      <List.Item key={0}>Nie wprowadzono rekomendacji</List.Item>
                    )}
                  </List>
                </Box>
              )}
            </Flex>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
