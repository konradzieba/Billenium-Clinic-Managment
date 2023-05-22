import { Button, Flex, Select, Textarea, TextInput, Title } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';


const wizyta = {
  appointmentId:2,
  patientName:'Jarosław Donald',
  doctorName:'Paweł Skowyr',
  appointmentDate:'2023-06-04',
  patientSymptoms:'Bolące plecy, mrówienie stup, kaszel, nieustanne zmęczenie',
  medicinesTaken:'Ibuprofen',
  appointmentStatus:'APPROVED',
  doctorRecommendations:'Jakiś lek 3 x dziennie, drugi lek raz dziennie, oszczędzanie się przy wysiłku',
  createdAt:'2023-04-04',
  modifiedAt:'2023-04-06'
}
const appointmentState= [
  "Oczekująca",
  "Zatwierdzona",
  "Anulowana",
  "Zakończona",
  "Wznowiona"

]
type editAppointment= {
  role:string
}
const EditAppointment = (props:editAppointment) => {
  const {width} = useViewportSize()

  return(
    <Flex
      p='md'
      w='100%'
      justify='center'
    >
      <Flex

        w={width < 1080 ? '100%' : '50rem'}
        direction='column'
        p='md'
        h='fit-content'
        gap='md'
        sx={(theme) => {
          return {
            borderRadius: theme.radius.md,
            border: '3px #fd7e14 solid',
          };
        }}
      >
        <Title
          fw={700}
          align='center'
        >
          Wizyta nr {wizyta.appointmentId}
        </Title>
        <Flex
          w='100%'
          justify='space-between'
          direction={width < 1080 ? 'column' : 'row'}
        >
          <TextInput
            w={width < 1080 ? '100%' : '30%'}
            label={"Pacjent"}
            disabled
            value={wizyta.patientName}
          />
          <TextInput
            w={width < 1080 ? '100%' : '30%'}
            label={"Doktor"}
            disabled
            value={wizyta.doctorName}
          />
          <TextInput
            w={width < 1080 ? '100%' : '30%'}
            label={"Data wizyty"}
            disabled
            value={wizyta.appointmentDate}
          />
        </Flex>
        <Flex
          w='100%'
          justify='space-around'
          gap='md'
          direction={width < 1080 ? 'column' : 'row'}
        >
          <Textarea
            w={width < 1080 ? '100%' : '50%'}
            label={"Objawy pacjenta"}
            disabled
            value={wizyta.patientSymptoms}
          />
          <Textarea
            w={width < 1080 ? '100%' : '50%'}
            label={"Stosowane leki"}
            disabled
            value={wizyta.medicinesTaken}
          />
        </Flex>
        <Flex
          w='100%'
          justify='space-around'
        >
          <Textarea
            w='100%'
            disabled={props.role != 'doctor'}
            label={"Diagnoza"}
            value={''}
          />
        </Flex>
        <Flex
          w='100%'
          justify='space-around'
        >
          <Textarea
            w='100%'
            disabled={props.role != 'doctor'}
            label={"Zalecenia lekarza"}
            value={wizyta.doctorRecommendations}
          />
        </Flex>
        <Flex
          justify='end'
          align='end'
          gap='md'
        >
          <Select
            disabled={props.role !== 'doctor' && props.role !== 'receptionist'}
            label={"Status"}
            data={appointmentState}
          />
          <Button>Zapisz</Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
export default EditAppointment