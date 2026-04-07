# ערבות הדדית — Project Brief

## What Is This

Arvut Hadadit (ערבות הדדית — Mutual Bond) is a civic rights platform that connects vulnerable Israelis to the rights, benefits, and organizations they're entitled to — but don't know about or can't navigate to.

**Domain:** arvuthadadit.org
**Repo:** github.com/roneni/arvut-hadadit
**Status:** Beta — live on Vercel

---

## The Problem

- 100% of 150,000 people who sought help in 2024 had at least one right they never claimed (Ptichat Lev, Knesset committee January 2025)
- 104 million NIS was recovered for war evacuees through active guidance alone — money that would have been lost without someone navigating the system for them
- 34% of low-income municipalities have zero rights realization centers
- Kol Zchut (the biggest existing platform) has a chatbot with no memory, no conversation flow, and no deep linking — it dumps you on homepages

---

## What We're Building

A platform with three layers:

1. **Organization Directory** (live now) — searchable database of 34+ Israeli organizations across 10 categories (soldiers, elderly, disabilities, immigrants, health, legal rights, volunteering, etc.)

2. **AI Agent** (next) — a Hebrew-speaking conversational agent that asks the user about their situation, narrows down the options, and sends them to the **exact page, exact section, exact form** they need — not a homepage

3. **Volunteering Hub** (future) — matching volunteers and donors to organizations and people in need

---

## What Makes This Different

The agent doesn't say "go to Bituach Leumi's website." It says "here's the direct link to the specific form you need, section 3, paragraph B." That's the killer feature. No one does this in Israel today.

---

## Tech Stack

- Static HTML/CSS/JS landing page (currently deployed)
- Organization data in structured JSON (ready for agent layer)
- Next phase: conversational AI agent with Hebrew system prompt, querying the structured data
- Deployment: Vercel + GitHub

---

## Branding

- **Colors:** Israeli flag blue (#0038b8) and white only. Never yellow/gold.
- **Language:** Hebrew primary, with English (/en) and Arabic (/ar) planned
- **Footer dedication:** To the memory of Yakov Katz

---

## Team Structure

- **Ronen Katz** — Founder, Operations Command Center (OCC)
- **AI agents** — Currently handling development (Perplexity Computer, Claude Code, Gemini). These roles transition to humans as the project grows.

---

## Immediate Next Steps

1. Structure and verify organization data (deep links, eligibility, services)
2. Build the Hebrew conversational agent layer on top of the data
3. Code for Israel challenge submission (in progress)
4. Israeli Marketing Association Social Impact Award submission (deadline: May 3, 2026)

---

## Links

- **Live site:** https://arvuthadadit.org
- **GitHub:** https://github.com/roneni/arvut-hadadit
- **Parent org:** Katz Intelligence Inc.
