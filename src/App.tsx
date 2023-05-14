import { Container, MantineProvider } from '@mantine/core';
import { SideMenu } from './components/UI/SideMenu';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './components/pages/Home/Home';
import { SpecializationList } from './components/pages/Specializations/SpecializationList';
import { VisitsList } from './components/pages/Visits/VisitsList';
import { History } from './components/pages/History/History';
import { ProfileInfo } from './components/pages/Profile/ProfileInfo';

const App = () => {
  return (
    <MantineProvider
      theme={{ colorScheme: 'light', primaryColor: 'orange' }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Container px={0} mx={0} h="100vh" display="flex" maw={'100%'}>
        <SideMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/specializations" element={<SpecializationList />} />
          <Route path="/visits" element={<VisitsList />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<ProfileInfo />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </MantineProvider>
  );
};

export default App;
