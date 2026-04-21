import apiClient from "@/lib/axios";
import type {
  Tournament,
  Division,
  ApiResponse,
  PaginatedResponse,
} from "@/types";

export interface CreateTournamentDto {
  name: string;
  sport: string;
  sportIcon: string;
  date: string;
  venueId: string;
  format: string;
  divisions: { name: string; gender: string; maxEntries: number }[];
}

export const tournamentsService = {
  getAll: (orgId: string) =>
    apiClient.get<PaginatedResponse<Tournament>>(
      `/organizations/${orgId}/tournaments`,
    ),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Tournament>>(`/tournaments/${id}`),

  create: (orgId: string, data: CreateTournamentDto) =>
    apiClient.post<ApiResponse<Tournament>>(
      `/organizations/${orgId}/tournaments`,
      data,
    ),

  update: (id: string, data: Partial<CreateTournamentDto>) =>
    apiClient.patch<ApiResponse<Tournament>>(`/tournaments/${id}`, data),

  delete: (id: string) => apiClient.delete(`/tournaments/${id}`),

  getDivisions: (tournamentId: string) =>
    apiClient.get<ApiResponse<Division[]>>(
      `/tournaments/${tournamentId}/divisions`,
    ),

  generateBracket: (tournamentId: string, divisionId: string) =>
    apiClient.post(
      `/tournaments/${tournamentId}/divisions/${divisionId}/bracket`,
    ),

  getBracket: (tournamentId: string, divisionId: string) =>
    apiClient.get<ApiResponse<any>>(
      `/tournaments/${tournamentId}/divisions/${divisionId}/bracket`,
    ),
};
