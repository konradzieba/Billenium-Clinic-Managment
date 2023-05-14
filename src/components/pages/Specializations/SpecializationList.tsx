import {Flex, Group } from '@mantine/core';
import { SpecializationCard } from './SpecializationCard';
import inter from './img/inter.jpg'
import gast from './img/gastrolog.jpg'
import okul from './img/okul.jpg'
import pulm from './img/pulm.jpg'

// type SpecializationListProps = {

// };

const specializations = [
    {
      image: inter,
      link: '/specializations/internists',
      title:'Internista',
      description: 'Lekarz internista zajmuje się diagnozowaniem, leczeniem oraz profilaktyką chorób dorosłych pacjentów. Ma specjalistyczną wiedzę na temat chorób układu krążenia, cukrzycy, chorób tarczycy, chorób układu oddechowego oraz chorób trawienia.'
    },
    {
    image: gast,
    link: '/doctors',
    title:'Gastrolog',
    description: 'Lekarz gastrolog zajmuje się diagnostyką, leczeniem i zapobieganiem chorobom układu pokarmowego, takim jak choroby jelit, wątroby, trzustki czy żołądka. Specjalista ten może również wykonywać badania endoskopowe, takie jak gastroskopia.'
    },
    {
      image: okul,
      link: '/doctors',
      title:'Okulista',
      description: 'Lekarz okulista zajmuje się diagnozowaniem i leczeniem chorób oczu oraz zaburzeń widzenia. Wykonuje badania okulistyczne, przepisuje okulary lub soczewki kontaktowe oraz prowadzi terapię chorób oczu i przygotowuje do operacji oka.'
    },
    {
      image: pulm,
      link: '/doctors',
      title:'Pulmonolog ',
      description: 'Lekarz pulmonolog zajmuje się diagnozowaniem i leczeniem chorób układu oddechowego, takich jak astma, przewlekła obturacyjna choroba płuc (POChP), zapalenie płuc, czy też choroby dróg oddechowych spowodowane paleniem tytoniu.'
    },
    ]



export const SpecializationList = () => {

  return (
    <Flex
      w={'100%'}
    >
      <Group
        w={'100%'}
        position={'center'}
      >
        {specializations.map((spec) => {
          return(
            <SpecializationCard
              key={spec.title}
              image={spec.image}
              link={spec.link}
              title={spec.title}
              description={spec.description}
          />
          )
        })}
      </Group>
    </Flex>
  );
};
