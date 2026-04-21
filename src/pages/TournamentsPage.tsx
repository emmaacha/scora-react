import { useState } from "react";
import { Badge, Card, Chip, SectionHeader } from "@/components/ui";
import { MOCK_TOURNAMENTS } from "@/lib/mockData";
import type { Tournament, TournamentStatus } from "@/types";

const STATUS_VARIANT: Record<
  TournamentStatus,
  "live" | "upcoming" | "done" | "open"
> = {
  draft: "done",
  open: "open",
  upcoming: "upcoming",
  live: "live",
  done: "done",
};
const STATUS_LABEL: Record<TournamentStatus, string> = {
  draft: "Draft",
  open: "Open",
  upcoming: "Registration",
  live: "Live",
  done: "Completed",
};
const SPORTS = ["All", "Badminton", "Table Tennis", "Volleyball", "Basketball"];

function TournamentCard({
  t,
  onClick,
}: {
  t: Tournament;
  onClick: () => void;
}) {
  return (
    <Card hover onClick={onClick} className="p-4 animate-fade-in">
      <div className="flex items-start justify-between mb-1">
        <span className="font-body text-[11px] text-vs-muted">
          {t.sportIcon} {t.sport.toUpperCase()}
        </span>
        <Badge variant={STATUS_VARIANT[t.status]}>
          {STATUS_LABEL[t.status]}
        </Badge>
      </div>
      <p className="font-head font-black text-[19px] tracking-wide text-vs-text mb-2">
        {t.name}
      </p>
      <div className="flex gap-4 mb-1">
        <span className="font-body text-[11px] text-vs-muted">📅 {t.date}</span>
        <span className="font-body text-[11px] text-vs-muted truncate">
          📍 {t.venueName}
        </span>
      </div>
      <div className="flex gap-4 mb-3">
        <span className="font-body text-[11px] text-vs-muted">
          {t.divisionCount} Divisions
        </span>
        <span className="font-body text-[11px] text-vs-muted">
          {t.playerCount} Players
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1 bg-vs-border rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${t.progress}%`,
              backgroundColor: t.status === "done" ? "#52525B" : "#CCFF33",
            }}
          />
        </div>
        <span className="font-body font-semibold text-[10px] text-vs-muted">
          {t.progress}%
        </span>
      </div>
    </Card>
  );
}

export default function TournamentsPage({
  onNav,
}: {
  onNav: (s: string) => void;
}) {
  const [filter, setFilter] = useState("All");
  const filtered =
    filter === "All"
      ? MOCK_TOURNAMENTS
      : MOCK_TOURNAMENTS.filter((t) => t.sport === filter);

  return (
    <div className="flex-1 overflow-y-auto p-5 bg-vs-black">
      <div className="flex gap-2 flex-wrap mb-4">
        {SPORTS.map((s) => (
          <Chip key={s} active={filter === s} onClick={() => setFilter(s)}>
            {s}
          </Chip>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {filtered.map((t) => (
          <TournamentCard key={t.id} t={t} onClick={() => onNav("bracket")} />
        ))}
        <Card
          hover
          onClick={() => onNav("new-tournament")}
          className="p-6 flex flex-col items-center justify-center min-h-[160px] border-dashed bg-transparent"
        >
          <div className="w-10 h-10 rounded-full border-2 border-dashed border-vs-border flex items-center justify-center text-2xl text-vs-muted mb-2">
            +
          </div>
          <p className="font-body font-medium text-[13px] text-vs-muted">
            New Tournament
          </p>
        </Card>
      </div>
    </div>
  );
}
