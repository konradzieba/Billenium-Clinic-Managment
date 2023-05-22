import { Button, Flex, Text } from '@mantine/core';

type wizyta={
  appointmentId:number,
  patientName:string,
  doctorName:string,
  appointmentDate:string,
  patientSymptoms:string,
  medicinesTaken: string,
  appointmentStatus:string,
  index:number
}
const ReservationItem = (props:wizyta) => {
  console.log(props.index)
  return(
    <Flex
      w='100%'
      justify='space-between'
      align='center'
      gap='md'
      px='md'
      mt='md'
      sx={(theme) => {
        return {
          borderRadius: theme.radius.md,
          backgroundColor: props.index % 2 === 0 ? '#f1f3f5' : '#dee2e6'
        };
      }}>
      <Flex w='100%'
            px='md'
      justify='space-between'>
        <Flex
          direction='column'
          w='25%'
        >
          <Text>{props.patientName}</Text>
          <Text>Pesel</Text>
        </Flex>

        <Flex
          direction='column'
          w='50%'
          mah={'3rem'}
        >
          <Text align='justify' sx={{overflow:'hidden'}}>
            {props.patientSymptoms.length > 52 && props.patientSymptoms.slice(0,52) + "..."}
            {props.patientSymptoms.length <= 52 && props.patientSymptoms}
          </Text>
        </Flex>

        <Flex
          direction='column'
          w='20%'
        >
          <Text fw={700} >{props.doctorName}</Text>
          <Text>{props.appointmentDate}</Text>
        </Flex>

      </Flex>
      <Flex gap='md' justify='center'>
        <Button variant='outline'>Odrzuć</Button>
        <Button>Odrzuć</Button>
      </Flex>

    </Flex>
  )
}
export default ReservationItem