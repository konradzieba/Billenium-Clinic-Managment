import { Button, Flex, Text } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

type PatinetItemType = {
  isEmpty:boolean
  userInfoId?:number,
  firstName?:string,
  lastName?:string,
  email?:string,
  birthdate?:string,
  pesel?:string,
  phoneNumber?:string
}
const PacientItem = (props:PatinetItemType) =>{
  const {width} = useViewportSize()
  return(
    <Flex
      h={width < 1080 ? '10rem' : '4rem'}
      w='100%'
      bg={props.isEmpty ? '#e9ecef' : '#f1f3f5'}
      gap='md'
      p='md'
      sx={(theme) => {
        return{
          borderRadius:theme.radius.md
        }
      }}
      direction={width < 1080 ? 'column' : 'row'}
    >
      <Flex w={width < 1080 ? '100%' : '40%'}>
        <Text
          w='33%'
          align='center'
        >
          {props.isEmpty ? 'Imię' : props.firstName}
        </Text>
        <Text
          w='33%'
          align='center'
        >
          {props.isEmpty ? 'Nazwisko' : props.lastName}
        </Text>
        <Text
          w='33%'
          align='center'
        >
          {props.isEmpty ? 'PESEL' : props.pesel}
        </Text>
      </Flex>
      <Flex w={width < 1080 ? '100%' : '40%'}>
        <Text
          w='33%'
          align='center'
        >
          {props.isEmpty ? 'Telefon' : props.phoneNumber}
        </Text>
        <Text
          w='33%'
          align='center'
        >
          {props.isEmpty ? 'Data urodzenia' : props.birthdate}
        </Text>
        <Text
          w='33%'
          align='center'
        >
          {props.isEmpty ? 'Email' : props.email}
        </Text>
      </Flex>
      {!props.isEmpty && (
        <Button
         variant='outline'
        >
          Sprawdź historię
        </Button>
      )}

    </Flex>
  )
}
export default PacientItem