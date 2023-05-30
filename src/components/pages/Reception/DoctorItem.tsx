import { Avatar, Button, Flex, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

type Doc = {
  index: number;
  lastName: string;
  doctorId: number;
  photo: string;
  specialization:
    | `OPHTHALMOLOGIST`
    | `INTERNIST`
    | `GASTROENTEROLOGIST`
    | `PULMONOLOGIST`;
};

const polishSpecialization = {
  OPHTHALMOLOGIST: 'Okulista',
  INTERNIST: 'Internista',
  GASTROENTEROLOGIST: 'Gastrolog',
  PULMONOLOGIST: 'Pulmonolog',
};

const DoctorItem = (props: Doc) => {
  const navigate = useNavigate();
  return (
    <Flex
      p="md"
      w="100%"
      justify="space-between"
      align="center"
      sx={() => {
        return {
          backgroundColor: props.index % 2 == 0 ? '#f1f3f5' : '',
        };
      }}
    >
      <Flex w='25%' align="center" direction="column">
        <Avatar size="md" src={props.photo} />
        <Text>{props.lastName}</Text>
      </Flex>
      <Flex>
        <Text>{polishSpecialization[`${props.specialization}`]}</Text>
      </Flex>
      <Button variant="outline" onClick={() => navigate(`/doctor-profile/${props.doctorId}`)}>Przejdź</Button>
    </Flex>
  );
};
export default DoctorItem;
