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
import { Loading } from '../Loading';
import Link from 'next/link';

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

  const url = selectedOffice?.officeName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '')
    .replace(/[^\w-]+/g, '');

  const defaultCenter =
    locations.length > 0
      ? {
          lat: parseFloat(locations[0].latitude),
          lng: parseFloat(locations[0].longitude),
        }
      : { lat: 0, lng: 0 };
  if (!isLoaded) {
    return <Loading />;
  }
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
            styles: darkModeStyle,
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
                <Link href={`/${url}`}>
                  <h3>{selectedOffice.officeName}</h3>
                </Link>
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

const darkModeStyle = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#212121' }],
  },
  {
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#757575' }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#212121' }],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{ color: '#757575' }],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9e9e9e' }],
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#bdbdbd' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#757575' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#181818' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#616161' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#1b1b1b' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [{ color: '#253536' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#5c5c5c' }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{ color: '#2c4749' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#b97cb9' }],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [{ color: '#ad68ad' }],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#616161' }],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#757575' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#000000' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#3d3d3d' }],
  },
];
