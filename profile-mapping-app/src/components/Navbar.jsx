// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Settings } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <MapPin className="h-6 w-6 text-blue-500" />
            <span className="font-bold text-xl">Profile Map</span>
          </Link>

          <div className="flex space-x-4">
            <Link
              to="/"
              className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <Users className="h-5 w-5 mr-1" />
              <span>Profiles</span>
            </Link>
            
            <Link
              to="/admin"
              className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <Settings className="h-5 w-5 mr-1" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;