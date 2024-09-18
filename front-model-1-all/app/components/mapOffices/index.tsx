'use client';

import React, { useState } from 'react';
import {
  GoogleMap,
  Marker,
  useLoadScript,
  InfoWindow,
  Circle,
} from '@react-google-maps/api';
import style from './style.module.scss';
import MapOptions from '../mapOptions';

interface MapWithCircleProps {
  locations: {
    latitude: string;
    longitude: string;
    marker?: boolean;
    radius?: number;
    officeName: string;
    officeId: string; // Adiciona um ID para identificar o escritório
  }[];
}

const libraries: ['places'] = ['places'];

const MapWithCircle: React.FC<MapWithCircleProps> = ({ locations }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCXUysejG26jQvuyCl6arN8ueQYVR4MLqo',
    libraries,
  });

  const [selectedOffice, setSelectedOffice] = useState<null | {
    latitude: string;
    longitude: string;
    officeName: string;
    officeId: string;
  }>(null);

  if (!isLoaded) {
    return <div>Carregando mapa...</div>;
  }

  const defaultCenter =
    locations.length > 0
      ? {
          lat: parseFloat(locations[0].latitude),
          lng: parseFloat(locations[0].longitude),
        }
      : { lat: 0, lng: 0 };

  return (
    <>
      <div className={style.map} style={{ height: '300px', width: '100%' }}>
        <GoogleMap
          center={defaultCenter}
          zoom={15}
          mapContainerStyle={{ height: '100%', width: '100%' }}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          {locations.map((location, index) => {
            const center = {
              lat: parseFloat(location.latitude),
              lng: parseFloat(location.longitude),
            };

            return location.marker ? (
              <Marker
                key={index}
                position={center}
                onClick={() => setSelectedOffice(location)} // Seleciona o escritório clicado
              />
            ) : (
              <Circle
                key={index}
                center={center}
                radius={location.radius || 200}
                options={{
                  fillColor: '#FF0000',
                  fillOpacity: 0.35,
                  strokeColor: '#FF0000',
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                }}
              />
            );
          })}

          {selectedOffice && (
            <InfoWindow
              position={{
                lat: parseFloat(selectedOffice.latitude),
                lng: parseFloat(selectedOffice.longitude),
              }}
              onCloseClick={() => setSelectedOffice(null)} // Fecha o popup quando clicar no "X"
            >
              <div style={{ paddingTop: '10px' }}>
                <h3>{selectedOffice.officeName}</h3>
                {/* O componente MapOptions é exibido ao clicar no marcador */}
                <MapOptions
                  latitude={selectedOffice.latitude}
                  longitude={selectedOffice.longitude}
                />
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </>
  );
};

export default MapWithCircle;