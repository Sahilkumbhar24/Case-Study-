import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapView } from '../components/Map';
import { ArrowLeft, Mail, Phone, MapPin, Heart } from 'lucide-react';
import type { Profile } from '../types/profile';

export function ProfileDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockProfile: Profile = {
      id: '1',
      name: 'Sahil Kumbhar',
      description: 'Frontend Developer.',
      photo_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      address: 'Pune, Maharashtra, India',
      latitude: 18.5204,
      longitude: 73.8567,
      interests: ['Programming', 'Content - Creation', 'Cricket'],
      contact_info: 'kumbharsahil717@gmail.com',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setProfile(mockProfile);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Profile not found</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-blue-500 hover:text-blue-600"
        >
          Return to profiles
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to profiles
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={profile.photo_url}
              alt={profile.name}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{profile.name}</h1>
            <p className="text-gray-600 mb-6">{profile.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-5 h-5 mr-2" />
                    <span>{profile.contact_info}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{profile.address}</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Interests</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.interests?.map((interest, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      <Heart className="w-4 h-4 mr-1" />
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-96 mt-6">
          <MapView profile={profile} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
