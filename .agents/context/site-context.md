# getcertquiz.com — Site Context

> **URL**: https://getcertquiz.com
> **Stack**: Next.js
> **Niche**: Free IT certification practice engine — upload VCE/PDF/DOCX, practice in-browser
> **Audience**: IT pros prepping for cert exams (AWS, Azure, GCP, Cisco, CompTIA, Red Hat, Microsoft)
> **Differentiator**: No signup, no software install, no paywall

## 🎤 Brand Voice

- **Tone**: Clear, exam-focused, no-fluff. Like a senior engineer who's taken 10 certs and knows which ones matter.
- **Style**: Lead with the exam itself (objectives, cost, format). Tables for objectives breakdowns. Honest about difficulty.
- **Address**: Second person ("you"). Audience is IT professionals.
- **Hard rule**: Never claim official endorsement. Always link to the vendor's official exam page for authoritative info.

## 🎯 Content Pillars

| Pillar | Topics |
|---|---|
| AWS | Cloud Practitioner, Solutions Architect (Associate/Pro), Developer, SysOps, Security Specialty |
| Azure | AZ-900, AZ-104, AZ-204, AZ-305, AZ-500, MS-900, MS-700 |
| Google Cloud | Cloud Engineer, Professional Cloud Architect, Data Engineer |
| Cisco | CCNA, CCNP Enterprise, CyberOps |
| CompTIA | A+, Network+, Security+, CySA+, PenTest+, CASP+ |
| Microsoft | M365 Fundamentals, Power Platform, SC-200/300/900 |
| Red Hat / Linux | RHCSA, RHCE, LPIC |
| Cert strategy | Which cert first? CompTIA vs vendor? Cost-vs-ROI analysis |

## 📝 Frontmatter Convention

Inspect the existing `src/app/blog/` scaffold once posts are added — match whatever shape lives there.

## 🔗 Internal Link Patterns

When a post mentions an exam objective, link to the practice surface for that cert on the site (verify the route exists first). Cross-link related certs.
