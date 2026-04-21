import apiClient from "@/lib/axios";
import type { Player, ApiResponse, PaginatedResponse } from "@/types";

export interface CreatePlayerDto {
  name: string;
  handle?: string;
  divisionId?: string;
  partnerId?: string;
}

export const playersService = {
  getAll: (orgId: string) =>
    apiClient.get<PaginatedResponse<Player>>(`/organizations/${orgId}/players`),

  getById: (id: string) => apiClient.get<ApiResponse<Player>>(`/players/${id}`),

  create: (orgId: string, data: CreatePlayerDto) =>
    apiClient.post<ApiResponse<Player>>(
      `/organizations/${orgId}/players`,
      data,
    ),

  update: (id: string, data: Partial<CreatePlayerDto>) =>
    apiClient.patch<ApiResponse<Player>>(`/players/${id}`, data),

  delete: (id: string) => apiClient.delete(`/players/${id}`),
};
