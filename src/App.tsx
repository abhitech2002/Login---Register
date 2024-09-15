import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OTPVerification from './components/Auth/OTPVerification';
import WelcomePage from './pages/WelcomePage';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
        <Route element={<PrivateRoute />}>
          <Route 
            path="/welcome" 
            element={
              <Layout>
                <WelcomePage />
              </Layout>
            } 
          />
        </Route>        
      </Routes>
    </Router>
  );
};

export default App;