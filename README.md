# Scora React — Web App

React + TypeScript + Tailwind frontend for Scora - A tournament score management platform.

---

## Tech Stack

| Layer        | Choice                | s Why                                                      |
| ------------ | --------------------- | ---------------------------------------------------------- |
| Framework    | React 18 + TypeScript | Type-safety across the whole codebase                      |
| Build tool   | Vite                  | Fast HMR, instant dev server                               |
| Styling      | Tailwind CSS v3       | Utility-first, design tokens as config                     |
| Server state | TanStack Query v5     | Caching, loading/error states, refetch, optimistic updates |
| Client state | Zustand v5            | Lightweight, no boilerplate, TypeScript-native             |
| HTTP client  | Axios                 | Interceptors for auth token + error normalization          |
| Real-time    | Native WebSocket      | Live score sync across scorekeeping devices                |

### Why Zustand over Redux?

Redux is the right tool for very large teams with complex, deeply-shared state trees and strict audit trails. For this app:

- State is scoped: auth/org context + live scoring — these are small, independent slices
- Zustand requires zero boilerplate (no actions/reducers/selectors ceremony)
- TypeScript support is first-class
- Bundle size is ~3KB vs Redux Toolkit's ~40KB

---

## Project Structure

```
src/
├── components/
│   ├── ui/           # Badge, Button, Card, Avatar, Chip, Input… (reusable primitives)
│   └── layout/       # Sidebar, Topbar (structural chrome)
├── pages/            # Screen-level components (one per route)
│   ├── DashboardPage.tsx
│   ├── ScoringPage.tsx
│   ├── TournamentsPage.tsx
│   ├── BracketPage.tsx
│   ├── PlayersPage.tsx
│   ├── VenuesPage.tsx
│   ├── RolesPage.tsx
│   └── NewTournamentPage.tsx
├── store/
│   ├── appStore.ts   # Auth, active org, UI state (persisted to localStorage)
│   └── scoringStore.ts # Live match score state (ephemeral)
├── services/         # Raw API call functions (axios wrappers)
│   ├── tournaments.service.ts
│   ├── matches.service.ts
│   └── index.ts      # players, venues, roles services
├── hooks/            # TanStack Query wrappers over services
│   ├── useTournaments.ts
│   └── useMatches.ts  # includes useLiveScoringSocket()
├── lib/
│   ├── axios.ts      # Axios instance with auth + error interceptors
│   ├── queryClient.ts # TanStack Query client config
│   ├── websocket.ts  # WebSocket singleton for live scoring
│   ├── mockData.ts   # Development mock data (replace with real API)
│   └── utils.ts      # cn(), formatDate(), getInitials()
└── types/
    └── index.ts      # All TypeScript interfaces and types
```

---

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:5173

---

## Connecting to the Backend

The app is structured so swapping mock data for real API calls is a one-file-at-a-time job.

### Step 1 — Point to your backend

```env
# .env.local
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_WS_BASE_URL=ws://localhost:8080/ws
```

### Step 2 — Replace mock data in pages

Each page currently uses `MOCK_*` data from `src/lib/mockData.ts`. Replace with the hook:

```tsx
// Before (mock)
import { MOCK_TOURNAMENTS } from "@/lib/mockData";
const tournaments = MOCK_TOURNAMENTS;

// After (real API via TanStack Query)
import { useTournaments } from "@/hooks/useTournaments";
const { data: tournaments, isLoading, error } = useTournaments();
```

### Step 3 — Enable live scoring WebSocket

In `ScoringPage.tsx`, uncomment the socket hook:

```tsx
import { useLiveScoringSocket } from "@/hooks/useMatches";
useLiveScoringSocket(match?.id ?? null);
```

### Step 4 — Wire mutations

Replace placeholder buttons with real mutation hooks:

```tsx
import { useCreateTournament } from "@/hooks/useTournaments";
const { mutate: createTournament, isPending } = useCreateTournament();

// In form submit:
createTournament(formData, {
  onSuccess: () => onNav("tournaments"),
  onError: (err) => console.error(err),
});
```

---

## State Management Guide

### AppStore (Zustand — persisted)

```ts
const { user, activeOrg, setUser, logout } = useAppStore();
```

Persists to `localStorage` key `vs-app-storage`. Clears on logout.

### ScoringStore (Zustand — ephemeral)

```ts
const { scoreA, scoreB, addPoint, undoLastPoint, addFault } = useScoringStore();
```

Lives only in memory. Resets when `resetScoring()` is called (e.g., on match end).

### Server State (TanStack Query)

All data that lives on the server (tournaments, players, matches) goes through React Query hooks — never stored in Zustand.

---

## API Service Pattern

Every service file exports a plain object of async functions:

```ts
// Call directly (rarely)
const response = await tournamentsService.getAll(orgId);

// Preferred — via hook (caching, loading state, etc.)
const { data } = useTournaments();
```

Auth token is attached automatically via the Axios request interceptor in `src/lib/axios.ts`.
