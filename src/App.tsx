import { Container, MantineProvider } from '@mantine/core';
import { SideMenu } from './components/UI/SideMenu';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './components/pages/Home/Home';
import { SpecializationList } from './components/pages/Specializations/SpecializationList';
import { VisitsList } from './components/pages/Visits/VisitsList';
import { History } from './components/pages/History/History';
import { ProfileInfo } from './components/pages/Profile/ProfileInfo';
import SignIn from './components/pages/Auth/SignIn';
import SignUp from './components/pages/Auth/SignUp';
import { DatesProvider } from '@mantine/dates';
import 'dayjs/locale/pl';
import { DoctorList } from './components/pages/Doctors/DoctorsList';
import ForgotPassword from './components/pages/Auth/ForgotPassword';

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
              path="/specializations/internists"
              element={<DoctorList />}
            />
            <Route path="/visits" element={<VisitsList />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<ProfileInfo />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
      </DatesProvider>
    </MantineProvider>
  );
};

export default App;
