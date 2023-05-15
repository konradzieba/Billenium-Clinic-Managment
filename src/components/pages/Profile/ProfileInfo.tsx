import {
  ActionIcon,
  Button,
  Container,
  Flex,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { DateInput } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { signUpSchema as schema } from '../../../helpers/schemas';
import {IconPlus} from '@tabler/icons-react'
import { useState } from 'react';
import ModalMedicines from './ModalMedicines';
import ModalAllergy from './ModalAllergy';
// type DoctorListProps = {

// };

export const ProfileInfo = () => {
  const { width } = useViewportSize();
  const [openMedicines, setOpenMedicines] = useState(false);
  const [openAllergy, setOpenAllergy] = useState(false);
  const form = useForm({
    initialValues: {
      email: '',
      phoneNumber: '',
    },
    validate: zodResolver(schema),
  });
  return (
    <Container
      p='md'
      miw={'22rem'}
    >
      <Flex
        sx={(theme) => {return {
              borderRadius:theme.radius.md,
              border:'3px #fd7e14 solid'
        }
        }}
        direction='column'
      >
        <Title color='#fd7e14' align={'center'}>
          Profil pacjenta
        </Title>
        <Flex
        m='md'
        justify={'space-between'}
        >
          <Text>Dane Osobowe</Text>
          <Button variant={'outline'}> Edytuj dane</Button>
        </Flex>
        <Flex
          direction={width < 1080 ? 'column' : 'row'}
        >
          <TextInput
            miw='12rem'
            disabled
            radius='md'
            p='md'
            label='Imię'
          />
          <TextInput
            miw={'12rem'}
            disabled
            radius='md'
            p='md'
            label='Nazwisko'
          />
          <DateInput
            miw={'12rem'}
            disabled
            radius='md'
            valueFormat="DD.MM.YYYY"
            p='md'
            label='Data urodzenia'
          />
          <TextInput
            miw={'12rem'}
            disabled
            radius='md'
            p='md'
            label='PESEL'
          />
        </Flex>
        <Flex
          direction={width < 1080 ? 'column' : 'row'}
        >
          <TextInput
            miw={'12rem'}
            radius='md'
            p='md'
            label='Kod pocztowy'
          />
          <TextInput
            miw={'12rem'}
            radius='md'
            p='md'
            label='Miasto'
          />
          <TextInput
            miw={'15rem'}
            radius='md'
            p='md'
            w={width < 1080 ? '100%' : '50%'}
            label='Adres'
          />
        </Flex>
        <Flex
          direction={width < 1080 ? 'column' : 'row'}
        >
          <TextInput
            miw={'12rem'}
            radius='md'
            p='md'
            label='Email'
            {...form.getInputProps('email')}
          />
          <TextInput
            miw={'12rem'}
            radius='md'
            p='md'
            label='Numer telefonu'
            {...form.getInputProps('phoneNumber')}
          />
        </Flex>
        <Flex
          direction={width < 1080 ? 'column' : 'row'}
        >
          <Flex
            direction='column'
            w={width < 1080 ? '100%' : '50%'}
            p='md'
          >
            <Flex
              justify='space-between'
            >
              <Text>
                Stosowane leki
              </Text>
              <ActionIcon
                color='#fd7e14'
                variant='light'
                onClick={() => setOpenMedicines(true)}
              >
                <IconPlus size='1rem'/>
              </ActionIcon>
            </Flex>
            <Flex
              mt='xs'
              sx={(theme) => {return {
                borderRadius:theme.radius.md,
                border:'2px #fd7e14 solid'
              }
              }}
              p='md'
            >

            </Flex>
          </Flex>
          <Flex
            direction='column'
            w={width < 1080 ? '100%' : '50%'}
            p='md'
          >
            <Flex
              justify='space-between'
            >
              <Text>
                Alergie
              </Text>
              <ActionIcon
                color='#fd7e14'
                variant='light'
                onClick={() => setOpenAllergy(true)}
              >
                <IconPlus size='1rem'/>
              </ActionIcon>
            </Flex>
            <Flex
              mt='xs'
              sx={(theme) => {return {
                borderRadius:theme.radius.md,
                border:'2px #fd7e14 solid'
              }
              }}
              p='md'
            >

            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <ModalMedicines opened={openMedicines} setOpen={setOpenMedicines}/>
      <ModalAllergy opened={openAllergy} setOpen={setOpenAllergy}/>
    </Container>
  )
};
