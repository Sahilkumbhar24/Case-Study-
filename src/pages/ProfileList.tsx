import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { ProfileCard } from '../components/ProfileCard';
import { MapView } from '../components/Map';
import type { Profile } from '../types/profile';

export function ProfileList() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockProfiles: Profile[] = [
      {
        id: '1',
        name: 'Sahil Kumbhar',
        description: 'Frontend Developer.',
        photo_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        address: 'Pune, Maharashtra, India',
        latitude: 37.7749,
        longitude: -122.4194,
        interests: ['Programming', 'Content - Creation', 'Cricket'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      // Add more mock profiles here
    ];

    setProfiles(mockProfiles);
    setLoading(false);
  }, []);

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/2">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search profiles..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {filteredProfiles.map(profile => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onShowMap={setSelectedProfile}
                onViewDetails={(profile) => navigate(`/profile/${profile.id}`)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="lg:w-1/2 h-[calc(100vh-2rem)] sticky top-4">
        <MapView
          profile={selectedProfile}
          className="w-full h-full rounded-lg overflow-hidden shadow-lg"
        />
      </div>
    </div>
  );
}