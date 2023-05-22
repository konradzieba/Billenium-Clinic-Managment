import 'dayjs/locale/pl';

import { Container, MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navigate, Route, Routes } from 'react-router-dom';

import Calendar from './components/pages/Appointment/Calendar';
import Layout from './components/pages/Appointment/Layout';
import SymptomsMeds from './components/pages/Appointment/SymptomsMeds';
import ForgotPassword from './components/pages/Auth/ForgotPassword';
import SignIn from './components/pages/Auth/SignIn';
import SignUp from './components/pages/Auth/SignUp';
import { DoctorList } from './components/pages/Doctors/DoctorsList';
import { History } from './components/pages/History/History';
import { Home } from './components/pages/Home/Home';
import { ProfileInfo } from './components/pages/Profile/ProfileInfo';
import { SpecializationList } from './components/pages/Specializations/SpecializationList';
import { VisitsList } from './components/pages/Visits/VisitsList';
import { SideMenu } from './components/UI/SideMenu';
import { DoctorsSpeciality } from './helpers/enums';
import ReceptionMain from './components/pages/Reception/ReceptionMain';
import EditAppointment from './components/pages/Appointment/EditAppointment';

const queryClient = new QueryClient();

const App = () => {
  return (
    <MantineProvider
      theme={{
        colorScheme: 'light',
        primaryColor: 'orange',
        fontFamily: 'Lato',
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <DatesProvider settings={{ locale: 'pl' }}>
        <QueryClientProvider client={queryClient}>
          <Container
            px={0}
            mx={0}
            display="flex"
            maw="100%"
            style={{ position: 'relative' }}
          >
            <SideMenu />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/specializations" element={<SpecializationList />} />
              <Route
                path={`/specializations/${DoctorsSpeciality.INTERNIST}`}
                element={
                  <DoctorList specialization={DoctorsSpeciality.INTERNIST} />
                }
              />
              <Route
                path={`/specializations/${DoctorsSpeciality.GASTROENTEROLOGIST}`}
                element={
                  <DoctorList
                    specialization={DoctorsSpeciality.GASTROENTEROLOGIST}
                  />
                }
              />
              <Route
                path={`/specializations/${DoctorsSpeciality.OPHTHALMOLOGIST}`}
                element={
                  <DoctorList
                    specialization={DoctorsSpeciality.OPHTHALMOLOGIST}
                  />
                }
              />
              <Route
                path={`specializations/${DoctorsSpeciality.PULMONOLOGIST}`}
                element={
                  <DoctorList
                    specialization={DoctorsSpeciality.PULMONOLOGIST}
                  />
                }
              />
              <Route
                path={`/specializations/${DoctorsSpeciality.INTERNIST}/appointment`}
                element={<Layout />}
              >
                <Route path="calendar/:id" element={<Calendar />} />
                <Route path="symptoms-meds/:id" element={<SymptomsMeds />} />
              </Route>
              <Route
                path={`/specializations/${DoctorsSpeciality.GASTROENTEROLOGIST}/appointment`}
                element={<Layout />}
              >
                <Route path="calendar/:id" element={<Calendar />} />
                <Route path="symptoms-meds/:id" element={<SymptomsMeds />} />
              </Route>
              <Route
                path={`/specializations/${DoctorsSpeciality.OPHTHALMOLOGIST}/appointment`}
                element={<Layout />}
              >
                <Route path="calendar/:id" element={<Calendar />} />
                <Route path="symptoms-meds/:id" element={<SymptomsMeds />} />
              </Route>
              <Route
                path={`/specializations/${DoctorsSpeciality.PULMONOLOGIST}/appointment`}
                element={<Layout />}
              >
                <Route path="calendar/:id" element={<Calendar />} />
                <Route path="symptoms-meds/:id" element={<SymptomsMeds />} />
              </Route>
              <Route path="/visits" element={<VisitsList />} />
              <Route path="/history" element={<History />} />
              <Route path="/profile" element={<ProfileInfo />} />
              <Route path="/reception" element={<ReceptionMain />} />
              <Route path="/editAppointment" element={<EditAppointment role={'receptionist'}/>} />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Container>
        </QueryClientProvider>
      </DatesProvider>
    </MantineProvider>
  );
};

export default App;
