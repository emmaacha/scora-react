import { Card } from "@/components/ui";
import { MOCK_COURTS } from "@/lib/mockData";

export default function VenuesPage() {
  return (
    <div className="flex-1 overflow-y-auto p-5 bg-vs-black">
      <p className="font-head font-bold text-[15px] tracking-wide text-vs-text mb-4">
        Cebu Sports Complex
      </p>
      <div className="grid grid-cols-3 gap-3">
        {MOCK_COURTS.map((c) => (
          <Card key={c.id} hover className="p-5 text-center">
            <p className="font-body text-[10px] text-vs-muted mb-1">
              {c.venueName}
            </p>
            <p className="font-head font-black text-5xl text-vs-lime leading-none mb-3">
              {c.number}
            </p>
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              style={{
                background:
                  c.status === "occupied"
                    ? "rgba(239,68,68,0.15)"
                    : "rgba(34,197,94,0.15)",
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor:
                    c.status === "occupied" ? "#EF4444" : "#22C55E",
                }}
              />
              <span
                className="font-body font-bold text-[10px]"
                style={{
                  color: c.status === "occupied" ? "#EF4444" : "#22C55E",
                }}
              >
                {c.status === "occupied" ? "Occupied" : "Available"}
              </span>
            </div>
            {c.currentMatch && (
              <p className="font-body text-[11px] text-vs-muted mt-2 leading-snug">
                {c.currentMatch}
              </p>
            )}
          </Card>
        ))}
        <Card
          hover
          className="p-5 flex flex-col items-center justify-center min-h-[130px] border-dashed bg-transparent"
        >
          <div className="text-2xl text-vs-muted mb-1.5">+</div>
          <p className="font-body font-medium text-[12px] text-vs-muted">
            Add Venue
          </p>
        </Card>
      </div>
    </div>
  );
}
