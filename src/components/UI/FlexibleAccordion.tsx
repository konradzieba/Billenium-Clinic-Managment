import { Text, Box, Flex, List, Accordion } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { IconPointFilled } from '@tabler/icons-react';



type AppointmentsData = {
  id: string;
  doctorName: string;
  appointmentDate: string;
  patientSymptoms: string;
  medicinesTaken: string[];
  doctorRecommendations: string[];
};

type FlexibleAccordionProps = {
  dataList: AppointmentsData[];
  firstTableTitle: 'Leki:' | 'Stosowane leki:';
  secoundTableTitle: 'Zalecenia:' | 'Objawy:';
};

const BREAKPOINT = 700;

export const FlexibleAccordion = ({dataList, firstTableTitle, secoundTableTitle}: FlexibleAccordionProps) => {
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
        <Accordion.Item value={data.id}>
          <Accordion.Control>
            <Flex direction="column">
              <Text color="orange" fw="bold">
                {data.appointmentDate}
              </Text>
              <Text fw="bold">{`lek. ${data.doctorName}`}</Text>
              <Text>
                <Text span fw="bold" mr={3}>
                  Rozpoznanie:
                </Text>
                {data.patientSymptoms}
              </Text>
            </Flex>
          </Accordion.Control>
          <Accordion.Panel>
            <Flex
              px='xl'
              justify="space-between"
              direction={width < BREAKPOINT ? 'column' : 'row'}
            >
              <Box>
                <Text fw="bold">
                  {firstTableTitle}
                </Text>
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
                  {data.medicinesTaken.map((medicine) => (
                    <List.Item>{medicine}</List.Item>
                  ))}
                </List>
              </Box>
              <Box >
                <Text fw="bold">
                  {secoundTableTitle}
                </Text>
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
                  {data.doctorRecommendations.map((recommendation) => (
                    <List.Item>{recommendation}</List.Item>
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
