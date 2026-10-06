import { Container } from "@/components/Container";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <Container className="flex flex-col items-center justify-between gap-3 text-xs text-muted-2 sm:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {site.name}. Built with Next.js.
        </p>
        <p className="font-mono">{site.location}</p>
      </Container>
    </footer>
  );
}
