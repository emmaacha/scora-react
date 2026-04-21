import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  tournamentsService,
  type CreateTournamentDto,
} from "@/services/tournaments.service";
import { useAppStore } from "@/store/appStore";

export const tournamentKeys = {
  all: (orgId: string) => ["tournaments", orgId] as const,
  detail: (id: string) => ["tournaments", "detail", id] as const,
  divisions: (tournamentId: string) =>
    ["tournaments", tournamentId, "divisions"] as const,
  bracket: (tournamentId: string, divId: string) =>
    ["tournaments", tournamentId, "bracket", divId] as const,
};

export function useTournaments() {
  const orgId = useAppStore((s) => s.activeOrg?.id ?? "");
  return useQuery({
    queryKey: tournamentKeys.all(orgId),
    queryFn: () => tournamentsService.getAll(orgId).then((r) => r.data.data),
    enabled: !!orgId,
  });
}

export function useTournament(id: string) {
  return useQuery({
    queryKey: tournamentKeys.detail(id),
    queryFn: () => tournamentsService.getById(id).then((r) => r.data.data),
    enabled: !!id,
  });
}

export function useCreateTournament() {
  const qc = useQueryClient();
  const orgId = useAppStore((s) => s.activeOrg?.id ?? "");
  return useMutation({
    mutationFn: (data: CreateTournamentDto) =>
      tournamentsService.create(orgId, data).then((r) => r.data.data),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: tournamentKeys.all(orgId) }),
  });
}

export function useBracket(tournamentId: string, divisionId: string) {
  return useQuery({
    queryKey: tournamentKeys.bracket(tournamentId, divisionId),
    queryFn: () =>
      tournamentsService
        .getBracket?.(tournamentId, divisionId)
        .then((r: { data: { data: unknown } }) => r.data.data),
    enabled: !!tournamentId && !!divisionId,
  });
}
