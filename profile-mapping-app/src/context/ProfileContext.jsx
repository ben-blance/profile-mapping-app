// src/context/ProfileContext.jsx
import React, { createContext, useState, useContext } from 'react';

const ProfileContext = createContext();

export const initialProfiles = [
  {
    id: 1,
    name: "Rahul Kumar",
    description: "Software Engineer at TechPark",
    image: "/api/placeholder/150/150",
    address: "Cyber City, DLF Phase 2, Gurugram, Haryana",
    coordinates: { lat: 28.4961, lng: 77.0880 }
  },
  {
    id: 2,
    name: "Priya Sharma",
    description: "Product Manager at Innovation Hub",
    image: "/api/placeholder/150/150",
    address: "Whitefield, Bangalore, Karnataka",
    coordinates: { lat: 12.9698, lng: 77.7500 }
  }
];

// Rest of the context code remains the same...

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const addProfile = (profile) => {
    setProfiles([...profiles, { ...profile, id: profiles.length + 1 }]);
  };

  const updateProfile = (id, updatedProfile) => {
    setProfiles(profiles.map(profile => 
      profile.id === id ? { ...profile, ...updatedProfile } : profile
    ));
  };

  const deleteProfile = (id) => {
    setProfiles(profiles.filter(profile => profile.id !== id));
  };

  return (
    <ProfileContext.Provider value={{
      profiles,
      selectedProfile,
      setSelectedProfile,
      addProfile,
      updateProfile,
      deleteProfile
    }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfiles = () => useContext(ProfileContext);