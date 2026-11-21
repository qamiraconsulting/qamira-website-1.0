import { useLocation } from "react-router-dom";
import { AiReceptionistPage } from "@/pages/AiReceptionistPage";
import { NotFound } from "@/pages/NotFound";
import { receptionistPages } from "@/data/content/receptionist";

// Picks the AI receptionist content for the current path. App.tsx lists
// the paths by hand so it doesn't have to import this content.
export function ReceptionistRoute() {
  const { pathname } = useLocation();
  const page = receptionistPages.find((p) => p.path === pathname.replace(/\/$/, ""));
  return page ? <AiReceptionistPage content={page} /> : <NotFound />;
}
