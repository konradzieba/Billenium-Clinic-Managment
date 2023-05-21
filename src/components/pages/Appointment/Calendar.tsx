
import { Center, Flex, Group } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

const mockHours = [
  {
    hour: '9',
    hours: [
      { hour: '9:00', isAvailable: true },
      { hour: '9:35', isAvailable: true },
    ],
  },
  {
    hour: '10',
    hours: [
      { hour: '10:10', isAvailable: true },
      { hour: '10:45', isAvailable: true },
    ],
  },
  {
    hour: '11',
    hours: [{ hour: '11:20', isAvailable: true }],
  },
  {
    hour: '12',
    hours: [
      { hour: '12:00', isAvailable: true },
      { hour: '12:35', isAvailable: true },
    ],
  },
  {
    hour: '13',
    hours: [
      { hour: '13:10', isAvailable: false },
      { hour: '13:45', isAvailable: false },
    ],
  },
  {
    hour: '14',
    hours: [{ hour: '14:40', isAvailable: true }],
  },
  {
    hour: '15',
    hours: [
      { hour: '15:15', isAvailable: true },
      { hour: '15:50', isAvailable: true },
    ],
  },
  {
    hour: '16',
    hours: [
      { hour: '16:25', isAvailable: true },
    ],
  },
  {
    hour: '17',
    hours: [{ hour: '17:00', isAvailable: true }],
  },
];

// Funkcja sprawdzająca, czy data jest sobotą lub niedzielą
function isWeekend(date: Dayjs): boolean {
  const dayOfWeek = date.day();
  return dayOfWeek === 6 || dayOfWeek === 0; // 6 - sobota, 0 - niedziela
}

const TimePicker = () => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  return (
    <Flex direction="column">
      {mockHours.map((hour) => (
        <Flex gap="md">
          <div>{hour.hour}</div>
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
  return (
    <Center w="100%">
      <Flex gap="xl">
        <Group position="center">
          <DatePicker
            excludeDate={(date) => isWeekend(dayjs(date))}
            size="xl"
            value={value}
            onChange={setValue}
            minDate={new Date()}
            allowDeselect
          />
        </Group>
        {value && <TimePicker />}
      </Flex>
    </Center>
  );
};

export default Calendar;