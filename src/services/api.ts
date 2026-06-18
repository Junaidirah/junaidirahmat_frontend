import axiosInstance from '@/lib/axios';

export const apiService = {
  get: <T>(url: string, params?: Record<string, unknown>) => axiosInstance.get<T, T>(url, { params }),
  post: <T>(url: string, data?: unknown) => axiosInstance.post<T, T>(url, data),
  put: <T>(url: string, data?: unknown) => axiosInstance.put<T, T>(url, data),
  patch: <T>(url: string, data?: unknown) => axiosInstance.patch<T, T>(url, data),
  delete: <T>(url: string) => axiosInstance.delete<T, T>(url),
};
