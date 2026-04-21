// ── Auth / User ───────────────────────────────────────────────
export interface User {
  id: string;
  email: string;
  name: string;
  initials: string;
  isSystemAdmin: boolean;
  createdAt: string;
}

// ── Organisation ──────────────────────────────────────────────
export interface Organization {
  id: string;
  name: string;
  abbr: string;
  sport: string;
  ownerId: string;
  createdAt: string;
}

export interface OrganizationMember {
  id: string;
  userId: string;
  organizationId: string;
  isOwner: boolean;
  user: User;
  roles: Role[];
}

// ── PBAC ──────────────────────────────────────────────────────
export type PermissionKey =
  | "org:edit"
  | "member:manage"
  | "role:manage"
  | "tournament:create"
  | "tournament:manage"
  | "division:manage"
  | "match:call"
  | "match:score"
  | "match:manage"
  | "venue:manage";

export interface Permission {
  id: string;
  key: PermissionKey;
  description: string;
}

export interface Role {
  id: string;
  organizationId: string;
  name: string;
  abbr: string;
  color: string;
  isSystem: boolean;
  memberCount: number;
  permissions: PermissionKey[];
}

// ── Venue / Court ─────────────────────────────────────────────
export interface Venue {
  id: string;
  organizationId: string;
  name: string;
  address?: string;
}

export type CourtStatus = "free" | "occupied";

export interface Court {
  id: string;
  venueId: string;
  venueName: string;
  number: number;
  status: CourtStatus;
  currentMatch?: string;
}

// ── Tournament ────────────────────────────────────────────────
export type TournamentStatus = "draft" | "open" | "upcoming" | "live" | "done";
export type TournamentFormat =
  | "single_elimination"
  | "double_elimination"
  | "round_robin"
  | "swiss";

export interface Tournament {
  id: string;
  organizationId: string;
  name: string;
  sport: string;
  sportIcon: string;
  date: string;
  venueId: string;
  venueName: string;
  format: TournamentFormat;
  status: TournamentStatus;
  progress: number;
  divisionCount: number;
  playerCount: number;
  createdAt: string;
}

export interface Division {
  id: string;
  tournamentId: string;
  name: string;
  gender: "mens" | "womens" | "mixed" | "open";
  maxEntries: number;
  entryCount: number;
}

// ── Player ────────────────────────────────────────────────────
export type PlayerStatus = "active" | "live" | "upcoming" | "inactive";

export interface Player {
  id: string;
  organizationId: string;
  userId?: string;
  name: string;
  initials: string;
  handle: string;
  color: string;
  division: string;
  partner: string;
  wins: number;
  losses: number;
  status: PlayerStatus;
}

// ── Match ─────────────────────────────────────────────────────
export type MatchStatus = "scheduled" | "live" | "completed" | "forfeit";
export type MatchSide = "a" | "b";

export interface SetScore {
  setNumber: number;
  scoreA: number;
  scoreB: number;
  winner?: MatchSide;
}

export interface Match {
  id: string;
  tournamentId: string;
  divisionId: string;
  divisionName: string;
  courtId?: string;
  courtNumber?: number;
  status: MatchStatus;
  round: string;
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  sets: SetScore[];
  scheduledAt?: string;
  startedAt?: string;
  completedAt?: string;
}

export type MatchEventType = "point" | "fault" | "let" | "status_change";

export interface MatchEvent {
  id: string;
  matchId: string;
  type: MatchEventType;
  side?: MatchSide;
  scoreA: number;
  scoreB: number;
  setNumber: number;
  notes?: string;
  createdAt: string;
  createdBy: string;
}

// ── Bracket ───────────────────────────────────────────────────
export interface BracketSlot {
  matchId?: string;
  seed?: number;
  name: string;
  score: number | null;
  winner: boolean;
  live: boolean;
}

export interface BracketMatch {
  id: string;
  round: string;
  sideA: BracketSlot;
  sideB: BracketSlot;
}

// ── API Response Wrappers ─────────────────────────────────────
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiError {
  message: string;
  code?: string;
  statusCode: number;
}

// ── UI / State helpers ────────────────────────────────────────
export interface ActivityItem {
  id: string;
  color: string;
  message: string;
  time: string;
}

export interface UpcomingMatch {
  id: string;
  players: string;
  division: string;
  court: number;
  time: string;
}
