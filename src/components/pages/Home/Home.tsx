import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  rem,
  Text,
  Title,
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

import StudentMed from '../../../assets/StudentMed.svg';
import DoctorLImg from './img/doctor_l.png';
import DoctorRImg from './img/doctor_r.png';
// type HomeProps = {

// };
const HomeText =
  'Zaufaj StudentMed - nasza przychodnia to miejsce, w którym Twoje zdrowie jest dla nas najważniejsze! Oferujemy kompleksową opiekę medyczną dla studentów i innych pacjentów. Zawsze stawiamy na indywidualne podejście do każdego przypadku, dzięki czemu możesz mieć pewność, że otrzymasz najlepszą opiekę. Nasz zespół to wysoko wykwalifikowani lekarze i specjaliści, którzy zawsze są gotowi do pomocy. Skorzystaj z naszej oferty i umów się na wizytę już dziś!';

const FlexStyle = {
  borderRadius: rem(10),
  borderTop: '6px solid #fd7e14',
  borderBottom: '6px solid #fd7e14',
};

const BREAKPOINT = 1470;

export const Home = () => {
  const { width } = useViewportSize();
  return (
    <Center>
      <Flex w="80%" direction="column">
        <Flex align="center" justify="center" mt={50} mb={30}>
          <Image
            src={StudentMed}
            height={rem(78)}
            width={rem(78)}
            mr={rem(4)}
          />
          <Title fw="bold" fz={rem(64)}>
            tudentMed
          </Title>
        </Flex>

        <Flex
          align="center"
          gap={30}
          my={60}
          py="lg"
          style={FlexStyle}
          direction={width > BREAKPOINT ? 'row' : 'column'}
        >
          <Image
            src={DoctorLImg}
            width={rem(400)}
            radius="md"
            alt="Obraz doktora z założonymi rękoma"
          />
          <Box>
            <Text align="justify" fz="lg">
              {HomeText}
            </Text>
          </Box>
          <Image
            width={rem(400)}
            radius="md"
            src={DoctorRImg}
            alt="Obraz uśmiechniętego doktora z teczką"
          />
        </Flex>
        <Flex
          align="center"
          justify="center"
          mb={60}
          mt={width > BREAKPOINT ? 'xl' : 0}
        >
          <Button size="md" radius="md">
            Umów się na wizytę
          </Button>
        </Flex>
      </Flex>
    </Center>
  );
};
