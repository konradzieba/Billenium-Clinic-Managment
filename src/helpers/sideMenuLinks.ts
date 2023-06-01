import {
  IconArchive,
  IconAt,
  IconBook,
  IconDeviceDesktopAnalytics,
  IconHome2,
  IconNotes,
  IconNurse,
  IconUser,
} from '@tabler/icons-react';

export const NoLoginMenuLinks = [
  { icon: IconHome2, label: 'Strona główna', link: '/' },
  { icon: IconNurse, label: 'Specjaliści', link: '/specializations' },
  { icon: IconAt, label: 'O nas', link: '/' },
];

export const PatientMenuLinks = [
  { icon: IconHome2, label: 'Strona główna', link: '/' },
  { icon: IconNurse, label: 'Specjaliści', link: '/specializations' },
  { icon: IconAt, label: 'O nas', link: '/' },
  { icon: IconBook, label: 'Wizyty', link: '/visits' },
  { icon: IconNotes, label: 'Historia wizyt', link: '/history' },
];

export const DoctorMenuLinks = [
  { icon: IconHome2, label: 'Strona główna', link: '/' },
  { icon: IconAt, label: 'O nas', link: '/' },
  {
    icon: IconUser,
    label: 'Profil doktora',
    link: `/doctor-profile/${sessionStorage.getItem('doctorId')}`,
  },
  {
    icon: IconDeviceDesktopAnalytics,
    label: 'Panel recepcji',
    link: '/reception',
  },
  { icon: IconArchive, label: 'Archiwum', link: '/archives' },
];

export const ReceptionistMenuLinks = [
  { icon: IconHome2, label: 'Strona główna', link: '/' },
  { icon: IconAt, label: 'O nas', link: '/' },
  {
    icon: IconDeviceDesktopAnalytics,
    label: 'Profil recepcji',
    link: '/reception',
  },
  { icon: IconArchive, label: 'Archiwum', link: '/archives' },
];
