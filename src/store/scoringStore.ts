import { create } from "zustand";
import type { Match, MatchEvent, MatchSide, SetScore } from "@/types";

interface LogEntry {
  id: string;
  type: "a" | "b" | "fault" | "info";
  message: string;
  score?: string;
  timestamp: Date;
}

interface ScoringState {
  // Active match
  match: Match | null;
  scoreA: number;
  scoreB: number;
  currentSet: number;
  completedSets: SetScore[];
  isConnected: boolean;
  isSaving: boolean;

  // Point log
  log: LogEntry[];

  // Actions
  setMatch: (match: Match) => void;
  addPoint: (side: MatchSide) => void;
  undoLastPoint: () => void;
  addFault: () => void;
  addLogEntry: (entry: Omit<LogEntry, "id" | "timestamp">) => void;
  applyRemoteEvent: (event: MatchEvent) => void;
  setConnected: (connected: boolean) => void;
  setSaving: (saving: boolean) => void;
  resetScoring: () => void;
}

const makeId = () => Math.random().toString(36).slice(2, 9);

export const useScoringStore = create<ScoringState>()((set, get) => ({
  match: null,
  scoreA: 0,
  scoreB: 0,
  currentSet: 1,
  completedSets: [],
  isConnected: false,
  isSaving: false,
  log: [],

  setMatch: (match) => {
    const currentSet = match.sets.length + 1;
    const lastSet = match.sets[match.sets.length - 1];
    set({
      match,
      scoreA: lastSet ? 0 : match.scoreA,
      scoreB: lastSet ? 0 : match.scoreB,
      currentSet,
      completedSets: match.sets,
      log: [
        {
          id: makeId(),
          type: "info",
          message: `Match loaded · Set ${currentSet}`,
          timestamp: new Date(),
        },
      ],
    });
  },

  addPoint: (side) => {
    const { scoreA, scoreB, currentSet, completedSets } = get();
    const newA = side === "a" ? scoreA + 1 : scoreA;
    const newB = side === "b" ? scoreB + 1 : scoreB;
    const teamName =
      side === "a"
        ? (get().match?.teamA ?? "Team A")
        : (get().match?.teamB ?? "Team B");

    set((s) => ({
      scoreA: newA,
      scoreB: newB,
      log: [
        ...s.log,
        {
          id: makeId(),
          type: side,
          message: `${teamName} scores`,
          score: `${newA}:${newB}`,
          timestamp: new Date(),
        },
      ],
    }));

    // Auto-advance set at 21 (or 30 for deuce)
    if (newA >= 21 || newB >= 21) {
      const winner: MatchSide = newA > newB ? "a" : "b";
      const newSet: SetScore = {
        setNumber: currentSet,
        scoreA: newA,
        scoreB: newB,
        winner,
      };
      setTimeout(() => {
        set((s) => ({
          scoreA: 0,
          scoreB: 0,
          currentSet: s.currentSet + 1,
          completedSets: [...s.completedSets, newSet],
          log: [
            ...s.log,
            {
              id: makeId(),
              type: "info",
              message: `Set ${currentSet} complete! Starting Set ${currentSet + 1}`,
              timestamp: new Date(),
            },
          ],
        }));
      }, 400);
    }
  },

  undoLastPoint: () => {
    set((s) => {
      const log = [...s.log];
      for (let i = log.length - 1; i >= 0; i--) {
        if (log[i].type === "a" || log[i].type === "b") {
          const side = log[i].type as MatchSide;
          log.splice(i, 1);
          return {
            scoreA: side === "a" ? Math.max(0, s.scoreA - 1) : s.scoreA,
            scoreB: side === "b" ? Math.max(0, s.scoreB - 1) : s.scoreB,
            log,
          };
        }
      }
      return { log };
    });
  },

  addFault: () => {
    set((s) => ({
      log: [
        ...s.log,
        {
          id: makeId(),
          type: "fault",
          message: "Fault / Let called",
          timestamp: new Date(),
        },
      ],
    }));
  },

  addLogEntry: (entry) => {
    set((s) => ({
      log: [...s.log, { ...entry, id: makeId(), timestamp: new Date() }],
    }));
  },

  applyRemoteEvent: (event) => {
    // Apply an event from the WebSocket stream (another device scored)
    if (event.type === "point" && event.side) {
      set({ scoreA: event.scoreA, scoreB: event.scoreB });
    }
  },

  setConnected: (connected) => set({ isConnected: connected }),
  setSaving: (saving) => set({ isSaving: saving }),

  resetScoring: () =>
    set({
      match: null,
      scoreA: 0,
      scoreB: 0,
      currentSet: 1,
      completedSets: [],
      log: [],
      isConnected: false,
      isSaving: false,
    }),
}));
