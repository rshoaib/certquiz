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

## Hero image requirement (applies to ALL Lane C new posts)

Every new post MUST have a non-null `hero_image` field. Never commit a new post with `hero_image: null` or an empty string — this leaves the page visually broken in the blog index and on social shares.

**Resolution order (try in sequence, stop at the first one that fits):**

1. **Reuse a thematically matching existing image.** Inspect `public/images/blog/` for any existing hero PNG whose topic clearly overlaps the new post (e.g., a CCNA post can reuse `aws-vs-azure-hero.png`'s networking diagram only if no closer match exists). Set `hero_image: /images/blog/{existing-filename}.png`. This is the only path that produces a hero on day one.

2. **Predict the canonical path and flag the gap.** If no existing image fits, set `hero_image: /images/blog/{slug}-hero.png` (the conventional path) AND include this exact line in your run report under a `## Hero image TODO` heading: `Post '{slug}' committed with predicted hero path '/images/blog/{slug}-hero.png' — actual PNG must be added separately before publish`. This makes the gap explicit so a human follow-up generates the image (currently done manually via Gemini; see `public/images/blog/` for style reference).

**Hard rule:** if neither (1) nor (2) is acceptable for any reason, **skip the post entirely and run a different lane**. Do not commit a Lane C post with a missing or null hero. A missing image is worse than no post.

**Style reference for any new hero PNG added later:** 1200×630 PNG, editorial flat-illustration style matching existing files (`sy0-701-exam-tips-hero.png`, `aws-vs-azure-hero.png`, `comptia-security-plus-study-guide-hero.png`). No real product photos, no people, no trademarked logos, no text rendered in the image.

## Hard constraints (all lanes)

- Never more than 1 lane per run. Never more than 1 post created.
- **Never invent exam objectives, pass scores, or fees.** Always verify from the official vendor page (Microsoft Learn, AWS Training, Cisco Learning Network, CompTIA, etc.) via WebSearch.
- Never claim official endorsement. The site is independent.
- Never delete content. Never force-push. Never `--no-verify`.
- **Never write to Supabase.** This site is file-based (Next.js `src/app/blog/`). The only legitimate target for new content is a git commit on `main`. If you see a Supabase MCP connector attached, ignore it for content writes.

## After the change

1. `npm run lint`. If it fails, do not commit.
2. Commit per repo's convention. Push to `origin/main`.
3. If auth fails, exit cleanly. One-paragraph report.
4. If a Lane C post was committed under resolution path 2 above (predicted hero path), the run report MUST contain the `## Hero image TODO` heading and exact line specified above.

If all lanes clear: one-line skip. Don't manufacture work.
