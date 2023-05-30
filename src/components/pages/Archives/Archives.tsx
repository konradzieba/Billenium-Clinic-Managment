import { Button, Flex, ScrollArea, TextInput, Title } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { signUpSchema as schema } from '../../../helpers/schemas';
import { FlexibleAccordion } from '../../UI/FlexibleAccordion';
import { AppointmentResponseType } from '../../../helpers/types';

const wizyty=[
  {
    appointmentId:1,
    patientName:"Jan Paweł",
    doctorName:"Krystian Bąk",
    appointmentDate:'2023-07-04',
    patientSymptoms:'Mocny ból głowy z zawrotami, zwędzenie rąk.',
    medicinesTaken: 'Ibuprofen',
    appointmentStatus:'NEW',
    doctorRecommendations:'',
    createdAt:'2023-06-21',
    modifiedAt:'2023-06-21'
  },
  {
    appointmentId:2,
    patientName:"Karol Strzyk",
    doctorName:"Krystian Bąk",
    appointmentDate:'2023-07-04',
    patientSymptoms:'Mocny ból głowy z zawrotami, zwędzenie rąk.',
    medicinesTaken: 'Ibuprofen',
    appointmentStatus:'NEW',
    doctorRecommendations:'',
    createdAt:'2023-06-21',
    modifiedAt:'2023-06-21'
  },
  {
    appointmentId:3,
    patientName:"Michał Małysz",
    doctorName:"Krystian Bąk",
    appointmentDate:'2023-07-04',
    patientSymptoms:'Mocny ból głowy z zawrotami, zwędzenie rąk.',
    medicinesTaken: 'Ibuprofen',
    appointmentStatus:'NEW',
    doctorRecommendations:'',
    createdAt:'2023-06-21',
    modifiedAt:'2023-06-21'
  },
  {
    appointmentId:4,
    patientName:"Jan Paweł",
    doctorName:"Krystian Bąk",
    appointmentDate:'2023-07-04',
    patientSymptoms:'WWWWWWW WWWWWWWWWWWWWWWWWWW WWWWWWWW WWWWWWWW WWWWWWWWWWWWWWWWW',
    medicinesTaken: 'Ibuprofen',
    appointmentStatus:'NEW',
    doctorRecommendations:'',
    createdAt:'2023-06-21',
    modifiedAt:'2023-06-21'
  },
  {
    appointmentId:5,
    patientName:"Karol Strzyk",
    doctorName:"Krystian Bąk",
    appointmentDate:'2023-07-04',
    patientSymptoms:'Mocny ból głowy z zawrotami, zwędzenie rąk.',
    medicinesTaken: 'Ibuprofen',
    appointmentStatus:'NEW',
    doctorRecommendations:'',
    createdAt:'2023-06-21',
    modifiedAt:'2023-06-21'
  },
  {
    appointmentId:6,
    patientName:"Michał Małysz",
    doctorName:"Krystian Bąk",
    appointmentDate:'2023-07-04',
    patientSymptoms:'Mocny ból głowy z zawrotami, zwędzenie rąk. Jestem ciągle głodny i nie mogę tego wytzymać',
    medicinesTaken: 'Ibuprofen',
    appointmentStatus:'NEW',
    doctorRecommendations:'',
    createdAt:'2023-06-21',
    modifiedAt:'2023-06-21'
  },
  {
    appointmentId:4,
    patientName:"Jan Paweł",
    doctorName:"Krystian Bąk",
    appointmentDate:'2023-07-04',
    patientSymptoms:'WWWWWWW WWWWWWWWWWWWWWWWWWW WWWWWWWW WWWWWWWW WWWWWWWWWWWWWWWWW',
    medicinesTaken: 'Ibuprofen',
    appointmentStatus:'NEW',
    doctorRecommendations:'',
    createdAt:'2023-06-21',
    modifiedAt:'2023-06-21'
  },
  {
    appointmentId:5,
    patientName:"Karol Strzyk",
    doctorName:"Krystian Bąk",
    appointmentDate:'2023-07-04',
    patientSymptoms:'Mocny ból głowy z zawrotami, zwędzenie rąk.',
    medicinesTaken: 'Ibuprofen',
    appointmentStatus:'NEW',
    doctorRecommendations:'',
    createdAt:'2023-06-21',
    modifiedAt:'2023-06-21'
  },
  {
    appointmentId: 6,
    patientName: "Michał Małysz",
    doctorName: "Krystian Bąk",
    appointmentDate: '2023-07-04',
    patientSymptoms: 'Mocny ból głowy z zawrotami, zwędzenie rąk. Jestem ciągle głodny i nie mogę tego wytzymać',
    medicinesTaken: 'Ibuprofen',
    appointmentStatus: 'NEW',
    doctorRecommendations: '',
    createdAt: '2023-06-21',
    modifiedAt: '2023-06-21'
  }
]
const Archives = (appointments:AppointmentResponseType[]) => {
  const form = useForm({
    initialValues: {
      maxDate: new Date(),
      pesel: '',
    },
    validate: zodResolver(schema)
  });

  const filteredAppointments = appointments.map(appointment => {
    if(appointment.appointmentDate <= form.getInputProps('maxDate').value){
      return(
        appointment
      )
    }
    return []
  })


  return(
    <Flex
      w='100%'
      justify='center'
    >
      <Flex
        miw='50%'
        direction='column'
        align='center'
        gap='md'
      >
        <Flex
          w='100%'
          align='center'
          direction='column'
        >
          <Title>Archiwum</Title>
          <Flex
            w='100%'
            align='end'
            justify='space-between'
            gap='md'
          >
            <Flex gap='md'>
              <DateInput
                valueFormat={"YYYY-MM-DD"}
                label={'Do dnia'}
                {...form.getInputProps('maxDate')}
              />
              <TextInput
                label={"PESEL"}
                placeholder={"Wpisz nr PESEL"}
                 {...form.getInputProps('pesel')}
              />
            </Flex>
            <Button>Szukaj</Button>
          </Flex>
        </Flex>
        <ScrollArea
          mah='50rem'
          w='100%'
        >
          <Flex
            justify='center'
          >
            {filteredAppointments?.length !== 0 ? (
              <FlexibleAccordion
                dataList={filteredAppointments}
                firstTableTitle={'Stosowane leki:'}
                secondTableTitle={'Objawy:'}
                isWithStatus={false}
                withButtons={false}
                withEditButton={true}
              />
            ) : <Flex></Flex>}
          </Flex>
        </ScrollArea>
      </Flex>

    </Flex>
  )
}

export default Archives