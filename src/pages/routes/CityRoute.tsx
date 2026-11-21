import { useLocation } from "react-router-dom";
import { CityConsultingPage } from "@/pages/CityConsultingPage";
import { NotFound } from "@/pages/NotFound";
import { cityConsultingPages } from "@/data/content/cityConsulting";

// Picks the city consulting content for the current path. App.tsx lists
// the paths by hand so it doesn't have to import this content.
export function CityRoute() {
  const { pathname } = useLocation();
  const page = cityConsultingPages.find((p) => p.path === pathname.replace(/\/$/, ""));
  return page ? <CityConsultingPage page={page} /> : <NotFound />;
}
