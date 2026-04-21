// src/pages/DashboardPage.tsx
import { Badge, Button, Card, CardHeader, CardBody, StatCard, LiveDot, SectionHeader } from '@/components/ui'
import { MOCK_LIVE_MATCHES, MOCK_UPCOMING, MOCK_ACTIVITY } from '@/lib/mockData'
import type { Match, UpcomingMatch, ActivityItem } from '@/types'

// ── Live Match Card ───────────────────────────────────────────
function LiveMatchCard({ match, onGoScore }: { match: Match; onGoScore?: () => void }) {
  const leading = match.scoreA > match.scoreB ? 'a' : match.scoreB > match.scoreA ? 'b' : null

  return (
    <Card className="mb-3 animate-fade-in">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-red-500/8 border-b border-red-500/15">
        <LiveDot />
        <span className="font-body font-semibold text-[10px] tracking-widest uppercase text-vs-muted flex-1">
          Court {match.courtNumber} · {match.divisionName} · Set {match.sets.length + 1}
        </span>
        <Badge variant="live">Live</Badge>
      </div>

      <div className="px-6 py-5">
        <div className="flex items-center gap-6">
          {/* Team A */}
          <div className="flex-1 text-center">
            <p className="font-head font-semibold text-[13px] tracking-widest uppercase text-vs-sub mb-2 truncate">{match.teamA}</p>
            <p className="font-head font-black leading-none" style={{ fontSize: 72, color: leading === 'a' ? '#CCFF33' : leading === 'b' ? '#52525B' : '#FAFAFA' }}>
              {match.scoreA}
            </p>
            {match.sets.length > 0 && (
              <div className="flex gap-1 justify-center mt-2">
                {match.sets.map((s) => (
                  <span key={s.setNumber}
                    className="px-2 py-0.5 rounded text-[10px] font-head font-bold"
                    style={{ background: s.winner === 'a' ? 'rgba(204,255,51,0.12)' : 'rgba(255,255,255,0.05)', color: s.winner === 'a' ? '#CCFF33' : '#52525B' }}
                  >{s.scoreA}</span>
                ))}
              </div>
            )}
          </div>

          <span className="font-head text-2xl font-black text-vs-border flex-shrink-0">VS</span>

          {/* Team B */}
          <div className="flex-1 text-center">
            <p className="font-head font-semibold text-[13px] tracking-widest uppercase text-vs-sub mb-2 truncate">{match.teamB}</p>
            <p className="font-head font-black leading-none" style={{ fontSize: 72, color: leading === 'b' ? '#CCFF33' : leading === 'a' ? '#52525B' : '#FAFAFA' }}>
              {match.scoreB}
            </p>
            {match.sets.length > 0 && (
              <div className="flex gap-1 justify-center mt-2">
                {match.sets.map((s) => (
                  <span key={s.setNumber}
                    className="px-2 py-0.5 rounded text-[10px] font-head font-bold"
                    style={{ background: s.winner === 'b' ? 'rgba(204,255,51,0.12)' : 'rgba(255,255,255,0.05)', color: s.winner === 'b' ? '#CCFF33' : '#52525B' }}
                  >{s.scoreB}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {onGoScore && (
          <Button variant="primary" className="w-full mt-4" onClick={onGoScore}>
            Go to Live Scoring →
          </Button>
        )}
      </div>
    </Card>
  )
}

// ── Upcoming Row ──────────────────────────────────────────────
function UpcomingRow({ match, last }: { match: UpcomingMatch; last: boolean }) {
  return (
    <div className={`flex items-center px-4 py-3 ${!last ? 'border-b border-white/5' : ''}`}>
      <div className="flex-1 min-w-0">
        <p className="font-body font-medium text-[13px] text-vs-text truncate">{match.players}</p>
        <div className="mt-1"><Badge variant="upcoming">{match.division}</Badge></div>
      </div>
      <div className="text-right ml-3">
        <p className="font-body font-semibold text-[12px] text-vs-amber">{match.time}</p>
        <p className="font-body text-[11px] text-vs-muted">Court {match.court}</p>
      </div>
    </div>
  )
}

// ── Activity Row ──────────────────────────────────────────────
function ActivityRow({ item, last }: { item: ActivityItem; last: boolean }) {
  return (
    <div className={`flex items-start gap-3 px-4 py-3 ${!last ? 'border-b border-white/5' : ''}`}>
      <div className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
      <div className="flex-1 min-w-0">
        <p className="font-body text-[13px] text-vs-text leading-relaxed">{item.message}</p>
        <p className="font-body text-[11px] text-vs-muted mt-0.5">{item.time}</p>
      </div>
    </div>
  )
}

// ── Dashboard Page ────────────────────────────────────────────
interface DashboardPageProps { onNav: (screen: string) => void }

export default function DashboardPage({ onNav }: DashboardPageProps) {
  return (
    <div className="flex-1 overflow-y-auto p-5 bg-vs-black">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        <StatCard label="Live Now"          value={2}  sub="matches in progress" accent />
        <StatCard label="Active Tournaments" value={3}  sub="this season" />
        <StatCard label="Players Registered" value={48} sub="across all divisions" />
        <StatCard label="Today's Matches"    value={9}  sub="6 completed" />
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* Left col */}
        <div>
          <SectionHeader title="Live Matches" action="Score →" onAction={() => onNav('scoring')} />
          {MOCK_LIVE_MATCHES.map((m, i) => (
            <LiveMatchCard key={m.id} match={m} onGoScore={i === 0 ? () => onNav('scoring') : undefined} />
          ))}
        </div>

        {/* Right col */}
        <div>
          <SectionHeader title="Upcoming Matches" />
          <Card className="mb-5">
            <CardBody>
              {MOCK_UPCOMING.map((m, i) => (
                <UpcomingRow key={m.id} match={m} last={i === MOCK_UPCOMING.length - 1} />
              ))}
            </CardBody>
          </Card>

          <SectionHeader title="Activity Feed" />
          <Card>
            <CardBody>
              {MOCK_ACTIVITY.map((a, i) => (
                <ActivityRow key={a.id} item={a} last={i === MOCK_ACTIVITY.length - 1} />
              ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
