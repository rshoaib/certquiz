---
name: write-post
description: Research, write, and publish an SEO-optimized blog post for CertQuiz. Optionally pass a topic/keyword as an argument.
---

# Write & Publish a Blog Post

You are writing a blog post for **CertQuiz** (https://www.getcertquiz.com), a free IT certification practice test platform.

## Step 0: Pick the Topic

**If a topic was provided:** Use `$ARGUMENTS` as the primary keyword/topic.

**If no topic was provided:** Read `.agents/context/site-context.md` and pick the highest-priority unpublished keyword from the **Content Priority Queue** section. Tell the user which topic you picked and why before continuing.

---

## Step 1: Read Site Context

Read these files to understand the brand, tone, and linking rules:

- `.agents/context/site-context.md` — brand voice, internal links, topic clusters
- `src/data/blog-posts.json` — existing articles (avoid duplicate topics)

**Key rules from brand voice:**
- Tone: Direct, confident, anti-paywall. "Stop paying for X — do it free here."
- Short sentences (<25 words). Bold key takeaways. Tables for comparisons.
- Always mention "free, no signup, 100% private" within the first 100 words.
- Reference paid tools as the expensive alternative, position CertQuiz as free.
- Minimum 3 internal links per article using natural anchor text.

---

## Step 2: Research Competitors

1. **Web search** the target keyword
2. **Read the top 3 ranking articles** — note their headings, depth, examples, media
3. **Search "People Also Ask"** for the keyword — use these for the FAQ section
4. **Identify gaps** competitors missed that you can fill
5. **Document your angle:** "Cover everything they cover + add [unique value]"

---

## Step 3: Write the Article

Write a complete blog post in **HTML format** (not markdown). Follow these SEO rules:

### Structure
- **Title:** Include primary keyword + current year. Under 60 characters.
- **Meta description:** Under 155 characters. Include keyword + "free".
- **H1:** Matches title.
- **H2s:** Every 200-300 words. Include keyword variations naturally.
- **FAQ section:** 3-5 questions from "People Also Ask" research. Wrap in FAQ structure.
- **CTA at end:** Link to the most relevant tool (`/upload` or `/quiz/security-plus-sy0-701`).

### Content Rules
- Length: 1000-2000 words
- No fluff, no filler paragraphs
- Use `<table>` for all comparisons
- Use `<strong>` for key takeaways
- Use `<ol>` / `<ul>` for steps and lists
- Internal links: minimum 3, using descriptive anchor text (never "click here")
  - Upload Tool: `/upload`
  - Security+ Quiz: `/quiz/security-plus-sy0-701`
  - Blog Hub: `/blog`
  - Homepage: `/`
- Write for humans first, search engines second

### SEO Checklist (verify before proceeding)
- [ ] Title includes primary keyword + year
- [ ] Meta description < 155 chars with keyword + "free"
- [ ] H2s use keyword variations naturally
- [ ] 3+ internal links with descriptive anchors
- [ ] FAQ section with 3-5 questions
- [ ] CTA at end linking to relevant tool
- [ ] Article length 1000-2000 words
- [ ] No duplicate topic with existing posts

---

## Step 4: Generate Hero Image

Use the image generation tool to create a hero image for the article. Save it to:
```
public/images/blog/[slug]-hero.png
```

If image generation is not available, skip this step and set `hero_image` to `null`.

---

## Step 5: Add to Blog Data

Read `src/data/blog-posts.json`, then add the new post as the **first item** in the array with this structure:

```json
{
  "slug": "kebab-case-slug-here",
  "title": "Full Title Here",
  "description": "Meta description here (under 155 chars)",
  "category": "certification-guides",
  "tags": ["tag1", "tag2", "tag3"],
  "author": "CertQuiz Team",
  "hero_image": "/images/blog/slug-hero.png",
  "created_at": "CURRENT_ISO_DATE",
  "content": "FULL_HTML_CONTENT_HERE"
}
```

**Categories to choose from:** `certification-guides`, `exam-tools`, `guides`

---

## Step 6: Update Site Context

Update `.agents/context/site-context.md`:
- Add the new article to the **Published Blog Articles** table
- If the topic was from the **Content Priority Queue**, mark it as published
- If the topic matches a **Topic Cluster**, update its status to published

---

## Step 7: Build & Deploy

1. Run `npm run build` — verify it passes
2. Stage the changed files (blog-posts.json, hero image, site-context.md)
3. Commit with message: `content: [short descriptive title]`
4. Push to `origin main` to trigger Vercel deployment

---

## Step 8: Summary

Show the user:
- Article title and slug
- Live URL: `https://www.getcertquiz.com/blog/[slug]`
- Word count
- Internal links used
- Next suggested topic from the priority queue
