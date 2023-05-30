import { Button, Flex, Text,TextInput } from '@mantine/core';


const UserSearch = () =>{

  return(
    <Flex
      w='100%'
      justify='start'
      direction='column'
      align='center'
      gap='md'
      p='md'
    >
      <Flex
        justify='center'
        align='center'
      >
        <Text fw='bold' fz='md'>Wyszukaj pacjenta</Text>
      </Flex>
      <TextInput
        w='100%'
        placeholder={'Wpisz PESEL'}
        sx={(theme) => {
          return{
            borderRadius:theme.radius.md
          }
        }
        }

      />
      <Button
        variant='outline'
        w='10rem'
      >
        Szukaj
      </Button>
    </Flex>
  )
}
export default UserSearch