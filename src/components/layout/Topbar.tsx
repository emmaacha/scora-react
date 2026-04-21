import { Badge, Button } from "@/components/ui";
import { useAppStore } from "@/store/appStore";

const SCREEN_TITLES: Record<string, string> = {
  dashboard: "Dashboard",
  tournaments: "Tournaments",
  scoring: "Live Scoring",
  bracket: "Brackets",
  players: "Players",
  venues: "Venues & Courts",
  roles: "Roles & Permissions",
  "new-tournament": "New Tournament",
};

interface TopbarProps {
  screen: string;
  onNav: (screen: string) => void;
}

export default function Topbar({ screen, onNav }: TopbarProps) {
  const { user } = useAppStore();

  return (
    <header className="h-[54px] bg-vs-surface border-b border-vs-border flex items-center px-5 gap-3 flex-shrink-0">
      <h1 className="font-head text-xl font-bold tracking-wide flex-1 text-vs-text">
        {SCREEN_TITLES[screen] ?? ""}
      </h1>

      <div className="flex items-center gap-2">
        {screen === "dashboard" && (
          <Button variant="primary" size="sm" onClick={() => onNav("scoring")}>
            + Score Match
          </Button>
        )}
        {screen === "tournaments" && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onNav("new-tournament")}
          >
            + New Tournament
          </Button>
        )}
        {screen === "players" && (
          <Button variant="primary" size="sm">
            + Add Player
          </Button>
        )}
        {screen === "venues" && (
          <Button variant="primary" size="sm">
            + Add Court
          </Button>
        )}
        {screen === "roles" && (
          <Button variant="primary" size="sm">
            + New Role
          </Button>
        )}
        {screen === "scoring" && <Badge variant="live">Live</Badge>}
      </div>

      {/* User avatar */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-vs-blue to-vs-purple flex items-center justify-center font-head text-[12px] font-bold text-white cursor-pointer flex-shrink-0">
        {user?.initials ?? "JD"}
      </div>
    </header>
  );
}
