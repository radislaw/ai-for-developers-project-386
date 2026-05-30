import { api } from './client';
import type { Booking, CreateBookingPayload } from '../types';

export const createBooking = async (payload: CreateBookingPayload): Promise<Booking> => {
  const response = await api.post<{ booking: Booking }>('/bookings', payload);
  return response.data.booking;
};

export const listUpcomingBookings = async (): Promise<Booking[]> => {
  const response = await api.get<{ bookings: Booking[] }>('/bookings/upcoming');
  return response.data.bookings;
};