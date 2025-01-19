// src/components/ProfileList.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProfiles } from '../context/ProfileContext';
import Map from './Map';
import { Search } from 'lucide-react';

const ProfileList = () => {
  const { profiles, setSelectedProfile } = useProfiles();
  const [searchTerm, setSearchTerm] = useState('');
  const [showMap, setShowMap] = useState(false);

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/2">
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search profiles..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="grid gap-4">
          {filteredProfiles.map(profile => (
            <div key={profile.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center gap-4">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-16 h-16 rounded-full"
                />
                <div className="flex-1">
                  <Link to={`/profile/${profile.id}`}>
                    <h3 className="font-semibold text-lg">{profile.name}</h3>
                  </Link>
                  <p className="text-gray-600">{profile.description}</p>
                  <p className="text-sm text-gray-500">{profile.address}</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedProfile(profile);
                    setShowMap(true);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  View on Map
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="md:w-1/2 h-[calc(100vh-2rem)] sticky top-4">
        <Map showMap={showMap} />
      </div>
    </div>
  );
};

export default ProfileList;