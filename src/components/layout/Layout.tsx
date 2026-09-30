import { Outlet } from "react-router-dom";
import { SkipLink } from "@/components/layout/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { ConnectDock } from "@/components/layout/ConnectDock";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MetaPixel } from "@/components/MetaPixel";
import { GoogleTag } from "@/components/GoogleTag";

export function Layout() {
  return (
    <>
      <ScrollToTop />
      <MetaPixel />
      <GoogleTag />
      <SkipLink />
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <ConnectDock />
    </>
  );
}
