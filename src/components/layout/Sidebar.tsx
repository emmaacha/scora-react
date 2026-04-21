import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/appStore";

interface NavItem {
  id: string;
  label: string;
  section?: string;
  badge?: number;
  livePulse?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", section: "Overview", badge: 2 },
  { id: "tournaments", label: "Tournaments", section: "Competitions" },
  { id: "scoring", label: "Live Scoring", livePulse: true },
  { id: "bracket", label: "Brackets" },
  { id: "players", label: "Players", section: "Manage" },
  { id: "venues", label: "Venues & Courts" },
  { id: "roles", label: "Roles & Permissions" },
];

const NavIcons: Record<string, (active: boolean) => JSX.Element> = {
  dashboard: (a) => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <rect
        x="1"
        y="1"
        width="5.5"
        height="5.5"
        rx="1.5"
        fill={a ? "#CCFF33" : "#52525B"}
      />
      <rect
        x="8.5"
        y="1"
        width="5.5"
        height="5.5"
        rx="1.5"
        fill={a ? "#CCFF33" : "#52525B"}
        opacity="0.5"
      />
      <rect
        x="1"
        y="8.5"
        width="5.5"
        height="5.5"
        rx="1.5"
        fill={a ? "#CCFF33" : "#52525B"}
        opacity="0.5"
      />
      <rect
        x="8.5"
        y="8.5"
        width="5.5"
        height="5.5"
        rx="1.5"
        fill={a ? "#CCFF33" : "#52525B"}
        opacity="0.5"
      />
    </svg>
  ),
  tournaments: (a) => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path
        d="M7.5 1.5l1.8 3.7h3.9l-3.1 2.3.9 3.9-3.5-2.1-3.5 2.1.9-3.9-3.1-2.3h3.9z"
        fill={a ? "#CCFF33" : "#52525B"}
        opacity="0.85"
      />
    </svg>
  ),
  scoring: (a) => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <circle
        cx="7.5"
        cy="7.5"
        r="5.5"
        stroke={a ? "#CCFF33" : "#52525B"}
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M5 7.5h5M7.5 5v5"
        stroke={a ? "#CCFF33" : "#52525B"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  bracket: (a) => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <rect
        x="1"
        y="2"
        width="4"
        height="3"
        rx="1"
        stroke={a ? "#CCFF33" : "#52525B"}
        strokeWidth="1.2"
        fill="none"
      />
      <rect
        x="10"
        y="2"
        width="4"
        height="3"
        rx="1"
        stroke={a ? "#CCFF33" : "#52525B"}
        strokeWidth="1.2"
        fill="none"
      />
      <rect
        x="10"
        y="10"
        width="4"
        height="3"
        rx="1"
        stroke={a ? "#CCFF33" : "#52525B"}
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M5 3.5h3.5M12 5v5M5 11.5h3.5"
        stroke={a ? "#CCFF33" : "#52525B"}
        strokeWidth="1.2"
      />
    </svg>
  ),
  players: (a) => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <circle
        cx="5.5"
        cy="4.5"
        r="2.5"
        stroke={a ? "#CCFF33" : "#52525B"}
        strokeWidth="1.3"
        fill="none"
      />
      <path
        d="M1 13.5c0-2.5 2-3.5 4.5-3.5s4.5 1 4.5 3.5"
        stroke={a ? "#CCFF33" : "#52525B"}
        strokeWidth="1.3"
        fill="none"
      />
      <circle
        cx="11.5"
        cy="5"
        r="2"
        stroke={a ? "#CCFF33" : "#52525B"}
        strokeWidth="1.1"
        fill="none"
        opacity="0.5"
      />
    </svg>
  ),
  venues: (a) => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path
        d="M2.5 13.5V6L7.5 2l5 4v7.5H2.5z"
        stroke={a ? "#CCFF33" : "#52525B"}
        strokeWidth="1.3"
        fill="none"
      />
      <rect
        x="5.5"
        y="9"
        width="4"
        height="4.5"
        rx=".5"
        stroke={a ? "#CCFF33" : "#52525B"}
        strokeWidth="1.1"
        fill="none"
      />
    </svg>
  ),
  roles: (a) => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path
        d="M2 4h11M2 7.5h7M2 11h5"
        stroke={a ? "#CCFF33" : "#52525B"}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  ),
};

interface SidebarProps {
  current: string;
  onNav: (screen: string) => void;
}

export default function Sidebar({ current, onNav }: SidebarProps) {
  const { activeOrg } = useAppStore();
  let lastSection: string | null = null;

  return (
    <aside className="w-[220px] bg-vs-surface border-r border-vs-border flex flex-col flex-shrink-0 h-full">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-vs-border">
        <div className="font-head text-[22px] font-black tracking-wider text-vs-text">
          SCORA<span className="text-vs-lime">.</span>
        </div>
        <div className="font-body text-[9px] text-vs-muted tracking-[2.5px] uppercase mt-0.5">
          Score & Tournament
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {NAV_ITEMS.map((item) => {
          const showSection = item.section && item.section !== lastSection;
          if (item.section) lastSection = item.section;
          const active = current === item.id;
          const Icon = NavIcons[item.id];

          return (
            <div key={item.id}>
              {showSection && (
                <p className="font-body font-semibold text-[9px] text-vs-muted tracking-[1.5px] uppercase px-2.5 pt-3 pb-1.5">
                  {item.section}
                </p>
              )}
              <button
                onClick={() => onNav(item.id)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-body font-medium",
                  "transition-all duration-150 mb-0.5 border",
                  active
                    ? "bg-vs-lime/10 text-vs-lime border-vs-lime/15"
                    : "text-vs-muted hover:bg-white/4 hover:text-vs-text border-transparent",
                )}
              >
                {Icon?.(active)}
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <span className="bg-vs-lime text-vs-black text-[9px] font-black px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
                {item.livePulse && (
                  <span className="w-1.5 h-1.5 rounded-full bg-vs-red animate-pulse-slow" />
                )}
              </button>
            </div>
          );
        })}
      </nav>

      {/* Org tag */}
      <div className="mx-2 mb-2 bg-blue-500/10 border border-blue-500/20 rounded-lg p-2.5 flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-vs-blue flex items-center justify-center font-head text-[11px] font-bold text-white flex-shrink-0">
          {activeOrg?.abbr ?? "CS"}
        </div>
        <div>
          <p className="font-body font-semibold text-[12px] text-vs-text leading-none">
            {activeOrg?.name ?? "Cebu Smash FC"}
          </p>
          <p className="font-body text-[10px] text-vs-muted mt-0.5">Owner</p>
        </div>
      </div>
    </aside>
  );
}
