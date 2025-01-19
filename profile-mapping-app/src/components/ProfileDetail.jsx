import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProfiles } from '../context/ProfileContext';
import Map from './Map';
import { ArrowLeft } from 'lucide-react';

const ProfileDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profiles, setSelectedProfile } = useProfiles();
  const [isLoading, setIsLoading] = useState(true);
  
  const profile = profiles.find(p => p.id === parseInt(id));

  useEffect(() => {
    if (profile) {
      setSelectedProfile(profile);
      // Give some time for the profile to be set
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => {
        clearTimeout(timer);
        setSelectedProfile(null);
      };
    }
  }, [profile, setSelectedProfile]);

  if (!profile) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold">Profile not found</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/2">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-blue-500 hover:text-blue-600 mb-4"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Profiles
        </button>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={profile.image}
              alt={profile.name}
              className="w-24 h-24 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <p className="text-gray-600">{profile.description}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">Address</h3>
              <p className="text-gray-600">{profile.address}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg">Coordinates</h3>
              <p className="text-gray-600">
                Latitude: {profile.coordinates.lat}
                <br />
                Longitude: {profile.coordinates.lng}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="md:w-1/2 h-[calc(100vh-2rem)] sticky top-4">
        <Map showMap={!isLoading} />
      </div>
    </div>
  );
};

export default ProfileDetail;