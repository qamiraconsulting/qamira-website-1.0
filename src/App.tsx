import { Route, Routes } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { Services } from "@/pages/Services";
import { Technology } from "@/pages/Technology";
import { TechnologyDetail } from "@/pages/TechnologyDetail";
import { Industries } from "@/pages/Industries";
import { Methodology } from "@/pages/Methodology";
import { GrowthOS } from "@/pages/GrowthOS";
import { AISolutions } from "@/pages/AISolutions";
import { CaseStudies } from "@/pages/CaseStudies";
import { Insights } from "@/pages/Insights";
import { InsightArticle } from "@/pages/InsightArticle";
import { Careers } from "@/pages/Careers";
import { Contact } from "@/pages/Contact";
import { Assessment } from "@/pages/Assessment";
import { Privacy } from "@/pages/Privacy";
import { NotFound } from "@/pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/technology/:slug" element={<TechnologyDetail />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/methodology" element={<Methodology />} />
        <Route path="/growth-os" element={<GrowthOS />} />
        <Route path="/ai-solutions" element={<AISolutions />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/insights/:slug" element={<InsightArticle />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
