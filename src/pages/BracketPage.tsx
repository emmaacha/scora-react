import { useState } from "react";
import { Button, Card } from "@/components/ui";
import { cn } from "@/lib/utils";

interface BSlot {
  seed?: number;
  name: string;
  score: number | null;
  winner?: boolean;
  live?: boolean;
}
interface BMatch {
  sideA: BSlot;
  sideB: BSlot;
}

function BracketMatch({ match, live }: { match: BMatch; live?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden border mb-3",
        live ? "border-red-500/30" : "border-vs-border",
      )}
    >
      {[match.sideA, match.sideB].map((side, i) => (
        <div
          key={i}
          className={cn(
            "flex items-center justify-between px-3 py-2.5 text-[12px] font-body font-medium transition-colors",
            i === 1 && "border-t border-vs-border",
            side.winner
              ? "bg-vs-lime/8"
              : live && i === 0
                ? "bg-red-500/6"
                : "bg-transparent",
          )}
        >
          <span
            style={{
              color: side.winner
                ? "#CCFF33"
                : live && i === 0
                  ? "#EF4444"
                  : "#FAFAFA",
            }}
          >
            {side.seed && (
              <span className="text-vs-muted mr-1 text-[10px]">
                #{side.seed}
              </span>
            )}
            {side.name}
          </span>
          <span
            className="font-head font-bold text-xl"
            style={{
              color: side.winner
                ? "#CCFF33"
                : side.score !== null
                  ? "#FAFAFA"
                  : "#52525B",
            }}
          >
            {side.score !== null ? side.score : "—"}
          </span>
        </div>
      ))}
    </div>
  );
}

const DIVISIONS = ["Men's Doubles – Open", "Women's Doubles", "Mixed Doubles"];

export default function BracketPage() {
  const [activeDiv, setActiveDiv] = useState(0);

  const QF: BMatch[] = [
    {
      sideA: { seed: 1, name: "Santos / Reyes", score: 21, winner: true },
      sideB: { seed: 8, name: "Del Rio / Ngo", score: 15 },
    },
    {
      sideA: { seed: 4, name: "Cruz / Uy", score: 21, winner: true },
      sideB: { seed: 5, name: "Tan / Ong", score: 18 },
    },
    {
      sideA: { seed: 2, name: "Lim / Go", score: 21, winner: true },
      sideB: { seed: 7, name: "Sy / Vidal", score: 11 },
    },
    {
      sideA: { seed: 3, name: "Perez / Niño", score: null },
      sideB: { seed: 6, name: "Flores / Torres", score: null },
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-5 bg-vs-black">
      {/* Division tabs */}
      <div className="flex gap-1 bg-white/4 rounded-xl p-1 mb-5">
        {DIVISIONS.map((d, i) => (
          <button
            key={i}
            onClick={() => setActiveDiv(i)}
            className={cn(
              "flex-1 py-2 rounded-lg text-[12px] font-body font-semibold transition-all",
              activeDiv === i
                ? "bg-vs-card border border-vs-border text-vs-text"
                : "text-vs-muted hover:text-vs-sub",
            )}
          >
            {d}
          </button>
        ))}
      </div>

      <Card>
        <div className="px-4 py-3.5 border-b border-vs-border flex items-center justify-between">
          <span className="font-body font-semibold text-[13px]">
            Sunday League #8 · {DIVISIONS[activeDiv]}
          </span>
          <Button variant="primary" size="sm">
            Generate Bracket
          </Button>
        </div>
        <div className="overflow-x-auto p-4">
          <div className="flex gap-4 min-w-[600px]">
            <div className="flex-1">
              <p className="font-body font-semibold text-[9px] tracking-widest uppercase text-vs-muted text-center mb-3">
                Quarterfinals
              </p>
              {QF.map((m, i) => (
                <BracketMatch key={i} match={m} />
              ))}
            </div>
            <div className="flex-1">
              <p className="font-body font-semibold text-[9px] tracking-widest uppercase text-vs-muted text-center mb-3">
                Semifinals
              </p>
              <div className="mt-7">
                <BracketMatch
                  match={{
                    sideA: { name: "Santos / Reyes", score: 18 },
                    sideB: { name: "Cruz / Uy", score: 14 },
                  }}
                  live
                />
              </div>
              <div className="mt-11">
                <BracketMatch
                  match={{
                    sideA: { name: "Lim / Go", score: null },
                    sideB: { name: "Winner QF4", score: null },
                  }}
                />
              </div>
            </div>
            <div className="flex-1">
              <p className="font-body font-semibold text-[9px] tracking-widest uppercase text-vs-muted text-center mb-3">
                Final
              </p>
              <div className="mt-24">
                <BracketMatch
                  match={{
                    sideA: { name: "Winner SF1", score: null },
                    sideB: { name: "Winner SF2", score: null },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
