import { Suspense, type ReactElement } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { lazyPage, type LazyPage } from "@/lib/lazyPage";

// Every page is its own chunk (see lib/lazyPage.tsx), so a visitor only
// downloads the code and copy for the page they open. Page content modules
// must only be imported from inside pages, never from here, or they are
// pulled back into the main bundle.

const Home = lazyPage(() => import("@/pages/Home").then((m) => m.Home));
const About = lazyPage(() => import("@/pages/About").then((m) => m.About));
const Services = lazyPage(() => import("@/pages/Services").then((m) => m.Services));
const Technology = lazyPage(() => import("@/pages/Technology").then((m) => m.Technology));
const TechnologyDetail = lazyPage(() => import("@/pages/TechnologyDetail").then((m) => m.TechnologyDetail));
const Industries = lazyPage(() => import("@/pages/Industries").then((m) => m.Industries));
const IndustryDetail = lazyPage(() => import("@/pages/IndustryDetail").then((m) => m.IndustryDetail));
const Methodology = lazyPage(() => import("@/pages/Methodology").then((m) => m.Methodology));
const GrowthOS = lazyPage(() => import("@/pages/GrowthOS").then((m) => m.GrowthOS));
const AISolutions = lazyPage(() => import("@/pages/AISolutions").then((m) => m.AISolutions));
const CaseStudies = lazyPage(() => import("@/pages/CaseStudies").then((m) => m.CaseStudies));
const Insights = lazyPage(() => import("@/pages/Insights").then((m) => m.Insights));
const InsightArticle = lazyPage(() => import("@/pages/InsightArticle").then((m) => m.InsightArticle));
const Careers = lazyPage(() => import("@/pages/Careers").then((m) => m.Careers));
const JobDetail = lazyPage(() => import("@/pages/JobDetail").then((m) => m.JobDetail));
const Contact = lazyPage(() => import("@/pages/Contact").then((m) => m.Contact));
const Assessment = lazyPage(() => import("@/pages/Assessment").then((m) => m.Assessment));
const Privacy = lazyPage(() => import("@/pages/Privacy").then((m) => m.Privacy));
const ReceptionistRoute = lazyPage(() => import("@/pages/routes/ReceptionistRoute").then((m) => m.ReceptionistRoute));
const AuGoogleBusinessProfile = lazyPage(() =>
  import("@/pages/AuGoogleBusinessProfile").then((m) => m.AuGoogleBusinessProfile),
);
const CityRoute = lazyPage(() => import("@/pages/routes/CityRoute").then((m) => m.CityRoute));
const InServicePage = lazyPage(() => import("@/pages/InServicePage").then((m) => m.InServicePage));
const NotFound = lazyPage(() => import("@/pages/NotFound").then((m) => m.NotFound));

type PageRoute = { path: string; page: LazyPage<never>; element: ReactElement };

const route = <P extends object>(path: string, page: LazyPage<P>, element: ReactElement): PageRoute => ({
  path,
  page: page as unknown as LazyPage<never>,
  element,
});

/**
 * Every route, in one list so main.tsx can find and preload the page for
 * the current URL before the first render. Static paths always beat
 * :slug paths in React Router, whatever the order here.
 *
 * The receptionist and city paths are listed by hand so this file doesn't
 * import their content. If one changes, change it here too: a path that
 * doesn't match its content renders the 404 page.
 */
export const pageRoutes: PageRoute[] = [
  route("/", Home, <Home />),
  route("/about", About, <About />),
  route("/services", Services, <Services />),
  route("/technology", Technology, <Technology />),
  route("/technology/:slug", TechnologyDetail, <TechnologyDetail />),
  route("/industries", Industries, <Industries />),
  route("/industries/:slug", IndustryDetail, <IndustryDetail />),
  route("/methodology", Methodology, <Methodology />),
  route("/growth-os", GrowthOS, <GrowthOS />),
  route("/ai-solutions", AISolutions, <AISolutions />),
  route("/case-studies", CaseStudies, <CaseStudies />),
  route("/insights", Insights, <Insights />),
  route("/insights/:slug", InsightArticle, <InsightArticle />),
  route("/careers", Careers, <Careers />),
  route("/careers/:slug", JobDetail, <JobDetail />),
  route("/contact", Contact, <Contact />),
  route("/assessment", Assessment, <Assessment />),
  route("/privacy", Privacy, <Privacy />),
  route("/au/ai-receptionist", ReceptionistRoute, <ReceptionistRoute />),
  route("/uk/ai-receptionist", ReceptionistRoute, <ReceptionistRoute />),
  route("/us/ai-receptionist", ReceptionistRoute, <ReceptionistRoute />),
  route("/au/google-business-profile", AuGoogleBusinessProfile, <AuGoogleBusinessProfile />),
  route("/in/business-consultant-pune", CityRoute, <CityRoute />),
  route("/au/ai-process-consulting-melbourne", CityRoute, <CityRoute />),
  route("/in/:slug", InServicePage, <InServicePage />),
  route("/au/:slug", InServicePage, <InServicePage region="au" />),
  route("/uk/:slug", InServicePage, <InServicePage region="uk" />),
  route("/us/:slug", InServicePage, <InServicePage region="us" />),
  route("*", NotFound, <NotFound />),
];

export const allPages = [...new Set(pageRoutes.map((r) => r.page))];

export default function App() {
  // Keyed by path so a page that is still loading never shows the
  // previous page's content under the new URL.
  const { pathname } = useLocation();
  return (
    <Routes>
      <Route element={<Layout />}>
        {pageRoutes.map((r) => (
          <Route
            key={r.path}
            path={r.path}
            element={
              <Suspense key={pathname} fallback={<div className="min-h-[100svh]" aria-busy="true" />}>
                {r.element}
              </Suspense>
            }
          />
        ))}
      </Route>
    </Routes>
  );
}
