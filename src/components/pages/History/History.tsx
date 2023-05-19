import { FlexibleAccordion } from '../../UI/FlexibleAccordion';
import { Container, Flex, Text } from '@mantine/core';

// type HistoryProps = {

// };

const appointment = [
  {
    id: '1',
    doctorName: 'Marek Szwabowicz',
    appointmentDate: '08.16.2022',
    patientSymptoms: 'losowe słowa żeby sporawdzić wielkość',
    medicinesTaken: ['lek1', 'lek2', 'lek3'],
    doctorRecommendations: ['cos1', 'cos2', 'cos3'],
  },
  {
    id: '2',
    doctorName: 'Marek Kowalski',
    appointmentDate: '10.16.2022',
    patientSymptoms: 'kolejne symptomy',
    medicinesTaken: ['lek12', 'lek22', 'lek32'],
    doctorRecommendations: ['cos12', 'cos22', 'cos32'],
  },
];

export const History = () => {
  return (
    <Container my={40} w="100%">
      <Flex direction="column" w="100%" align="center">
        <Text size="xl" fw={700} lts={1}>
          Historia wizyt
        </Text>
        <FlexibleAccordion
          dataList={appointment}
          firstTableTitle="Leki:"
          secoundTableTitle="Zalecenia:"
        />
      </Flex>
    </Container>
  );
};
