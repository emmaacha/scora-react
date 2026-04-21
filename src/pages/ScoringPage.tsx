import { useEffect, useRef } from "react";
import { Badge, Button, Card, CardBody, LiveDot } from "@/components/ui";
import { useScoringStore } from "@/store/scoringStore";
import { MOCK_LIVE_MATCHES } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import type { MatchSide } from "@/types";

// ── Set History Pills ─────────────────────────────────────────
function SetHistory() {
  const { completedSets, scoreA, scoreB, currentSet } = useScoringStore();
  return (
    <div className="flex gap-2 justify-center mt-4">
      {completedSets.map((s) => (
        <div
          key={s.setNumber}
          className="bg-white/5 border border-vs-border rounded-lg px-3 py-1.5 text-center"
        >
          <p className="font-body font-semibold text-[9px] text-vs-muted uppercase tracking-wider mb-1">
            Set {s.setNumber}
          </p>
          <p className="font-head font-bold text-lg text-vs-text leading-none">
            {s.scoreA} – {s.scoreB}
          </p>
        </div>
      ))}
      <div
        className="rounded-lg px-3 py-1.5 text-center border"
        style={{
          background: "rgba(204,255,51,0.08)",
          borderColor: "rgba(204,255,51,0.25)",
        }}
      >
        <p
          className="font-body font-semibold text-[9px] uppercase tracking-wider mb-1"
          style={{ color: "#8BAA1E" }}
        >
          Set {currentSet}
        </p>
        <p
          className="font-head font-bold text-lg leading-none"
          style={{ color: "#CCFF33" }}
        >
          {scoreA} – {scoreB}
        </p>
      </div>
    </div>
  );
}

// ── Point Log ─────────────────────────────────────────────────
function PointLog() {
  const log = useScoringStore((s) => s.log);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [log]);

  return (
    <Card>
      <div className="px-4 py-3 border-b border-vs-border">
        <p className="font-body font-semibold text-[10px] tracking-widest uppercase text-vs-muted">
          Point Log
        </p>
      </div>
      <div ref={ref} className="max-h-36 overflow-y-auto">
        {log.map((entry) => {
          const dot =
            entry.type === "a"
              ? "#CCFF33"
              : entry.type === "b"
                ? "#3B82F6"
                : entry.type === "fault"
                  ? "#F59E0B"
                  : "#52525B";
          const text =
            entry.type === "fault"
              ? "text-vs-amber"
              : entry.type === "info"
                ? "text-vs-muted"
                : "text-vs-text";
          return (
            <div
              key={entry.id}
              className="flex items-center gap-2 px-4 py-2 border-b border-white/3 last:border-0"
            >
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: dot }}
              />
              <span className={cn("flex-1 font-body text-[12px]", text)}>
                {entry.message}
              </span>
              {entry.score && (
                <span className="font-head font-bold text-sm text-vs-muted">
                  {entry.score}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

// ── Scoring Page ──────────────────────────────────────────────
interface ScoringPageProps {
  onNav: (screen: string) => void;
}

export default function ScoringPage({ onNav }: ScoringPageProps) {
  const {
    scoreA,
    scoreB,
    currentSet,
    match,
    setMatch,
    addPoint,
    undoLastPoint,
    addFault,
    isSaving,
  } = useScoringStore();

  // Load mock match on mount if none loaded
  useEffect(() => {
    if (!match) setMatch(MOCK_LIVE_MATCHES[0]);
  }, [match, setMatch]);

  const leading: MatchSide | null =
    scoreA > scoreB ? "a" : scoreB > scoreA ? "b" : null;

  const scoreColor = (side: MatchSide) =>
    leading === side ? "#CCFF33" : leading !== null ? "#52525B" : "#FAFAFA";

  return (
    <div className="flex-1 overflow-y-auto bg-vs-black p-5 flex justify-center">
      <div className="w-full max-w-[500px]">
        {/* Match context */}
        <div className="flex items-center gap-2 mb-4">
          <LiveDot />
          <span className="font-body font-semibold text-[10px] tracking-widest uppercase text-vs-muted flex-1">
            Court {match?.courtNumber} · {match?.divisionName} · Set{" "}
            {currentSet}
          </span>
          <Badge variant="live">Live</Badge>
          {isSaving && (
            <span className="font-body text-[10px] text-vs-muted animate-pulse">
              Saving…
            </span>
          )}
        </div>

        {/* Scoreboard */}
        <Card className="mb-3">
          <div className="px-6 pt-7 pb-3">
            <div className="flex items-center gap-6">
              <div className="flex-1 text-center">
                <p className="font-head font-semibold text-[12px] tracking-widest uppercase text-vs-muted mb-3">
                  {match?.teamA ?? "Team A"}
                </p>
                <p
                  className="font-head font-black leading-none transition-colors duration-200"
                  style={{ fontSize: 96, color: scoreColor("a") }}
                >
                  {scoreA}
                </p>
              </div>
              <span
                className="font-head font-black text-3xl flex-shrink-0"
                style={{ color: "#27272A" }}
              >
                :
              </span>
              <div className="flex-1 text-center">
                <p className="font-head font-semibold text-[12px] tracking-widest uppercase text-vs-muted mb-3">
                  {match?.teamB ?? "Team B"}
                </p>
                <p
                  className="font-head font-black leading-none transition-colors duration-200"
                  style={{ fontSize: 96, color: scoreColor("b") }}
                >
                  {scoreB}
                </p>
              </div>
            </div>
            <SetHistory />
          </div>

          {/* Big point buttons */}
          <div className="grid grid-cols-2 border-t border-vs-border">
            <button
              onClick={() => addPoint("a")}
              className="py-5 flex flex-col items-center justify-center transition-opacity hover:opacity-90 active:opacity-70"
              style={{ background: "rgba(204,255,51,0.1)" }}
            >
              <span
                className="font-head font-black text-xl tracking-wider"
                style={{ color: "#CCFF33" }}
              >
                + POINT
              </span>
              <span className="font-head font-semibold text-sm text-vs-muted mt-0.5">
                {match?.teamA ?? "Team A"}
              </span>
            </button>
            <button
              onClick={() => addPoint("b")}
              className="py-5 flex flex-col items-center justify-center border-l border-vs-border transition-opacity hover:opacity-90 active:opacity-70"
              style={{ background: "rgba(59,130,246,0.1)" }}
            >
              <span className="font-head font-black text-xl tracking-wider text-vs-blue">
                + POINT
              </span>
              <span className="font-head font-semibold text-sm text-vs-muted mt-0.5">
                {match?.teamB ?? "Team B"}
              </span>
            </button>
          </div>
        </Card>

        {/* Secondary controls */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button
            onClick={addFault}
            className="rounded-xl py-3.5 font-body font-semibold text-[13px] transition-opacity hover:opacity-90"
            style={{
              background: "rgba(245,158,11,0.12)",
              border: "1px solid rgba(245,158,11,0.2)",
              color: "#F59E0B",
            }}
          >
            ⚠ Fault / Let
          </button>
          <button
            onClick={undoLastPoint}
            className="rounded-xl py-3.5 font-body font-semibold text-[13px] text-vs-sub border border-vs-border bg-white/4 hover:bg-white/8 transition-colors"
          >
            ↩ Undo Last
          </button>
        </div>

        {/* Point log */}
        <div className="mb-3">
          <PointLog />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="flex-1"
            onClick={() => onNav("dashboard")}
          >
            ← Back
          </Button>
          <Button variant="danger" className="flex-1">
            End Match
          </Button>
        </div>
      </div>
    </div>
  );
}
