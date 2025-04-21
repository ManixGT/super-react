import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, useEffect, useState, lazy } from 'react';
import AuthLayout from './layouts/AuthLayout';
import AppLayout from './layouts/AppLayout';
import logo from '/assets/kv-logo.png';
import EventMemberList from './components/Layouts/EventMemberList';

// Lazy loaded components
const SignInPage = lazy(() => import('./components/Layouts/SignIn'));
const SignUpPage = lazy(() => import('./components/Layouts/SignUp'));
const ForgotPassword = lazy(() => import('./components/Layouts/ForgotPassword'));
const LoginWithOtp = lazy(() => import('./components/Layouts/LogInWithOtp'));
const ResetPassword = lazy(() => import('./components/Layouts/ResetPassword'));
const VerifyOtp = lazy(() => import('./components/Layouts/VerifyOtp'));
const AdminDashboard = lazy(() => import('./components/Layouts/AdminDashboard'));
const UserDashboard = lazy(() => import('./components/Layouts/UserDashboard'));
const EventDetailsPage = lazy(() => import('./components/Layouts/EventDetailsPage'));
const EventListingPage = lazy(() => import('./components/Layouts/EventListingPage'));

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<SplashScreen />}>
        <Routes>
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/" element={<SignInPage />} />
            <Route path="/signIn" element={<SignInPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/login-otp" element={<LoginWithOtp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-Otp" element={<VerifyOtp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>

          {/* App Routes */}
          <Route element={<AppLayout />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/event-details" element={<EventDetailsPage />} />
            <Route path="/event-listing" element={<EventListingPage />} />
            <Route path="/eventMember-list" element={<EventMemberList />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

function SplashScreen() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
      }}
    >
      <img
        src={logo}
        alt="App Logo"
        style={{
          width: '50px',
          height: '50px',
          marginBottom: '10px',
        }}
      />
      <h2
        style={{
          fontSize: '18px',
          color: '#333',
          margin: '0',
        }}
      >
        Kumar Viswas
      </h2>
    </div>
  );
}

export default App;
