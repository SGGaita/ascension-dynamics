import PageTransition from "@/components/PageTransition";

/** Re-mounts on every navigation, so each page gets an entrance transition. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
