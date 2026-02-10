import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import HomePage from './pages/HomePage';
import DevicePage from './pages/DevicePage';
import AddDevicePage from './pages/AddDevicePage';
import PetCreationPage from './pages/PetCreationPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SecurityPage from './pages/SecurityPage';
import SettingsPage from './pages/SettingsPage';
import HelpFeedbackPage from './pages/HelpFeedbackPage';
import PersonalInfoPage from './pages/PersonalInfoPage';
import MyAssetsPage from './pages/MyAssetsPage';
import MessageCenterPage from './pages/MessageCenterPage';
import ChatHistoryPage from './pages/ChatHistoryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<AppLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/devices" element={<DevicePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="/add-device" element={<AddDevicePage />} />
        <Route path="/create-pet" element={<PetCreationPage />} />
        <Route path="/profile/edit" element={<PersonalInfoPage />} />
        <Route path="/profile/assets" element={<MyAssetsPage />} />
        <Route path="/profile/notifications" element={<MessageCenterPage />} />
        <Route path="/profile/security" element={<SecurityPage />} />
        <Route path="/profile/settings" element={<SettingsPage />} />
        <Route path="/profile/help" element={<HelpFeedbackPage />} />
        <Route path="/chat-history" element={<ChatHistoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
