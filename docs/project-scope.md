\# Project Scope – Moreland Window Cleaning (MVP)



\*\*Last updated:\*\* 2025-09-13

\*\*Owner:\*\* Shon Cornwell

\*\*Company:\*\* Moreland Window Cleaning

\*\*Goal:\*\* Ship a production‑ready MVP web app for quoting, scheduling, invoicing, blogging, and SEO—hosted on \*\*Railway\*\* with \*\*Postgres\*\*.



---



\## 1) Vision \& Outcomes



\*\*Vision:\*\* A high‑converting, SEO‑optimized website + lightweight back‑office that turns visitors into booked jobs using a conditional price‑range quote, estimate scheduling (Google Calendar sync), and post‑service invoices.



\*\*Primary outcomes (first 4 weeks):\*\*



\* Launch public site and admin portal on Railway.

\* Collect leads via quote form (Residential \& Commercial variants).

\* Show \*\*price range\*\* → capture lead → schedule estimate → convert to booking → invoice after service.

\* Hit \*\*90+ Lighthouse SEO\*\* on key pages; publish first 2 blog posts.



\*\*Success metrics:\*\*



\* 30+ leads/month from organic + direct within 60 days.

\* ≥ 25% lead→estimate conversion rate; ≥ 60% estimate→job.

\* Top‑3 local pack for 3–5 primary “window cleaning + county” terms in 90 days (directional).



---



\## 2) Users \& Roles (MVP)



\* \*\*Owner Admin\*\* (full access).

\* \*Future (v1.1+):\* Dispatcher, Technician (mobile route + photos), Sales, Read‑only.



---



\## 3) Scope – Features



\### Public (Frontend)



\* \*\*Home\*\* with clear CTAs and proof (Google/Facebook review embeds, badges).

\* \*\*Residential\*\* and \*\*Commercial\*\* service pages with sub‑services.

\* \*\*Quote Calculator\*\* (2 variants) → \*\*Price Range\*\* output → \*\*CTA: Request Exact Quote\*\*.

\* \*\*Estimate → Booking\*\* funnel: submit lead → admin proposes/schedules estimate → Google Calendar sync → customer confirmation (email/SMS).

\* \*\*Blog\*\* (2 posts/month target) with categories/tags.

\* \*\*Contact \& Live Chat\*\* (web chat; optional SMS relay).

\* SEO system: schema (LocalBusiness, Service, FAQ), XML sitemap, robots.txt, internal links.



\### Admin (Backend)



\* \*\*Dashboard:\*\* Leads, Quote requests, Status pipeline (New, Contacted, Est. Scheduled, Est. Sent, Booked, Done).

\* \*\*Lead \& Chat Inbox:\*\* unified view; reply (web + optional SMS); canned responses.

\* \*\*Quotes:\*\* view submissions, computed ranges, export to PDF/email, convert to Estimate.

\* \*\*Scheduling:\*\* create estimate/booking events → Google Calendar sync; resend confirmations.

\* \*\*Invoicing:\*\* create/send Stripe invoice \*\*after service\*\*, mark paid (webhook sync).

\* \*\*CMS:\*\* create/edit blog posts (MDX), images, redirects.



---



\## 4) Service Area \& Menu



\* \*\*Service area (GA):\*\* Walton County and surrounding counties (Barrow, Oconee, Morgan, Newton, Rockdale, Gwinnett).

\* \*\*Services:\*\* Interior/Exterior window cleaning; Screens; Tracks/Sills; Hard‑water stain removal; Skylights; Gutter cleaning; Post‑construction cleanup; Storefront/Routes.



---



\## 5) Tech Stack (Free‑leaning) – Railway + Postgres



\* \*\*Frontend:\*\* Next.js (App Router), React 18, TailwindCSS, shadcn/ui, MDX for blog.

\* \*\*Backend:\*\* Node.js (TypeScript), Next.js API routes (or /server), \*\*Prisma ORM\*\*.

