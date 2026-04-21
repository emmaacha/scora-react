import { useState } from "react";
import { Badge, Card, Avatar, Chip, EmptyState } from "@/components/ui";
import { MOCK_PLAYERS } from "@/lib/mockData";
import type { PlayerStatus } from "@/types";

const STATUS_VARIANT: Record<
  PlayerStatus,
  "active" | "live" | "upcoming" | "done"
> = {
  active: "active",
  live: "live",
  upcoming: "upcoming",
  inactive: "done",
};
const STATUS_LABEL: Record<PlayerStatus, string> = {
  active: "Active",
  live: "In Match",
  upcoming: "Queued",
  inactive: "Inactive",
};

const FILTERS = [
  "All",
  "Men's Doubles",
  "Women's Doubles",
  "Mixed Doubles",
  "Singles",
];

export default function PlayersPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = MOCK_PLAYERS.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.handle.includes(search.toLowerCase());
    if (filter === "All") return matchSearch;
    if (filter === "Singles")
      return matchSearch && p.division.includes("Singles");
    return matchSearch && p.division === filter;
  });

  return (
    <div className="flex-1 overflow-y-auto p-5 bg-vs-black">
      {/* Search + filters */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-2 bg-vs-card border border-vs-border rounded-lg px-3 py-2 w-56">
          <span className="text-vs-muted text-sm">🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search players..."
            className="flex-1 bg-transparent font-body text-[13px] text-vs-text placeholder:text-vs-muted outline-none"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {FILTERS.map((f) => (
            <Chip key={f} active={filter === f} onClick={() => setFilter(f)}>
              {f}
            </Chip>
          ))}
        </div>
      </div>

      <Card>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {["Player", "Division", "Partner", "W / L", "Status"].map((h) => (
                <th
                  key={h}
                  className="font-body font-semibold text-[10px] tracking-widest uppercase text-vs-muted px-4 py-3 text-left border-b border-vs-border"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr
                key={p.id}
                className={`hover:bg-white/2 transition-colors ${i < filtered.length - 1 ? "border-b border-white/5" : ""}`}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar initials={p.initials} color={p.color} size={36} />
                    <div>
                      <p className="font-body font-semibold text-[13px] text-vs-text">
                        {p.name}
                      </p>
                      <p className="font-body text-[11px] text-vs-muted">
                        {p.handle}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 font-body text-[12px] text-vs-sub">
                  {p.division}
                </td>
                <td className="px-4 py-3 font-body text-[12px] text-vs-muted">
                  {p.partner}
                </td>
                <td className="px-4 py-3">
                  <span className="font-head font-bold text-[16px] text-vs-green">
                    {p.wins}
                  </span>
                  <span className="font-body text-[11px] text-vs-muted mx-1">
                    /
                  </span>
                  <span className="font-head font-bold text-[16px] text-vs-red">
                    {p.losses}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={STATUS_VARIANT[p.status]}>
                    {STATUS_LABEL[p.status]}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <EmptyState icon="👤" message="No players found" />
        )}
      </Card>
    </div>
  );
}
