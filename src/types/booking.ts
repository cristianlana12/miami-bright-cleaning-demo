export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export type ServiceType =
  | 'house_cleaning'
  | 'deep_cleaning'
  | 'office_cleaning'
  | 'move_in_out'
  | 'airbnb_cleaning'
  | 'post_construction';

export interface Booking {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  service_type: ServiceType;
  booking_date: string;
  booking_time: string;
  address: string;
  message?: string;
  status?: BookingStatus;
  estimated_price?: number;
  created_at?: string;
}