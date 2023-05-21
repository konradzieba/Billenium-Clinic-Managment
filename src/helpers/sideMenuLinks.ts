import { IconBook, IconHome2, IconNotes, IconNurse } from '@tabler/icons-react';

export const NoLoginMenuLinks = [
  { icon: IconHome2, label: 'Strona główna', link: '/' },
  { icon: IconNurse, label: 'Specjaliści', link: '/specializations' },
];

export const PatientMenuLinks = [
  { icon: IconHome2, label: 'Strona główna', link: '/' },
  { icon: IconNurse, label: 'Specjaliści', link: '/specializations' },
  { icon: IconBook, label: 'Wizyty', link: '/visits' },
  { icon: IconNotes, label: 'Historia wizyt', link: '/history' },
];

export const DoctorMenuLinks = [
  { icon: IconHome2, label: 'Strona główna', link: '/' },
  { icon: IconBook, label: 'Wizyty na dany dzień', link: '/' },
  { icon: IconBook, label: 'Historia wizyt', link: '/' },
];

export const ReceptionistMenuLinks = [
  { icon: IconHome2, label: 'Strona główna', link: '/' },
  { icon: IconBook, label: 'Nadchodzące wizyty', link: '/' },
  { icon: IconBook, label: 'Wizyty na dany dzień', link: '/' },
  { icon: IconBook, label: 'Historia wizyt', link: '/' },
];
