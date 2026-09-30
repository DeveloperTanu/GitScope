import Link from "next/link";
import { Activity, BookMarked, GitCompare, Languages } from "lucide-react";
import { GithubSearch } from "@/components/search/GithubSearch";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";

const EXAMPLES = ["torvalds", "gaearon", "sindresorhus"];

const FEATURES = [
  { icon: BookMarked, title: "Repository analytics", text: "Stars, forks, original versus forked work, and the repositories that stand out." },
  { icon: Languages, title: "Language distribution", text: "Which primary languages appear across a profile's original repositories." },
  { icon: Activity, title: "Public activity", text: "Recent pushes, pull requests, issues and stars from GitHub's public event feed." },
  { icon: GitCompare, title: "Profile comparison", text: "Two profiles side by side with the same public metrics. Facts, not rankings." },
];

export default function HomePage() {
  return (
    <>
      <section className="border-b">
        <Container className="flex max-w-3xl flex-col items-center gap-6 py-16 text-center sm:py-24">
          <Badge tone="accent">Public GitHub data · No sign-in</Badge>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Understand any GitHub profile at a glance.</h1>
          <p className="max-w-xl text-balance text-muted-foreground">
            Explore repositories, languages, stars, forks, and development activity from one clean dashboard.
          </p>
          <div className="w-full max-w-xl">
            <GithubSearch />
          </div>
          <p className="text-sm text-muted-foreground">
            Try{" "}
            {EXAMPLES.map((name, i) => (
              <span key={name}>
                <Link href={`/analyze/?user=${name}`} className="font-mono text-foreground underline-offset-4 hover:underline">
                  {name}
                </Link>
                {i < EXAMPLES.length - 1 && ", "}
              </span>
            ))}
          </p>
        </Container>
      </section>
      <Container className="py-14">
        <h2 className="sr-only">Features</h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <li key={title}>
              <Card className="h-full p-5">
                <Icon className="size-5 text-accent" aria-hidden />
                <h3 className="mt-3 font-medium">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
