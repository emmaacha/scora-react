import apiClient from "@/lib/axios";
import type { Match, MatchEvent, BracketMatch, ApiResponse } from "@/types";

export interface AddPointDto {
  side: "a" | "b";
  scoredBy?: string;
}

export interface MatchEventDto {
  type: "point" | "fault" | "let" | "status_change";
  side?: "a" | "b";
  notes?: string;
}

export const matchesService = {
  getById: (id: string) => apiClient.get<ApiResponse<Match>>(`/matches/${id}`),

  getLive: (orgId: string) =>
    apiClient.get<ApiResponse<Match[]>>(`/organizations/${orgId}/matches/live`),

  getUpcoming: (orgId: string) =>
    apiClient.get<ApiResponse<Match[]>>(
      `/organizations/${orgId}/matches/upcoming`,
    ),

  getBracket: (tournamentId: string, divisionId: string) =>
    apiClient.get<ApiResponse<BracketMatch[]>>(
      `/tournaments/${tournamentId}/divisions/${divisionId}/bracket`,
    ),

  addEvent: (matchId: string, data: MatchEventDto) =>
    apiClient.post<ApiResponse<MatchEvent>>(`/matches/${matchId}/events`, data),

  getEvents: (matchId: string) =>
    apiClient.get<ApiResponse<MatchEvent[]>>(`/matches/${matchId}/events`),

  undoLastEvent: (matchId: string) =>
    apiClient.delete<ApiResponse<MatchEvent>>(
      `/matches/${matchId}/events/last`,
    ),

  endMatch: (matchId: string) => apiClient.post(`/matches/${matchId}/end`),
};