\* \*\*DB:\*\* \*\*Postgres on Railway\*\*.

\* \*\*Auth:\*\* NextAuth (email magic link) using Prisma adapter.

\* \*\*Scheduling:\*\* Cal.com (cloud free) via embed + Google Calendar OAuth; \*option\*: self‑host on Railway later.

\* \*\*Payments:\*\* Stripe Invoicing (Invoices API + Webhooks).

\* \*\*Chat:\*\* Chatwoot (self‑host on Railway) \*\*or\*\* Twilio SMS + in‑app inbox (pay‑as‑you‑go); MVP may start with Chatwoot embed.

\* \*\*Image/Asset optimization:\*\* Next.js Image + (optional) Cloudinary free tier.

\* \*\*Deployment:\*\* Single monorepo on Railway (web + worker); Postgres as separate Railway service.

\* \*\*Background jobs:\*\* lightweight in‑process queue (e.g., p‑queue) or cron via Railway scheduled jobs.



\*\*Environment variables (initial):\*\*



\* `DATABASE\_URL` (Postgres)

\* `NEXTAUTH\_URL`, `NEXTAUTH\_SECRET`

\* `EMAIL\_SERVER\_\*` (for magic links) \*or\* use Resend/Postmark free tier

\* `STRIPE\_SECRET\_KEY`, `STRIPE\_WEBHOOK\_SECRET`

\* `GOOGLE\_CLIENT\_ID`, `GOOGLE\_CLIENT\_SECRET` (Calendar/Identity)

\* `CALCOM\_EMBED\_URL` (if using cal.com cloud)

\* `CHATWOOT\_\*` or `TWILIO\_\*` (if chosen)



---



\## 6) Data Model (ERD Outline)



```

User (id, email, name, role, createdAt)

Customer (id, firstName, lastName, email, phone, address1, address2, city, state, zip, source, createdAt)

Service (id, slug, name, type\[res|com], basePriceModel, active)

Quote (id, customerId, variant\[res|com], inputs(jsonb), priceMin, priceMax, status\[new|sent|accepted|rejected], createdAt)

QuoteItem (id, quoteId, serviceId, qty, meta jsonb)

Lead (id, customerId, channel\[form|chat|phone|sms], payload jsonb, status, createdAt)

Appointment (id, customerId, type\[estimate|job], startsAt, endsAt, gcEventId, location jsonb, notes, status)

Job (id, customerId, quoteId?, scheduledAt, status\[pending|in\_progress|done|invoiced])

Invoice (id, jobId, stripeInvoiceId, amount, status\[draft|sent|paid|void], sentAt, paidAt)

Message (id, customerId, direction\[in|out], medium\[web|sms|email], body, meta jsonb, createdAt)

BlogPost (id, slug, title, excerpt, content\_mdx, status\[draft|pub], publishedAt, authorId, coverImage)

ReviewRef (id, platform\[google|facebook], url, rating, capturedAt)

ServiceArea (id, name, slug, geo jsonb, active)

```



\*\*Notes:\*\*



\* `Quote.inputs` stores calculator answers (window count, stories, add‑ons, frequency, access).

\* `Appointment.gcEventId` stores Google Calendar event ID for sync.

\* `Invoice` managed by Stripe; store external IDs + status via webhook.



---



\## 7) Quote Logic (Price Range)



\*\*Residential example (JSON rule set):\*\*



```json

{

&nbsp; "base": { "per\_window": { "ground": \[8, 10], "second": \[10, 12], "third": \[14, 16] } },

&nbsp; "addOns": {

&nbsp;   "screens": { "per\_unit": \[1.5, 2.5] },

&nbsp;   "tracks\_sills": { "per\_window": \[1, 2] },

&nbsp;   "hard\_water": { "per\_window": \[3, 6] },

&nbsp;   "skylight": { "per\_unit": \[8, 12] }

&nbsp; },

&nbsp; "multipliers": {

&nbsp;   "access\_hard": 1.15,

&nbsp;   "frequency\_quarterly": 0.9,

&nbsp;   "frequency\_biannual": 0.95

&nbsp; },

&nbsp; "travel": { "base\_miles": 20, "per\_mile": \[0.5, 0.75] }

}

```



