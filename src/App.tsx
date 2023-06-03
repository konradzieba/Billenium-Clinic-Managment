import 'dayjs/locale/pl';

import { Container, MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Navigate, Route, Routes } from 'react-router-dom';

import Calendar from './components/pages/Appointment/Calendar';
import EditAppointment from './components/pages/Appointment/EditAppointment';
import Layout from './components/pages/Appointment/Layout';
import SymptomsMeds from './components/pages/Appointment/SymptomsMeds';
import Archives from './components/pages/Archives/Archives';
import ForgotPassword from './components/pages/Auth/ForgotPassword';
import ProtectedRoute from './components/pages/Auth/ProtectedRoute';
import SignIn from './components/pages/Auth/SignIn';
import SignUp from './components/pages/Auth/SignUp';
import { DoctorProfile } from './components/pages/DoctorProfile/DoctorProfile';
import { DoctorList } from './components/pages/Doctors/DoctorsList';
import NotFound from './components/pages/ErrorPages/NotFound';
import Unauthorized from './components/pages/ErrorPages/Unauthorized';
import { History } from './components/pages/History/History';
import { Home } from './components/pages/Home/Home';
import { ProfileInfo } from './components/pages/Profile/ProfileInfo';
import ReceptionMain from './components/pages/Reception/ReceptionMain';
import { SpecializationList } from './components/pages/Specializations/SpecializationList';
import { VisitsList } from './components/pages/Visits/VisitsList';
import { SideMenu } from './components/UI/SideMenu';
import { DoctorsSpeciality } from './helpers/enums';
const queryClient = new QueryClient();

const App = () => {
  dayjs.locale('pl');
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
              {/* Pacient */}
              <Route
                path={`/specializations/${DoctorsSpeciality.INTERNIST}/appointment`}
                element={
                  <ProtectedRoute role="patient">
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route
                  path="calendar/:id"
                  element={
                    <ProtectedRoute role="patient">
                      <Calendar />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="symptoms-meds/:id"
                  element={
                    <ProtectedRoute role="patient">
                      <SymptomsMeds />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route
                path={`/specializations/${DoctorsSpeciality.GASTROENTEROLOGIST}/appointment`}
                element={
                  <ProtectedRoute role="patient">
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route
                  path="calendar/:id"
                  element={
                    <ProtectedRoute role="patient">
                      <Calendar />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="symptoms-meds/:id"
                  element={
                    <ProtectedRoute role="patient">
                      <SymptomsMeds />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route
                path={`/specializations/${DoctorsSpeciality.OPHTHALMOLOGIST}/appointment`}
                element={
                  <ProtectedRoute role="patient">
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route
                  path="calendar/:id"
                  element={
                    <ProtectedRoute role="patient">
                      <Calendar />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="symptoms-meds/:id"
                  element={
                    <ProtectedRoute role="patient">
                      <SymptomsMeds />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route
                path={`/specializations/${DoctorsSpeciality.PULMONOLOGIST}/appointment`}
                element={
                  <ProtectedRoute role="patient">
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route
                  path="calendar/:id"
                  element={
                    <ProtectedRoute role="patient">
                      <Calendar />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="symptoms-meds/:id"
                  element={
                    <ProtectedRoute role="patient">
                      <SymptomsMeds />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="/visits" element={<VisitsList />} />
              <Route
                path="/history"
                element={
                  <ProtectedRoute role="patient">
                    <History />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute role="patient">
                    <ProfileInfo />
                  </ProtectedRoute>
                }
              />
              {/* Recepcja */}
              <Route path="/reception" element={<ReceptionMain />} />
              {/* Recepcja + lekarz */}
              <Route
                path="/editAppointment"
                element={<EditAppointment role={'doctor'} />}
              />
              <Route path="/doctor-profile/:id" element={<DoctorProfile />} />
              <Route path="/archives" element={<Archives />} />

              <Route path="/not-found" element={<NotFound />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="*" element={<Navigate to="/not-found" />} />
            </Routes>
          </Container>
        </QueryClientProvider>
      </DatesProvider>
    </MantineProvider>
  );
};

export default App;
