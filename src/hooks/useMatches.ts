import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { matchesService, type MatchEventDto } from "@/services/matches.service";
import { matchSocket } from "@/lib/websocket";
import { useScoringStore } from "@/store/scoringStore";
import { useAppStore } from "@/store/appStore";

export const matchKeys = {
  live: (orgId: string) => ["matches", "live", orgId] as const,
  upcoming: (orgId: string) => ["matches", "upcoming", orgId] as const,
  detail: (id: string) => ["matches", "detail", id] as const,
  events: (id: string) => ["matches", id, "events"] as const,
};

export function useLiveMatches() {
  const orgId = useAppStore((s) => s.activeOrg?.id ?? "");
  return useQuery({
    queryKey: matchKeys.live(orgId),
    queryFn: () => matchesService.getLive(orgId).then((r) => r.data.data),
    enabled: !!orgId,
    refetchInterval: 10_000, // poll every 10s as fallback to WS
  });
}

export function useUpcomingMatches() {
  const orgId = useAppStore((s) => s.activeOrg?.id ?? "");
  return useQuery({
    queryKey: matchKeys.upcoming(orgId),
    queryFn: () => matchesService.getUpcoming(orgId).then((r) => r.data.data),
    enabled: !!orgId,
    refetchInterval: 30_000,
  });
}

export function useMatch(id: string) {
  return useQuery({
    queryKey: matchKeys.detail(id),
    queryFn: () => matchesService.getById(id).then((r) => r.data.data),
    enabled: !!id,
  });
}

export function useMatchEvents(matchId: string) {
  return useQuery({
    queryKey: matchKeys.events(matchId),
    queryFn: () => matchesService.getEvents(matchId).then((r) => r.data.data),
    enabled: !!matchId,
  });
}

export function useAddMatchEvent(matchId: string) {
  const qc = useQueryClient();
  const { setSaving } = useScoringStore();
  return useMutation({
    mutationFn: (data: MatchEventDto) =>
      matchesService.addEvent(matchId, data).then((r) => r.data.data),
    onMutate: () => setSaving(true),
    onSettled: () => {
      setSaving(false);
      qc.invalidateQueries({ queryKey: matchKeys.detail(matchId) });
      qc.invalidateQueries({ queryKey: matchKeys.events(matchId) });
    },
  });
}

export function useUndoLastEvent(matchId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () =>
      matchesService.undoLastEvent(matchId).then((r) => r.data.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: matchKeys.detail(matchId) });
      qc.invalidateQueries({ queryKey: matchKeys.events(matchId) });
    },
  });
}

/** Connect to live WS for a match and sync remote events to the scoring store */
export function useLiveScoringSocket(matchId: string | null) {
  const { applyRemoteEvent, setConnected } = useScoringStore();

  useEffect(() => {
    if (!matchId) return;
    matchSocket.connect(matchId);
    const unsubEvent = matchSocket.onEvent(applyRemoteEvent);
    const unsubStatus = matchSocket.onStatus(setConnected);
    return () => {
      unsubEvent();
      unsubStatus();
      matchSocket.disconnect();
    };
  }, [matchId, applyRemoteEvent, setConnected]);
}