\*\*Commercial example (simplified):\*\* per‑panel \\\* frequency tiers (weekly/bi‑weekly/monthly) + height surcharge bands.



\*\*Output:\*\* compute `priceMin`/`priceMax` and show a polite disclaimer → CTA \*\*Request Exact Quote\*\* (creates Lead + Quote).



---



\## 8) Scheduling \& Calendar Sync



\* \*\*Estimate request\*\* creates a tentative \*\*Appointment(type=estimate)\*\*.

\* Admin confirms → create/update Google Calendar event (`gcEventId`).

\* Job booking uses similar flow with \*\*Appointment(type=job)\*\*.

\* Email/SMS confirmations with iCal attachment and reschedule link.



---



\## 9) Invoicing \& Payments (Stripe)



\* Admin generates \*\*Stripe Invoice\*\* from Job → send to customer email/SMS link.

\* Webhook updates local `Invoice.status` to `paid` and marks `Job.status = invoiced`.

\* Optional tips and taxes; tax behavior configured in Stripe (later QB sync in v1.1).



---



\## 10) Integrations



\* \*\*Google Calendar\*\* (OAuth per Owner Admin; store refresh token securely).

\* \*\*Stripe\*\* (Invoices API, Checkout‑hosted invoice pages; Webhooks endpoint `/api/webhooks/stripe`).

\* \*\*Chat\*\*: start with \*\*Chatwoot\*\* widget + REST API (or Twilio for SMS handoff).

\* \*\*Cal.com\*\*: embedded scheduling for public estimate slots (optional), or internal‑only if we prefer manual slotting.



---



\## 11) SEO Deliverables



\* \*\*Keyword Map:\*\* Walton County + surrounding counties; service + geo pairs; informational topics for blog (seasonal cleaning, hard‑water removal, gutter vs window bundle, frequency savings, storefront route ROI).

\* \*\*On‑page templates:\*\* H1/H2, meta, FAQ blocks, internal links, local business NAP.

\* \*\*Schema:\*\* LocalBusiness (with serviceArea), Service, FAQ, Breadcrumb.

\* \*\*Technical:\*\* XML sitemap, robots, canonical tags, OpenGraph/Twitter cards, image alt.

\* \*\*Content cadence:\*\* 2 posts/month + 1 new/updated service‑area page per month.



---



\## 12) API Routes (Initial)



\* `POST /api/quote/res` – compute residential range \& create Lead/Quote.

\* `POST /api/quote/com` – compute commercial range \& create Lead/Quote.

\* `POST /api/leads/:id/message` – append message (owner reply) + notify.

\* `POST /api/appointments` – create/update estimate/job, push to Google.

\* `POST /api/invoices` – create Stripe invoice from Job.

\* `POST /api/webhooks/stripe` – invoice/payment events.

\* `POST /api/webhooks/chat` – inbound chat/SMS (if using Twilio/Chatwoot relay).

\* `GET /api/blog` – list posts (public), `GET /api/blog/:slug` – detail.



---



\## 13) Admin Screens



1\. \*\*Dashboard\*\* (counts, quick filters, today’s estimates/jobs).

2\. \*\*Leads \& Quotes\*\* (table + detail side panel; convert to Appointment/Job).

3\. \*\*Calendar\*\* (month/week/day; Google sync state badges).

4\. \*\*Jobs \& Invoices\*\* (status chips; ‘Send Invoice’ action).

5\. \*\*Messages\*\* (omni‑inbox; search; canned replies).

6\. \*\*CMS\*\* (posts list/editor with MDX preview; image upload).

7\. \*\*Settings\*\* (Services \& pricing rules JSON; Service Areas; Integrations; Users).



