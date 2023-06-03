import {
  IconArchive,
  IconBook,
  IconDeviceDesktopAnalytics,
  IconHome2,
  IconInfoCircle,
  IconNotes,
  IconNurse,
  IconUser,
} from '@tabler/icons-react';

export const NoLoginMenuLinks = [
  { icon: IconHome2, label: 'Strona główna', link: '/' },
  { icon: IconNurse, label: 'Specjaliści', link: '/specializations' },
  { icon: IconInfoCircle, label: 'O nas', link: '/about-us' },
];

export const PatientMenuLinks = [
  { icon: IconHome2, label: 'Strona główna', link: '/' },
  { icon: IconNurse, label: 'Specjaliści', link: '/specializations' },
  { icon: IconInfoCircle, label: 'O nas', link: '/about-us' },
  { icon: IconBook, label: 'Wizyty', link: '/visits' },
  { icon: IconNotes, label: 'Historia wizyt', link: '/history' },
];

export const DoctorMenuLinks = [
  { icon: IconHome2, label: 'Strona główna', link: '/' },
  {
    icon: IconDeviceDesktopAnalytics,
    label: 'Panel recepcji',
    link: '/reception',
  },
  {
    icon: IconUser,
    label: 'Profil doktora',
    link: `/doctor-profile/`,
  },
  { icon: IconArchive, label: 'Archiwum', link: '/archives' },
  { icon: IconInfoCircle, label: 'O nas', link: '/about-us' },
];

export const ReceptionistMenuLinks = [
  { icon: IconHome2, label: 'Strona główna', link: '/' },
  {
    icon: IconDeviceDesktopAnalytics,
    label: 'Profil recepcji',
    link: '/reception',
  },
  { icon: IconArchive, label: 'Archiwum', link: '/archives' },
  { icon: IconInfoCircle, label: 'O nas', link: '/about-us' },
];
