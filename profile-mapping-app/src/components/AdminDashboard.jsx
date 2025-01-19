// src/components/AdminDashboard.jsx
import React, { useState } from 'react';
import { useProfiles } from '../context/ProfileContext';
import Map from './Map';

const AdminDashboard = () => {
  const { profiles, addProfile, updateProfile, deleteProfile } = useProfiles();
  const [editingProfile, setEditingProfile] = useState(null);
  const [showMap, setShowMap] = useState(false);

  const initialFormState = {
    name: '',
    description: '',
    address: '',
    coordinates: { lat: '', lng: '' }
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProfile) {
      updateProfile(editingProfile.id, formData);
      setEditingProfile(null);
    } else {
      addProfile(formData);
    }
    setFormData(initialFormState);
  };

  const handleEdit = (profile) => {
    setEditingProfile(profile);
    setFormData(profile);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/2">
        <h2 className="text-2xl font-bold mb-4">
          {editingProfile ? 'Edit Profile' : 'Add New Profile'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Latitude</label>
              <input
                type="number"
                step="any"
                value={formData.coordinates.lat}
                onChange={(e) => setFormData({
                  ...formData,
                  coordinates: {...formData.coordinates, lat: parseFloat(e.target.value)}
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Longitude</label>
              <input
                type="number"
                step="any"
                value={formData.coordinates.lng}
                onChange={(e) => setFormData({
                  ...formData,
                  coordinates: {...formData.coordinates, lng: parseFloat(e.target.value)}
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {editingProfile ? 'Update Profile' : 'Add Profile'}
            </button>
            {editingProfile && (
              <button
                type="button"
                onClick={() => {
                  setEditingProfile(null);
                  setFormData(initialFormState);
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Existing Profiles</h2>
          <div className="space-y-4">
            {profiles.map(profile => (
              <div key={profile.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{profile.name}</h3>
                    <p className="text-sm text-gray-600">{profile.address}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(profile)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProfile(profile.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="md:w-1/2 h-[calc(100vh-2rem)] sticky top-4">
        <Map showMap={true} />
      </div>
    </div>
  );
};

export default AdminDashboard; 