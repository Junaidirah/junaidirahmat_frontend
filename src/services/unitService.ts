import { apiService } from './api';
import type { ApiResponse } from '@/types/api';
import type { Unit } from '@/types/unit';

export const unitService = {
  getAll: (params?: { page?: number; limit?: number; search?: string }) =>
    apiService.get<ApiResponse<Unit[]>>('/units', params),
};
