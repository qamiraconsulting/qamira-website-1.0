// Shared Clerk theming so every Clerk-rendered component (SignIn, UserButton,
// etc.) matches the site's design system instead of Clerk's default look.
export const clerkAppearance = {
  variables: {
    colorPrimary: "#b8863a",
    colorText: "#14182a",
    colorTextSecondary: "#4b4f60",
    colorBackground: "#ffffff",
    colorInputBackground: "#ffffff",
    colorInputText: "#14182a",
    fontFamily: '"IBM Plex Sans", -apple-system, "Segoe UI", sans-serif',
    borderRadius: "2px",
  },
  elements: {
    card: "shadow-none border border-charcoal/10",
    headerTitle: "font-display text-charcoal",
    headerSubtitle: "text-charcoal-dim",
    socialButtonsBlockButton: "border-charcoal/20 hover:border-brass",
    formButtonPrimary: "bg-brass hover:bg-brass-bright text-white font-mono text-xs uppercase tracking-[0.08em] normal-case",
    footerActionLink: "text-brass hover:text-brass-bright",
    formFieldLabel: "font-mono text-xs uppercase tracking-[0.06em] text-charcoal-dim",
    formFieldInput: "border-charcoal/20 focus:border-brass",
    identityPreviewEditButton: "text-brass hover:text-brass-bright",
  },
};
