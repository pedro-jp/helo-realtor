import { WazeMap, GoogleMap, AppleMap } from '@/app/assets/svg';
import React from 'react';
import style from './style.module.scss';

interface MapOptionsProps {
  latitude: string;
  longitude: string;
}

const MapOptions: React.FC<MapOptionsProps> = ({ latitude, longitude }) => {
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  const wazeUrl = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;
  const appleMapsUrl = `https://maps.apple.com/?daddr=${latitude},${longitude}`;

  return (
    <div className={style.mapOptions}>
      <a href={googleMapsUrl} target='_blank' rel='noopener noreferrer'>
        <GoogleMap />
      </a>
      <a href={wazeUrl} target='_blank' rel='noopener noreferrer'>
        <WazeMap />
      </a>
      <a href={appleMapsUrl} target='_blank' rel='noopener noreferrer'>
        <AppleMap />
      </a>
    </div>
  );
};

export default MapOptions;
