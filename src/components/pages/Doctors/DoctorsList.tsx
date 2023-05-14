
import Doctor from './Doctor';
import PiotrImg from './img/piotrek.jpg'
import { Flex, Title } from '@mantine/core';

// type DoctorListProps = {

// };

const Doctors = [
  {
    avatar:PiotrImg,
    name:'Piotr',
    lastName:'Śpiewak',
    description:'Piotr Śpiewak to doświadczony lekarz internista, który specjalizuje się w leczeniu chorób układu krążenia. Jego pacjenci chwalą go za empatyczne podejście oraz skuteczne leczenie. W wolnych chwilach uwielbia grać na gitarze i uprawiać turystykę górską.',

  },
  {
    avatar:PiotrImg,
    name:'Piotr',
    lastName:'Śpiewak',
    description:'Piotr Śpiewak to doświadczony lekarz internista, który specjalizuje się w leczeniu chorób układu krążenia. Jego pacjenci chwalą go za empatyczne podejście oraz skuteczne leczenie. W wolnych chwilach uwielbia grać na gitarze i uprawiać turystykę górską.',

  }
]

export const DoctorList = () => {
  return (
    <Flex
      maw='100%'
      direction={'column'}
      align={'center'}
      my={'80px'}
      mx={'auto'}
    >
      <Title align={'center'}> Wybierz interesującego Cię lekarza</Title>
        {Doctors.map((doc,index) => {
          return(
            <Doctor avatar={doc.avatar} name={doc.name} lastname={doc.lastName} description={doc.description} index={index}/>
          )
        })}
    </Flex>
  );
};
