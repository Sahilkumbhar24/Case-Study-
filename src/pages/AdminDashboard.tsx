import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react';
import type { Profile } from '../types/profile';

interface EditableProfile extends Profile {
  isEditing?: boolean;
}

export function AdminDashboard() {
  const [profiles, setProfiles] = useState<EditableProfile[]>([]);
  const [loading, setLoading] = useState(true);

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
    ];

    setProfiles(mockProfiles);
    setLoading(false);
  }, []);

  const handleEdit = (id: string) => {
    setProfiles(profiles.map(profile => 
      profile.id === id ? { ...profile, isEditing: true } : profile
    ));
  };

  const handleSave = (id: string) => {
    setProfiles(profiles.map(profile => 
      profile.id === id ? { ...profile, isEditing: false } : profile
    ));
    // TODO: Implement API call to save changes
  };

  const handleCancel = (id: string) => {
    setProfiles(profiles.map(profile => 
      profile.id === id ? { ...profile, isEditing: false } : profile
    ));
  };

  const handleDelete = (id: string) => {
    setProfiles(profiles.filter(profile => profile.id !== id));
    // TODO: Implement API call to delete profile
  };

  const handleChange = (id: string, field: keyof Profile, value: any) => {
    setProfiles(profiles.map(profile => 
      profile.id === id ? { ...profile, [field]: value } : profile
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Profile Management</h1>
        <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Add New Profile
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {profiles.map(profile => (
              <tr key={profile.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img className="h-10 w-10 rounded-full" src={profile.photo_url} alt="" />
                    <div className="ml-4">
                      {profile.isEditing ? (
                        <input
                          type="text"
                          value={profile.name}
                          onChange={(e) => handleChange(profile.id, 'name', e.target.value)}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      ) : (
                        <div className="text-sm font-medium text-gray-900">{profile.name}</div>
                      )}
                      {profile.isEditing ? (
                        <textarea
                          value={profile.description}
                          onChange={(e) => handleChange(profile.id, 'description', e.target.value)}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      ) : (
                        <div className="text-sm text-gray-500">{profile.description}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {profile.isEditing ? (
                    <input
                      type="text"
                      value={profile.address}
                      onChange={(e) => handleChange(profile.id, 'address', e.target.value)}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  ) : (
                    <div className="text-sm text-gray-900">{profile.address}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(profile.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {profile.isEditing ? (
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleSave(profile.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Save className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleCancel(profile.id)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(profile.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(profile.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}