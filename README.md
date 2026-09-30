# GitScope

GitHub profile analytics built with Next.js (App Router), TypeScript, Tailwind CSS v4 and Recharts. It uses only GitHub's public REST API, runs entirely in the browser, and exports to static files for GitHub Pages.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
```

## Deploy to GitHub Pages

1. Push to a repository's `main` branch.
2. In **Settings → Pages**, set the source to **GitHub Actions**.
3. The included workflow builds with `NEXT_PUBLIC_BASE_PATH=/<repo-name>`. For a user site (`<user>.github.io`), remove that env var from `.github/workflows/deploy.yml`.

## Notes

- Routes are `/`, `/analyze/?user=<name>` and `/compare/?a=<name>&b=<name>`. Query strings replace `/analyze/[username]` because a static export cannot pre-render unknown usernames.
- Anonymous GitHub API access allows 60 requests per hour per IP; responses are cached per session and the UI reports rate limits.
- Language percentages are repository-based (primary language per original repo), not lines of code.
- Activity covers GitHub's latest 100 public events (about 90 days at most). Private contributions are not available.

## Structure

`lib/github` (API client, endpoints, types) → `lib/analytics` (pure functions) → `hooks` → `components`.