---



\## 14) Security \& Compliance



\* Role‑based guards (Owner Admin only in MVP) + audit fields.

\* Sensitive tokens in Railway variables; rotate on schedule.

\* PII retention: 18‑month rolling for messages and quote payloads; hard delete on request.

\* HTTPS everywhere; Stripe handles card data; we never store PANs.



---



\## 15) Acceptance Criteria (Demo Script)



1\. \*\*Quote flow:\*\* Visitor completes Residential quote → sees range → submits exact quote request → Lead + Quote created.

2\. \*\*Scheduling:\*\* Admin converts lead to \*\*Estimate\*\* → Google Calendar event appears; customer receives confirmation.

3\. \*\*Booking:\*\* Admin marks estimate accepted → creates \*\*Job\*\* appointment; Google syncs.

4\. \*\*Invoice:\*\* Admin sends Stripe invoice after service → webhook marks Paid → Job → Invoiced.

5\. \*\*Blog:\*\* Admin publishes MDX post → appears on site with schema and correct meta.

6\. \*\*SEO:\*\* Pages score ≥ 90 SEO on Lighthouse; sitemap is accessible; schema validates in Rich Results test.



---



\## 16) Non‑Functional



\* Perf: TTFB < 2s on main pages (Railway dyno warmup considered).

\* Uptime: best‑effort MVP; basic logging via Railway; error tracking with Sentry.

\* Backups: Railway Postgres daily snapshots + weekly off‑site export.



---



\## 17) Roadmap (Post‑MVP ➜ v1.1)



\* Multi‑role users (Dispatcher, Technician mobile app for routes/photos/checklists).

\* Deposits at booking (Stripe Payment Links) + saved estimates.

\* QuickBooks Online 2‑way sync (customers, invoices, payments).

\* Route optimization + drive‑time buffers.

\* Customer portal (history, receipts, rebook, recurring).

\* Self‑hosted Cal.com + Chatwoot on Railway.



---



\## 18) Cursor Agent – Task Breakdown



\*\*Scaffold\*\*



\* Next.js (TS) + Tailwind + shadcn/ui; Prisma + Postgres; NextAuth (email).

\* Configure Railway services: web, worker (optional), Postgres.

\* Set ENV vars; generate Prisma schema; run initial migration.



\*\*Core features\*\*



\* Build Residential/Commercial quote forms; pricing engine from JSON rule set.

\* API endpoints for quotes/leads; admin tables with filtering.

\* Google Calendar OAuth + CRUD for estimate/job events.

\* Stripe Invoicing integration + webhook handler.

\* MDX blog (FS or DB‑backed), image handling, sitemap/robots.



\*\*Admin UI\*\*



\* Dashboard, Leads/Quotes, Calendar, Jobs/Invoices, Messages, CMS, Settings.



\*\*SEO\*\*



\* Schema components, meta builders, OpenGraph; Lighthouse/Playwright test.



\*\*Tests\*\*



\* Unit: pricing engine, webhook parsers.

\* E2E (Playwright): quote→estimate→invoice path; blog publish.



---



\## 19) Prisma Schema (excerpt)



