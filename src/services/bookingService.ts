import { apiService } from './api';
import type { ApiResponse } from '@/types/api';
import type { Booking, CreateBookingPayload, UpdateBookingPayload } from '@/types/booking';

export interface BookingQuery {
  page?: number;
  limit?: number;
  search?: string;
  meetingDate?: string;
  unitId?: number;
  meetingRoomId?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const bookingService = {
  getAll: (params?: BookingQuery) =>
    apiService.get<ApiResponse<Booking[]>>('/bookings', params as Record<string, unknown>),

  getById: (id: number) =>
    apiService.get<ApiResponse<Booking>>(`/bookings/${id}`),

  create: (data: CreateBookingPayload) =>
    apiService.post<ApiResponse<Booking>>('/bookings', data),

  update: (id: number, data: UpdateBookingPayload) =>
    apiService.patch<ApiResponse<Booking>>(`/bookings/${id}`, data),

  delete: (id: number) =>
    apiService.delete<ApiResponse<null>>(`/bookings/${id}`),
};
