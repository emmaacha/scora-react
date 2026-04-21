import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppStore } from "@/store/appStore";
import {
  playersService,
  type CreatePlayerDto,
} from "@/services/players.service";
import type { Player } from "@/types";

export const playerKeys = {
  all: (orgId: string) => ["players", orgId] as const,
  detail: (id: string) => ["players", "detail", id] as const,
};

export function usePlayers() {
  const orgId = useAppStore((s) => s.activeOrg?.id ?? "");
  return useQuery({
    queryKey: playerKeys.all(orgId),
    queryFn: () => playersService.getAll(orgId).then((r) => r.data.data),
    enabled: !!orgId,
  });
}

export function useCreatePlayer() {
  const qc = useQueryClient();
  const orgId = useAppStore((s) => s.activeOrg?.id ?? "");
  return useMutation({
    mutationFn: (data: CreatePlayerDto) =>
      playersService.create(orgId, data).then((r) => r.data.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: playerKeys.all(orgId) }),
  });
}
