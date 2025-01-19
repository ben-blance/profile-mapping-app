// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProfileList from './components/ProfileList';
import ProfileDetail from './components/ProfileDetail';
import AdminDashboard from './components/AdminDashboard';
import { ProfileProvider } from './context/ProfileContext';

const App = () => {
  return (
    <ProfileProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<ProfileList />} />
              <Route path="/profile/:id" element={<ProfileDetail />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ProfileProvider>
  );
};

export default App;