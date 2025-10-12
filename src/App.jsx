import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Components
import ScrollToTop from './components/ScrollToTop';

// Landing Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TrainingsPage from './pages/TrainingsPage';
import TrainingDetailPage from './pages/TrainingDetailPage';
import GalleryPage from './pages/GalleryPage';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTrainings from './pages/admin/AdminTrainings';
import AdminGallery from './pages/admin/AdminGallery';
import AdminSettings from './pages/admin/AdminSettings';

import './App.css';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          {/* Landing Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/trainings" element={<TrainingsPage />} />
          <Route path="/training/:id" element={<TrainingDetailPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          
          {/* Admin Pages */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/trainings" element={<AdminTrainings />} />
          <Route path="/admin/gallery" element={<AdminGallery />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;