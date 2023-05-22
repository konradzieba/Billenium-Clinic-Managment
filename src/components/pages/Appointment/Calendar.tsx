import { Center, Flex, Group, Transition } from '@mantine/core';
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
};

type doctorBusyHoursType = {
  hour: string;
  hours: { hour: string; isAvailable: boolean }[];
};

const customSlide = {
  in: { right: '-13em', top: '50%' },
  out: { right: 0, top: '50%' },
  common: { zIndex: '-1', transform: 'translateY(-50%)' },
  transitionProperty: 'right, top',
};

function isWeekend(date: Dayjs): boolean {
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

const TimePicker = ({ appointmentDate, isFetchEnabled}: TimePickerTypes) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { doctorId } = useDoctorId();
  const { data } = useQuery(
    {
      queryKey: [`doctorBusyHours-${doctorId}`, appointmentDate],
      queryFn: () => fetchHours(appointmentDate, doctorId),
      enabled: isFetchEnabled
    },
  );
  return (
    <Flex h="auto" direction="column" fz="xl" p="md" justify="center">
      {data?.map((hour) => (
        <Flex gap="sm">
          <Box
            miw="0.75rem"
            pr="xs"
            style={{ borderRight: '3px  solid #fd7e14', zIndex: 9999 }}
          >
            {hour.hour}
          </Box>
          <Flex gap="md">
            {hour.hours.map((hour) => (
              <div style={!hour.isAvailable ? { color: 'lightgray' } : {}}>
                <div
                  style={
                    selectedTime === hour.hour
                      ? { border: '3px solid royalblue' }
                      : {}
                  }
                  onClick={() => hour.isAvailable && setSelectedTime(hour.hour)}
                >
                  {hour.hour}
                </div>
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
              <Box style={{ ...styles, position: 'absolute' }}>
                <TimePicker appointmentDate={appointmentDate} isFetchEnabled={isFetchEnabled}/>
              </Box>
            )}
          </Transition>
        </Group>
      </Flex>
    </Center>
  );
};

export default Calendar;
