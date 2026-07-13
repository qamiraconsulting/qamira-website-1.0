import { SignIn, useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { Seo } from "@/lib/Seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { clerkAppearance } from "@/lib/clerkAppearance";

export function Login() {
  const { isLoaded, isSignedIn } = useAuth();

  if (isLoaded && isSignedIn) {
    return <Navigate to="/portal" replace />;
  }

  return (
    <>
      <Seo
        title="Login"
        path="/login"
        description="SSO-ready sign-in for Qamira clients and consultants."
      />
      <PageHero
        eyebrow="Client access"
        title="Sign in to your Qamira workspace."
        lede="For clients and consultants with an active engagement. Enterprise SSO available on request."
        breadcrumbLabel="Login"
      />
      <Section tone="white">
        <Container>
          <Reveal className="flex justify-center">
            <SignIn appearance={clerkAppearance} />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
