import React, { useEffect, useRef, useState } from 'react';
import { useProfiles } from '../context/ProfileContext';

const Map = ({ showMap }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const { selectedProfile } = useProfiles();
  const [sdkError, setSdkError] = useState(null);

  // Initialize map
  useEffect(() => {
    let timeoutId;
    
    const initializeMap = () => {
      if (!mapInstanceRef.current && mapRef.current) {
        try {
          console.log('Initializing map...');
          
          const mapDiv = document.createElement('div');
          mapDiv.id = 'map-container-inner';
          mapDiv.style.width = '100%';
          mapDiv.style.height = '100%';
          
          while (mapRef.current.firstChild) {
            mapRef.current.removeChild(mapRef.current.firstChild);
          }
          mapRef.current.appendChild(mapDiv);

          // Default center (India)
          const defaultCenter = [20.5937, 78.9629];
          
          mapInstanceRef.current = new window.mappls.Map('map-container-inner', {
            center: defaultCenter,
            zoomControl: true,
            location: true,
            geolocation: false,
            zoom: 5,
            base_tile_layer: 'default_layer'
          });

          console.log('Map instance created successfully');
        } catch (error) {
          console.error('Map initialization error:', error);
          setSdkError(`Error creating map: ${error.message}`);
        }
      }
    };

    if (window.mappls && mapRef.current && !mapInstanceRef.current) {
      timeoutId = setTimeout(initializeMap, 100);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [showMap]);

  // Handle marker updates
  useEffect(() => {
    if (mapInstanceRef.current && selectedProfile?.coordinates) {
      try {
        // Remove existing marker
        if (markerRef.current) {
          markerRef.current.remove();
          markerRef.current = null;
        }

        const { lat, lng } = selectedProfile.coordinates;
        console.log(`Setting marker for ${selectedProfile.name} at:`, { lat, lng });

        // Create marker
        markerRef.current = new window.mappls.Marker({
          map: mapInstanceRef.current,
          position: [lat, lng],
          draggable: false,
          popupHtml: `
            <div style="padding: 10px;">
              <h3 style="margin: 0 0 5px 0;">${selectedProfile.name}</h3>
              <p style="margin: 0;">${selectedProfile.address}</p>
            </div>
          `,
          width: 35,
          height: 35
        });

        // Set the center and zoom using setView
        mapInstanceRef.current.setView([lat, lng], 14);

        // Open popup by default
        if (markerRef.current.getPopup) {
          markerRef.current.getPopup().addTo(mapInstanceRef.current);
        }

      } catch (error) {
        console.error('Error updating marker:', error);
        setSdkError(`Error updating map marker: ${error.message}`);
      }
    }
  }, [selectedProfile]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
    };
  }, []);

  if (!showMap) return null;

  return (
    <div className="relative w-full h-[600px]">
      <div 
        ref={mapRef} 
        className="absolute inset-0 rounded-lg shadow-lg"
      />
      {(!mapInstanceRef.current || sdkError) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <p className="text-gray-500">
            {sdkError || 'Loading map...'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Map;