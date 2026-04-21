import { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Chip,
  Divider,
  Input,
  Select,
} from "@/components/ui";

interface DivisionRow {
  id: string;
  name: string;
  gender: string;
  max: string;
}

const FORMATS = [
  "Single Elimination",
  "Double Elimination",
  "Round Robin",
  "Swiss",
];
const SPORTS = [
  { value: "badminton", label: "🏸 Badminton" },
  { value: "table_tennis", label: "🏓 Table Tennis" },
  { value: "volleyball", label: "🏐 Volleyball" },
  { value: "basketball", label: "🏀 Basketball" },
  { value: "other", label: "🎯 Other" },
];
const VENUES = [
  { value: "v1", label: "Cebu Sports Complex" },
  { value: "v2", label: "SM Seaside Gym" },
  { value: "v3", label: "IT Park Activity Center" },
];
const GENDERS = [
  { value: "mens", label: "Men's" },
  { value: "womens", label: "Women's" },
  { value: "mixed", label: "Mixed" },
  { value: "open", label: "Open" },
];

export default function NewTournamentPage({
  onNav,
}: {
  onNav: (s: string) => void;
}) {
  const [format, setFormat] = useState("Single Elimination");
  const [divisions, setDivisions] = useState<DivisionRow[]>([
    { id: "1", name: "Men's Doubles – Open", gender: "mens", max: "16" },
    { id: "2", name: "Women's Doubles", gender: "womens", max: "8" },
  ]);

  const addDiv = () =>
    setDivisions((d) => [
      ...d,
      {
        id: String(Date.now()),
        name: "New Division",
        gender: "open",
        max: "8",
      },
    ]);

  const removeDiv = (id: string) =>
    setDivisions((d) => d.filter((x) => x.id !== id));

  const updateDiv = (id: string, field: keyof DivisionRow, value: string) =>
    setDivisions((d) =>
      d.map((x) => (x.id === id ? { ...x, [field]: value } : x)),
    );

  return (
    <div className="flex-1 overflow-y-auto p-5 bg-vs-black">
      <div className="max-w-[580px]">
        <Card>
          <CardHeader>
            <span className="font-head font-bold text-[16px] tracking-wide">
              Create Tournament
            </span>
          </CardHeader>
          <CardBody className="p-5">
            {/* Name + Sport */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <Input
                label="Tournament Name"
                placeholder="e.g. Sunday League #9"
              />
              <Select label="Sport" options={SPORTS} />
            </div>

            {/* Date + Venue */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <Input label="Date" type="date" />
              <Select label="Venue" options={VENUES} />
            </div>

            {/* Format */}
            <div className="mb-4">
              <label className="font-body font-semibold text-[11px] tracking-widest uppercase text-vs-muted block mb-2">
                Format
              </label>
              <div className="flex gap-2 flex-wrap">
                {FORMATS.map((f) => (
                  <Chip
                    key={f}
                    active={format === f}
                    onClick={() => setFormat(f)}
                  >
                    {f}
                  </Chip>
                ))}
              </div>
            </div>

            <Divider label="Divisions" />

            {/* Division table */}
            <Card className="mb-3">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    {["Division Name", "Category", "Max Entries", ""].map(
                      (h) => (
                        <th
                          key={h}
                          className="font-body font-semibold text-[10px] tracking-widest uppercase text-vs-muted px-3 py-2.5 text-left border-b border-vs-border"
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {divisions.map((div, i) => (
                    <tr
                      key={div.id}
                      className={
                        i < divisions.length - 1
                          ? "border-b border-white/5"
                          : ""
                      }
                    >
                      <td className="px-3 py-2">
                        <input
                          value={div.name}
                          onChange={(e) =>
                            updateDiv(div.id, "name", e.target.value)
                          }
                          className="w-full bg-white/4 border border-vs-border rounded-lg px-2 py-1.5 text-[12px] font-body text-vs-text outline-none focus:border-vs-lime/40"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <select
                          value={div.gender}
                          onChange={(e) =>
                            updateDiv(div.id, "gender", e.target.value)
                          }
                          className="bg-white/4 border border-vs-border rounded-lg px-2 py-1.5 text-[12px] font-body text-vs-text outline-none [&>option]:bg-vs-card"
                        >
                          {GENDERS.map((g) => (
                            <option key={g.value} value={g.value}>
                              {g.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 py-2">
                        <input
                          value={div.max}
                          onChange={(e) =>
                            updateDiv(div.id, "max", e.target.value)
                          }
                          className="w-16 bg-white/4 border border-vs-border rounded-lg px-2 py-1.5 text-[12px] font-body text-vs-text outline-none focus:border-vs-lime/40"
                        />
                      </td>
                      <td className="px-3 py-2 text-center">
                        <button
                          onClick={() => removeDiv(div.id)}
                          className="text-vs-red hover:text-red-400 text-lg leading-none transition-colors"
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-3 py-2.5 border-t border-vs-border">
                <Button variant="ghost" size="sm" onClick={addDiv}>
                  + Add Division
                </Button>
              </div>
            </Card>

            <div className="flex gap-2">
              <Button
                variant="ghost"
                className="flex-1"
                onClick={() => onNav("tournaments")}
              >
                Cancel
              </Button>
              <Button variant="primary" className="flex-1">
                Create Tournament →
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
