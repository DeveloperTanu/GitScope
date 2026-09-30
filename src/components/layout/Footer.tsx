import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t">
      <Container className="flex flex-col gap-1 py-6 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>
          {siteConfig.name} uses only GitHub&apos;s public REST API. No sign-in, no tracking, no AI.
        </p>
        <p>Not affiliated with GitHub.</p>
      </Container>
    </footer>
  );
}
