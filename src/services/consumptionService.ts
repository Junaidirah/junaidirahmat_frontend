import { apiService } from './api';
import type { ApiResponse } from '@/types/api';
import type { Consumption } from '@/types/consumption';

export const consumptionService = {
  getAll: () => apiService.get<ApiResponse<Consumption[]>>('/consumptions'),
};
