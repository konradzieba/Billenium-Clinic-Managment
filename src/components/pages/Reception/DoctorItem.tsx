import { Avatar, Button, Flex, Text } from '@mantine/core';
import DocImg from '../Doctors/img/piotrek.jpg'

type Doc = {
  index : number
}
const DoctorItem = (
  props:Doc
) =>{

  return(
    <Flex
      p='md'
      w='100%'
      justify='space-between'
      align='center'
      sx={() => {
        return{
          backgroundColor: props.index % 2 == 0 ? '#f1f3f5' : ''
        }
      }
      }
    >
      <Flex
        align='center'
        direction='column'
      >
        <Avatar size='md' src={DocImg}/>
        <Text>Skorwyr</Text>
      </Flex>
      <Flex>
        <Text>Specjalizacja</Text>
      </Flex>
      <Button
        variant='outline'
      >
        Przejdź
      </Button>
    </Flex>
  )
}
export default DoctorItem