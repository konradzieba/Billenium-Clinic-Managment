import { Center, Flex, Text, Textarea } from '@mantine/core';
import { useState } from 'react';

const SymptomsMeds = () => {
  const [meds, setMeds] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const patientId = sessionStorage.getItem('patientId');

  const handleChangeMeds = (value: string) => {
    setMeds(value);
    sessionStorage.setItem(`meds${patientId}`, value);
  };

  const hangleChangeSymptoms = (value: string) => {
    setSymptoms(value);
    sessionStorage.setItem(`symptoms${patientId}`, value);
  };
  return (
    <>
      <Center w="100%">
        <Flex
          style={{ border: '2px solid #fd7e14', borderRadius: '5%' }}
          direction="column"
          align="center"
          gap="sm"
          py="xl"
          px="xl"
          justify="center"
        >
          <Text fz="lg" fw="bold">
            Objawy i stosowane leki
          </Text>
          <Textarea
            size="md"
            w="430px"
            h="143px"
            minRows={3}
            placeholder="Np. antybiotyki, syropy, maści..."
            label="Stosowane leki"
            description="Tutaj możesz podać stosowane leki"
            value={meds}
            onChange={(event) => {
              handleChangeMeds(event.currentTarget.value);
            }}
          />
          <Textarea
            size="md"
            w="430px"
            h="143px"
            minRows={3}
            placeholder="Np. katar, kaszel, osłabienie..."
            label="Objawy"
            description="Tutaj możesz podać swoje objawy"
            value={symptoms}
            onChange={(event) => {
              hangleChangeSymptoms(event.currentTarget.value);
            }}
          />
        </Flex>
      </Center>
    </>
  );
};

export default SymptomsMeds;
