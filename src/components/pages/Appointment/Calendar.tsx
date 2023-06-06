import {
  Center,
  Flex,
  Group,
  Text,
  Transition,
  UnstyledButton,
} from '@mantine/core';
import { Box } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

import { useDoctorId } from './Layout';

type TimePickerTypes = {
  appointmentDate: string;
  isFetchEnabled: boolean;
  value: Date | null;
};

type doctorBusyHoursType = {
  hour: string;
  hours: { hour: string; isAvailable: boolean }[];
};

const customSlide = {
  in: { right: '-13em', top: '50%' },
  out: { right: 0, top: '50%' },
  common: { zIndex: '100', transform: 'translateY(-50%)' },
  transitionProperty: 'right, top',
};

export function isWeekend(date: Dayjs): boolean {
  const dayOfWeek = date.day();
  return dayOfWeek === 6 || dayOfWeek === 0;
}

const URL = 'http://localhost:8080/api/appointments/busy_at?';

const fetchHours = async (date: string, doctorId: string) => {
  const response = await axios.get(
    `${URL}givenDate=${date}&doctorId=${doctorId}`
  );
  return response.data as doctorBusyHoursType[];
};

const TimePicker = ({
  appointmentDate,
  isFetchEnabled,
  value,
}: TimePickerTypes) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { doctorId } = useDoctorId();
  const { data } = useQuery({
    queryKey: [`doctorBusyHours-${doctorId}`, appointmentDate],
    queryFn: () => fetchHours(appointmentDate, doctorId),
    enabled: isFetchEnabled,
    refetchInterval: 20000,
  });
  const todaysDate = dayjs(new Date()).format('YYYY-MM-DD');
  const handleSetDateTime = (hour: { hour: string; isAvailable: boolean }) => {
    hour.isAvailable && setSelectedTime(hour.hour);
    sessionStorage.setItem(
      `appointmentDate${sessionStorage.getItem('patientId')}`,
      appointmentDate
    );
    sessionStorage.setItem(
      `appointmentTime${sessionStorage.getItem('patientId')}`,
      hour.hour
    );
  };
  return (
    <Flex h="auto" direction="column" fz="xl" p="md" justify="center">
      <Center py="sm">
        <Text display={value ? 'block' : 'none'}>Wybierz godzinę</Text>
      </Center>
      {data?.map((hour, index) => (
        <Flex gap="sm" key={`${hour.hour}-${index}`}>
          <Box
            miw="0.75rem"
            pr="xs"
            style={{ borderRight: '3px  solid #fd7e14', zIndex: 9999 }}
            p={3}
          >
            {hour.hour}
          </Box>
          <Flex gap="md">
            {hour.hours.map((hour, index) => (
              <div key={`${hour.hour}-${index}`}>
                <UnstyledButton
                  p={3}
                  fz="xl"
                  style={
                    selectedTime === hour.hour
                      ? {
                          backgroundColor: 'rgba(253, 126, 20, 0.6)',
                          borderRadius: '3px',
                        }
                      : !hour.isAvailable
                      ? { color: 'lightgray', cursor: 'default' }
                      : todaysDate === appointmentDate
                      ? hour.hour < dayjs().format('HH:mm')
                        ? { color: 'lightgray', cursor: 'default' }
                        : {}
                      : {}
                  }
                  onClick={() => {
                    handleSetDateTime(hour);
                  }}
                >
                  {hour.hour}
                </UnstyledButton>
              </div>
            ))}
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

const Calendar = () => {
  const [value, setValue] = useState<Date | null>(null);
  const appointmentDate = dayjs(value).format('YYYY-MM-DD').toString();
  const isFetchEnabled = value ? true : false;
  const timePickerKey = value ? 'timePickerVisible' : 'timePickerHidden';
  return (
    <Center w="100%">
      <Flex>
        <Group position="center" style={{ position: 'relative' }}>
          <DatePicker
            excludeDate={(date) => isWeekend(dayjs(date))}
            size="xl"
            value={value}
            onChange={setValue}
            minDate={new Date()}
            allowDeselect
            maxLevel="year"
            p="xl"
            style={{ zIndex: 999, backgroundColor: 'white' }}
          />
          <Transition
            mounted={value ? true : false}
            transition={customSlide}
            duration={300}
            timingFunction="ease"
          >
            {(styles) => (
              <Box
                style={{ ...styles, position: 'absolute' }}
                key={timePickerKey}
              >
                <TimePicker
                  value={value}
                  key={appointmentDate}
                  appointmentDate={appointmentDate}
                  isFetchEnabled={isFetchEnabled}
                />
              </Box>
            )}
          </Transition>
        </Group>
      </Flex>
    </Center>
  );
};

export default Calendar;
