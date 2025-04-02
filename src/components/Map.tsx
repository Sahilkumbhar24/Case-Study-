import React from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import type { Profile } from '../types/profile';
import { MapPin } from 'lucide-react';

interface MapViewProps {
  profile?: Profile;
  className?: string;
}

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNrZXE1bG5wMjE0YzQyc3A2OXcyZnYzYjEifQ.Y8bhBaUMqFiPrDRW9hieoQ';

export function MapView({ profile, className }: MapViewProps) {
  const viewport = {
    latitude: profile?.latitude ?? 0,
    longitude: profile?.longitude ?? 0,
    zoom: 14
  };

  return (
    <div className={className}>
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={viewport}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        <NavigationControl />
        {profile && (
          <Marker
            latitude={profile.latitude}
            longitude={profile.longitude}
            anchor="bottom"
          >
            <MapPin className="w-6 h-6 text-red-500" />
          </Marker>
        )}
      </Map>
    </div>
  );
}
