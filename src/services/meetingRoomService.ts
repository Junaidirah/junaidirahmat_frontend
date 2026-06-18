import { apiService } from './api';
import type { ApiResponse } from '@/types/api';
import type { MeetingRoom } from '@/types/meetingRoom';

export const meetingRoomService = {
  getAll: (params?: { page?: number; limit?: number; isActive?: boolean }) =>
    apiService.get<ApiResponse<MeetingRoom[]>>('/meeting-rooms', params),
};
