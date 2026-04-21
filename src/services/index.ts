import apiClient from "@/lib/axios";
import type { Player, ApiResponse, PaginatedResponse } from "@/types";

export interface CreatePlayerDto {
  name: string;
  handle: string;
  userId?: string;
  divisionId: string;
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

// ── Venues ────────────────────────────────────────────────────
// src/services/venues.service.ts
import type { Venue, Court } from "@/types";

export interface CreateVenueDto {
  name: string;
  address?: string;
}
export interface CreateCourtDto {
  number: number;
  venueId: string;
}

export const venuesService = {
  getAll: (orgId: string) =>
    apiClient.get<ApiResponse<Venue[]>>(`/organizations/${orgId}/venues`),

  create: (orgId: string, data: CreateVenueDto) =>
    apiClient.post<ApiResponse<Venue>>(`/organizations/${orgId}/venues`, data),

  getCourts: (venueId: string) =>
    apiClient.get<ApiResponse<Court[]>>(`/venues/${venueId}/courts`),

  createCourt: (venueId: string, data: CreateCourtDto) =>
    apiClient.post<ApiResponse<Court>>(`/venues/${venueId}/courts`, data),

  updateCourtStatus: (courtId: string, status: "free" | "occupied") =>
    apiClient.patch(`/courts/${courtId}`, { status }),
};

// ── Roles & Permissions ───────────────────────────────────────
// src/services/roles.service.ts
import type { Role, PermissionKey } from "@/types";

export interface CreateRoleDto {
  name: string;
  abbr: string;
  color: string;
  permissions: PermissionKey[];
}

export const rolesService = {
  getAll: (orgId: string) =>
    apiClient.get<ApiResponse<Role[]>>(`/organizations/${orgId}/roles`),

  create: (orgId: string, data: CreateRoleDto) =>
    apiClient.post<ApiResponse<Role>>(`/organizations/${orgId}/roles`, data),

  update: (id: string, data: Partial<CreateRoleDto>) =>
    apiClient.patch<ApiResponse<Role>>(`/roles/${id}`, data),

  delete: (id: string) => apiClient.delete(`/roles/${id}`),

  assignToMember: (memberId: string, roleId: string) =>
    apiClient.post(`/members/${memberId}/roles`, { roleId }),

  removeFromMember: (memberId: string, roleId: string) =>
    apiClient.delete(`/members/${memberId}/roles/${roleId}`),
};
