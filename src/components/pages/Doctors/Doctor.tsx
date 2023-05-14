import { Avatar, Button, Text, Flex } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
type DoctorProps = {
  avatar:string;
  name: string;
  lastname: string;
  description: string;
  index:number;
}


const Doctor = (props:DoctorProps) => {
  const { width } = useViewportSize();

  return(
    <Flex
      maw='80rem'
      justify='center'
      align='start'
      mt='4rem'
      p='md'
      sx={(theme) => {return {
        backgroundColor: props.index % 2 == 1 ? theme.colors.gray[1] : 'none',
        borderRadius:theme.radius.md,
      }
    }}
      direction={width < 1280 ? 'column':'row'}
    >
      <Flex
        w='100%'
        justify='center'
      >
        <Avatar
          radius='md'
          size='8rem'
          miw='8rem'
          mih='8rem'
          src={props.avatar}
          ml={'md'}
          mr={'md'}
        />
      </Flex>
      <Flex
        miw='70%'
        direction={'column'}
        align={'start'}
      >
        <Text fw='bold' align='start'>
          {props.name + " " + props.lastname}
        </Text>
      <Flex>
        <Text
          mt={'xs'}
          align={width < 1280 ? 'justify': 'center'}
        >
          {props.description}
        </Text>
      </Flex>
      </Flex>
      <Flex
        h={'100%'}
        w={'100%'}
        align={'center'}
        justify={'center'}
      >
        <Button
          mt= {width < 1280 ? 'md':'none'}
          variant='outline'
          ml={'md'}
          size={'md'}
        >
          Sprawdź terminy
        </Button>
    </Flex>
    </Flex>
  )
}
export default Doctor