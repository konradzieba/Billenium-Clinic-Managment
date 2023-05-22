import { Flex, ScrollArea, Text, Title } from '@mantine/core';
import { FlexibleAccordion } from '../../UI/FlexibleAccordion';
import UserSearch from './UserSearch';
import DoctorItem from './DoctorItem';
import { useViewportSize } from '@mantine/hooks';

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
const ReceptionMain = () => {
  const {width} = useViewportSize()
  const BrakPoint = 1080;
  return(
    <Flex
      justify='space-around'
      w='100%'
      p='md'
      gap={width < BrakPoint ? 25 : 0 }
      direction={width < BrakPoint ? 'column' : 'row'}
      miw={width < BrakPoint ? '' : '1080px'}
    >
        <Flex
          w={width < BrakPoint ? '100%' : '25rem' }
          direction='column'
          gap={width < BrakPoint ? 25: 0 }
          justify='space-around'
          mah='95vh'
        >
              <Flex
                h='10rem'
                miw={width < BrakPoint ? '100%' : '15rem' }
                sx={(theme) => {
                  return {
                    borderRadius: theme.radius.md,
                    border: '3px #fd7e14 solid',
                  };
                }}>
                    <UserSearch/>
              </Flex>
          <Flex
            h='30rem'
            miw={width < BrakPoint ? '100%' : '15rem' }
            direction='column'
            sx={(theme) => {
              return {
                borderRadius: theme.radius.md,
                border: '3px #fd7e14 solid',
              };
            }}>
            <DoctorItem
              index={0}
            />
            <DoctorItem
              index={1}
            />
            <DoctorItem
              index={2}
            />
            <DoctorItem
              index={3}
            />
            <DoctorItem
              index={4}
            />

          </Flex>
        </Flex>
        <Flex
          miw={width < BrakPoint ? '100%' : '30rem' }
          w={width < BrakPoint ? '100%' : '50rem' }
          h='95vh'
          justify='start'
          direction='column'
          sx={(theme) => {
            return {
              borderRadius: theme.radius.md,
              border: '3px #fd7e14 solid',
            };
         }}>
              <Title align={'center'} p='md'>Oczekujące rezerwacje</Title>
                <ScrollArea
                  offsetScrollbars
                  type='always'
                >
                  <Flex
                    w='100%'
                    justify='center'
                  >
                    <FlexibleAccordion
                      dataList={wizyty}
                      firstTableTitle={'Stosowane leki:'}
                      secondTableTitle={'Objawy:'}
                      isWithStatus={true}
                      withButtons={true}
                    />
                  </Flex>
              </ScrollArea>
        </Flex>
        <Flex
          miw={width < BrakPoint ? '100%' : '25rem' }
          w='25rem'
          h='95vh'
          direction='column'
          sx={(theme) => {
            return {
              borderRadius: theme.radius.md,
              border: '3px #fd7e14 solid',
            };
          }}
        >
            <Text p='md' fw={700} align='center'>
              Dzisiejsze wizyty
            </Text>
          <ScrollArea
            offsetScrollbars
            type='always'
          >
            <Flex
              w='100%'
              justify='center'
            >
              <FlexibleAccordion
                dataList={wizyty}
                firstTableTitle={'Stosowane leki:'}
                secondTableTitle={'Objawy:'}
                isWithStatus={true}
              />
            </Flex>
          </ScrollArea>
        </Flex>
    </Flex>
  )
}

export default ReceptionMain