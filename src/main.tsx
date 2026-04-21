import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/queryClient";
import App from "./App";

import "./index.css";

// Seed app store with mock org/user for dev (remove when auth is wired up)
import { useAppStore } from "@/store/appStore";
const { setUser, setActiveOrg } = useAppStore.getState();

setUser(
  {
    id: "u1",
    email: "jamie@cebsmash.ph",
    name: "Jamie Dela Cruz",
    initials: "JD",
    isSystemAdmin: false,
    createdAt: "",
  },
  "dev-token-placeholder",
);
setActiveOrg({
  id: "org1",
  name: "Cebu Smash FC",
  abbr: "CS",
  sport: "Badminton",
  ownerId: "u1",
  createdAt: "",
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  </StrictMode>,
);
