export interface Profile {
  id: string;
  name: string;
  description: string;
  photo_url: string;
  address: string;
  latitude: number;
  longitude: number;
  contact_info?: string;
  interests?: string[];
  created_at: string;
  updated_at: string;
}

export interface MapLocation {
  latitude: number;
  longitude: number;
}