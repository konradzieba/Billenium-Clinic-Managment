import { Button, Flex, Text } from '@mantine/core';

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

  return(
    <Flex
      h='4rem'
      w='100%'
      bg={props.isEmpty ? '#e9ecef' : '#f1f3f5'}
      gap='md'
      p='md'
      sx={(theme) => {
        return{
          borderRadius:theme.radius.md
        }
      }}
    >
      <Text
        w='13%'
        align='center'
      >
        {props.isEmpty ? 'Imię' : props.firstName}
      </Text>
      <Text
        w='13%'
        align='center'
      >
        {props.isEmpty ? 'Nazwisko' : props.lastName}
      </Text>
      <Text
        w='13%'
        align='center'
      >
        {props.isEmpty ? 'PESEL' : props.pesel}
      </Text>
      <Text
        w='13%'
        align='center'
      >
        {props.isEmpty ? 'Telefon' : props.phoneNumber}
      </Text>
      <Text
        w='13%'
        align='center'
      >
        {props.isEmpty ? 'Data urodzenia' : props.birthdate}
      </Text>
      <Text
        w='13%'
        align='center'
      >
        {props.isEmpty ? 'Email' : props.email}
      </Text>
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