# getcertquiz.com — daily content routine

## Mission

Land **one** meaningful change per run that helps getcertquiz.com. The site is new — the blog has no posts yet — so Lane C (new post) will dominate early. As the blog grows, Lane A (refresh) takes over.

## Pre-flight

1. Read `.agents/context/site-context.md` for brand voice + cert exam list.
2. Read `.agents/context/target-keywords.md` for the keyword backlog.
3. Today's date in YYYY-MM-DD. Posts dir: `src/app/blog/` (or wherever existing posts live — inspect first). Branch: `main`.

**Before writing,** inspect the blog scaffold under `src/app/blog/` to learn how posts are stored. If posts are MDX, frontmatter is YAML. If posts are an array in a TS file, follow that shape.

## Priority lanes — pick the FIRST lane with work to do

### Lane A — Refresh stuck content (highest priority once posts exist)

Only relevant once posts exist. Heuristic: any post older than 60 days. Update exam version references (Cisco CCNA renumbered? CompTIA Security+ new exam objectives?), pass scores, fees, official Microsoft/AWS/Cisco exam page links. Bump frontmatter date. Stop after one post.

### Lane B — Internal-link strengthening (medium priority)

Only if Lane A is clear. Add cross-links between cert posts (e.g., "AWS Certified Solutions Architect" should link to "AWS Cloud Practitioner" as a prerequisite path).

### Lane C — New post (lowest priority — but expected to fire most days for a new site)

Only if Lanes A and B are clear AND no new post in 3 days. Pick from `.agents/context/target-keywords.md`. The site's value is "free practice engine for IT certs" — each blog post should pair with an exam practice surface or call out which certs the engine supports.

Inspect 2–3 existing posts first (once any exist) to match exact frontmatter/body shape.

## Hard constraints (all lanes)

- Never more than 1 lane per run. Never more than 1 post created.
- **Never invent exam objectives, pass scores, or fees.** Always verify from the official vendor page (Microsoft Learn, AWS Training, Cisco Learning Network, CompTIA, etc.) via WebSearch.
- Never claim official endorsement. The site is independent.
- Never delete content. Never force-push. Never `--no-verify`.

## After the change

1. `npm run lint`. If it fails, do not commit.
2. Commit per repo's convention. Push to `origin/main`.
3. If auth fails, exit cleanly. One-paragraph report.

If all lanes clear: one-line skip. Don't manufacture work.
