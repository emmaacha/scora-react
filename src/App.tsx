import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import DashboardPage from "@/pages/DashboardPage";
import TournamentsPage from "@/pages/TournamentsPage";
import ScoringPage from "@/pages/ScoringPage";
import BracketPage from "@/pages/BracketPage";
import PlayersPage from "@/pages/PlayersPage";
import VenuesPage from "@/pages/VenuesPage";
import RolesPage from "@/pages/RolesPage";
import NewTournamentPage from "@/pages/NewTournamentPage";

type Screen =
  | "dashboard"
  | "tournaments"
  | "scoring"
  | "bracket"
  | "players"
  | "venues"
  | "roles"
  | "new-tournament";

export default function App() {
  const [screen, setScreen] = useState<Screen>("dashboard");

  const nav = (s: string) => setScreen(s as Screen);

  const renderScreen = () => {
    switch (screen) {
      case "dashboard":
        return <DashboardPage onNav={nav} />;
      case "tournaments":
        return <TournamentsPage onNav={nav} />;
      case "scoring":
        return <ScoringPage onNav={nav} />;
      case "bracket":
        return <BracketPage />;
      case "players":
        return <PlayersPage />;
      case "venues":
        return <VenuesPage />;
      case "roles":
        return <RolesPage />;
      case "new-tournament":
        return <NewTournamentPage onNav={nav} />;
      default:
        return <DashboardPage onNav={nav} />;
    }
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-vs-black">
      <Sidebar current={screen} onNav={nav} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar screen={screen} onNav={nav} />
        <main className="flex flex-1 overflow-hidden">{renderScreen()}</main>
      </div>
    </div>
  );
}
