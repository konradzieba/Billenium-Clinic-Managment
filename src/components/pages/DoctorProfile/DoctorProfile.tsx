import { Button, Flex, Select, Textarea, TextInput, Text } from '@mantine/core';
import PacientItem from './PacientItem';
import { useState } from 'react';
import { useViewportSize } from '@mantine/hooks';

const spec = [
  "Internista",
  "Gastrolog",
  "Okulista",
  "Pulmonolog"

]

const Patients = [
  {
    userInfoId:1,
    firstName:'Jan',
    lastName:'Paweł',
    email:'Jan@Paweł.pl',
    birthdate:'2000-04-02',
    pesel:'1234567890',
    phoneNumber:'987654321'
  },
  {
    userInfoId:2,
    firstName:'Krystian',
    lastName:'Janek',
    email:'Jan@Paweł.pl',
    birthdate:'2000-04-02',
    pesel:'1234567890',
    phoneNumber:'987654321'
  },
  {
    userInfoId:3,
    firstName:'Piotr',
    lastName:'Skowyrski',
    email:'Jan@Paweł.pl',
    birthdate:'2000-04-02',
    pesel:'1234567890',
    phoneNumber:'987654321'
  }

]

const DoctorProfile = () =>{
  const [isEditing, setIsEditing] = useState(false)
  const {width} = useViewportSize()

  const handleEditing = () =>{
    if(isEditing){
      setIsEditing(false)
    }else{
      setIsEditing(true)
    }
  }

  return(
        <Flex
          w='100%'
          p='md'
          justify='center'

        >
          <Flex
            direction='column'
            gap='md'
            w={width < 1080 ?'100%': '70rem'}
          >

            <Flex
              w='100%'
              direction={width < 1080 ? 'column' : 'row'}
              gap='md'
              justify={'center'}
              align='center'
            >
              <Flex
                direction='column'
                w='100%'
              >

                <Flex
                  w='100%'
                  gap='md'
                  direction={width < 1080 ? 'column' : 'row'}
                >
                    <Flex
                      gap='md'
                      w={width < 1080 ? '100%' : '50%'}
                    >
                      <TextInput
                        w='50%'
                        label={'Imię'}
                        disabled
                        value={'Jan'}
                      />
                      <TextInput
                        w='50%'
                        label={'Nazwisko'}
                        disabled
                        value={'Nowak'}
                      />
                  </Flex>
                  <Flex
                    w={width < 1080 ? '100%' : '50%'}
                    gap='md'
                  >
                    <Select
                      w='50%'
                      label={'Specjalizacja'}
                      disabled
                      placeholder={"Internista"}
                      data={spec}
                    />
                    <TextInput
                      w='50%'
                      label={'Telefon'}
                      disabled
                      value={'994231234'}
                    />
                  </Flex>
                </Flex>
                <Flex>
                  <Textarea
                    disabled
                    label='Opis'
                    w='100%'
                  />
                </Flex>
              </Flex>
              {!isEditing && (
                <Button
                  onClick={handleEditing}
                  variant='outline'
                >Edytuj
                </Button>
              )}
              {isEditing && (
                <Flex
                  direction={width < 1080 ? 'row' : 'column'}
                  gap='md'
                >
                <Button
                  onClick={handleEditing}
                  variant='outline'
                >Wróc
                </Button>
                <Button
                onClick={handleEditing}
                variant='filled'
                >
                  Zapisz
                </Button>
                </Flex>
              )}
          </Flex>

          <Flex justify='space-between'>
            <Text fw={700} w='100%'>
              Lista pacjentów
            </Text>
            <Flex
              gap='md'
            >
              <TextInput
                w='10rem'
                placeholder="Wpisz PESEL"
              />
              <Button variant='filled'>
                Szukaj
              </Button>
            </Flex>
          </Flex>
            <PacientItem isEmpty={true}/>
            {Patients.map((patient) => {
              return(
                <PacientItem
                  isEmpty={false}
                  userInfoId={patient.userInfoId}
                  firstName={patient.firstName}
                  lastName={patient.lastName}
                  email={patient.email}
                  birthdate={patient.birthdate}
                  pesel={patient.pesel}
                  phoneNumber={patient.phoneNumber}
                  />
              )
            })}
          </Flex>
        </Flex>
  )
}

export default DoctorProfile