```prisma

model User {

&nbsp; id        String   @id @default(cuid())

&nbsp; email     String   @unique

&nbsp; name      String?

&nbsp; role      String   @default("owner")

&nbsp; createdAt DateTime @default(now())

}



model Customer {

&nbsp; id        String   @id @default(cuid())

&nbsp; firstName String

&nbsp; lastName  String

&nbsp; email     String?

&nbsp; phone     String?

&nbsp; address1  String?

&nbsp; address2  String?

&nbsp; city      String?

&nbsp; state     String?

&nbsp; zip       String?

&nbsp; source    String?

&nbsp; createdAt DateTime @default(now())

&nbsp; quotes    Quote\[]

&nbsp; leads     Lead\[]

}



model Quote {

&nbsp; id        String   @id @default(cuid())

&nbsp; customer  Customer @relation(fields: \[customerId], references: \[id])

&nbsp; customerId String

&nbsp; variant   String   // res | com

&nbsp; inputs    Json

&nbsp; priceMin  Int

&nbsp; priceMax  Int

&nbsp; status    String   @default("new")

&nbsp; createdAt DateTime @default(now())

&nbsp; items     QuoteItem\[]

}



model QuoteItem {

&nbsp; id        String  @id @default(cuid())

&nbsp; quote     Quote   @relation(fields: \[quoteId], references: \[id])

&nbsp; quoteId   String

&nbsp; serviceId String

&nbsp; qty       Int

&nbsp; meta      Json?

}



model Lead {

&nbsp; id         String   @id @default(cuid())

&nbsp; customer   Customer @relation(fields: \[customerId], references: \[id])

&nbsp; customerId String

&nbsp; channel    String

&nbsp; payload    Json

&nbsp; status     String   @default("new")

&nbsp; createdAt  DateTime @default(now())

}



model Appointment {

&nbsp; id         String   @id @default(cuid())

&nbsp; customer   Customer @relation(fields: \[customerId], references: \[id])

&nbsp; customerId String

&nbsp; type       String   // estimate | job

&nbsp; startsAt   DateTime

&nbsp; endsAt     DateTime

&nbsp; gcEventId  String?

&nbsp; notes      String?

&nbsp; status     String   @default("scheduled")

}



model Job {

&nbsp; id         String  @id @default(cuid())

&nbsp; customerId String

&nbsp; quoteId    String?

&nbsp; scheduledAt DateTime?

&nbsp; status     String   @default("pending")

}



model Invoice {

&nbsp; id             String   @id @default(cuid())

&nbsp; jobId          String

&nbsp; stripeInvoiceId String?

&nbsp; amount         Int

&nbsp; status         String   @default("draft")

&nbsp; sentAt         DateTime?

&nbsp; paidAt         DateTime?

}



model BlogPost {

&nbsp; id          String   @id @default(cuid())

&nbsp; slug        String   @unique

&nbsp; title       String

&nbsp; excerpt     String?

&nbsp; content\_mdx String

&nbsp; status      String   @default("draft")

&nbsp; publishedAt DateTime?

&nbsp; authorId    String?

}

```



---



\## 20) Acceptance Tests (for Agent)



\* \*\*Pricing Engine:\*\* Given inputs (windows: ground=12, second=8, screens=yes, tracks=yes, access=normal), returns `priceMin<priceMax` within expected band; totals reflect multipliers.

\* \*\*Lead→Estimate:\*\* POST `/api/quote/res` creates Lead+Quote; `status=new`.

\* \*\*Calendar:\*\* Creating Appointment sets `gcEventId` and reflects on Google within 5s (mock in CI).

\* \*\*Invoice Webhook:\*\* Stripe `invoice.paid` updates `Invoice.status=paid` and `Job.status=invoiced`.

\* \*\*SEO:\*\* `/sitemap.xml` contains service + area URLs; schema present on service pages.



---



\## 21) Open Questions / Defaults



\* Chat stack default = \*\*Chatwoot\*\* widget (free/self‑host later).

\* Email provider for magic links/notifications = \*\*Resend\*\* (free dev) or SMTP.

\* Image hosting default = local + Next Image; switch to Cloudinary if needed.



---



\*\*Ship It Checklist (MVP):\*\*



\* \[ ] Railway services: web, Postgres; ENV set; migrations run.

\* \[ ] Public site pages + quote forms live; pricing rules loaded.

\* \[ ] Admin dashboard operational (Leads/Quotes/Calendar/Invoices/Blog).

\* \[ ] Google Calendar OAuth connected; test event round‑trip.

\* \[ ] Stripe invoices sending + webhook verified.

\* \[ ] Blog: 2 posts published.

\* \[ ] SEO: sitemap, robots, schema, Lighthouse ≥ 90.



