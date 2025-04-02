import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import type { Profile } from '../types/profile';

interface ProfileCardProps {
  profile: Profile;
  onShowMap: (profile: Profile) => void;
  onViewDetails: (profile: Profile) => void;
}

export function ProfileCard({ profile, onShowMap, onViewDetails }: ProfileCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <img
        src={profile.photo_url}
        alt={profile.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{profile.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{profile.description}</p>
        
        <div className="flex items-center text-gray-500 mb-2">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{profile.address}</span>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={() => onShowMap(profile)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Show on Map
          </button>
          <button
            onClick={() => onViewDetails(profile)}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}