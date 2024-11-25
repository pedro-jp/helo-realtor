'use client';

import React from 'react';
import {
  GoogleMap,
  Circle,
  useLoadScript,
  Marker,
} from '@react-google-maps/api';
import style from './style.module.scss';
import MapOptions from '../mapOptions';

interface MapWithCircleProps {
  latitude: string;
  longitude: string;
  marker?: boolean;
  radius?: number;
}

const libraries: ['places'] = ['places'];

const MapWithCircle: React.FC<MapWithCircleProps> = ({
  latitude,
  longitude,
  marker,
  radius = 200,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);

  const center = { lat, lng };

  if (!isLoaded) {
    return <div>Carregando mapa...</div>;
  }

  return (
    <div style={{ width: '100%', paddingTop: '2rem', paddingBottom: '1rem' }}>
      <div className={style.map} style={{ height: '300px', width: '100%' }}>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ height: '100%', width: '100%' }}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          {marker ? (
            <Marker position={center} />
          ) : (
            <Circle
              center={center}
              radius={radius}
              options={{
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
              }}
            />
          )}
        </GoogleMap>
      </div>
      <MapOptions latitude={latitude} longitude={longitude} />
    </div>
  );
};

export default MapWithCircle;
