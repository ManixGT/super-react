import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Footer from "./components/Layouts/Footer";
import Header from "./components/Layouts/Header";
import SignInPage from './components/Layouts/SignIn';
import SignUpPage from './components/Layouts/SignUp';
import ForgotPassword from './components/Layouts/ForgotPassword';
import LoginWithOtp from './components/Layouts/LogInWithOtp';
import ResetPassword from './components/Layouts/ResetPassword';
import VerifyOtp from './components/Layouts/VerifyOtp';
import logo from '/assets/kv-logo.png'; // Import the logo image
import AdminDashboard from './components/Layouts/AdminDashboard';
import UserDashboard from './components/Layouts/UserDashboard';
import EventDetailsPage from './components/Layouts/EventDetailsPage';
import EventListingPage from './components/Layouts/EventListingPage';

function App() {
  const [showSplash, setShowSplash] = useState(true); // State to control splash screen visibility

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1000); // Hide splash screen after 2 seconds
    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  if (showSplash) {
    return <SplashScreen />; // Render splash screen if `showSplash` is true
  }

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/login-otp" element={<LoginWithOtp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-Otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path='/admin-dashboard' element={<AdminDashboard />} />
          <Route path='/user-dashboard' element={<UserDashboard />} />
          <Route path='/event-details' element={<EventDetailsPage />} />
          <Route path='/event-listing' element={<EventListingPage />} />

          {/* Uncomment or add additional routes as needed */}
          {/* <Route index element={<Home />} /> */}
          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

function SplashScreen() {
  return (
    <div className="splash">
      <img src={logo} alt="App Logo" className="splash-logo" /> {/* Centered logo */}
    </div>
  );
}

export default App;
