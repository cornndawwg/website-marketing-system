# Production Setup Guide

This guide covers final Phase 8 production setup items: service areas, pricing rules, and email templates.

## Service Area Configuration

You can manage service areas via Prisma Studio:

```bash
npx prisma studio
```

- Open the `ServiceArea` table
- Add/edit rows (name, slug, active)

Seeded defaults include Walton, Barrow, Oconee, Morgan, Newton, Rockdale, and Gwinnett counties.

## Pricing Rules Setup

Pricing rules live in the `Service` table as JSON under `basePriceModel`.

Use Prisma Studio to edit:

```bash
npx prisma studio
```

- Open `Service`
- Edit `basePriceModel` for `residential-window-cleaning` and `commercial-window-cleaning`
- Fields include base rates, add-ons, multipliers, and travel costs

The application reads these at runtime to produce quotes.

## Email Templates Configuration

Email templates are defined in code at `src/lib/email-templates.ts`.

- Update copy, styles, and variables as needed
- Variables are rendered via `renderEmailTemplate()`
- Test via the admin email settings or API endpoint `/api/email/send`

Environment variables required:

- SMTP host, port, secure, user, password, from (configured in admin settings)

## Verification Checklist

- [x] Service areas reflect your operating regions
- [x] Pricing rules match your business rates
- [x] Email templates reviewed and updated
- [x] Nightly Postgres backups scheduled (GitHub Action)

## Backups: Setup & Restore

### Configure secrets

In GitHub repo Settings → Secrets and variables → Actions, add:

- `DATABASE_URL` – Production Railway Postgres connection string

The workflow `.github/workflows/db-backup.yml` runs daily at 03:00 UTC and stores a gzipped `pg_dump` as a GitHub Actions artifact (30 days retention).

### Manual run

GitHub → Actions → Nightly Postgres Backup → Run workflow.

### Restore procedure (from local)

1. Download artifact `.sql.gz`
2. Decompress: `gunzip db_backup_*.sql.gz`
3. Restore:

```bash
psql "$DATABASE_URL" -f db_backup_*.sql
```

For large DBs, consider `pg_restore` with a custom format dump.

## Analytics (Optional)

Set one of the following in Railway variables and the app will include the tag:

- `NEXT_PUBLIC_GA_ID` – e.g., G-XXXXXXXXXX
- `NEXT_PUBLIC_GTM_ID` – e.g., GTM-XXXXXXX

## Reviews Link (Optional)

Set `NEXT_PUBLIC_GOOGLE_REVIEWS_URL` to your business's Google Reviews page URL to enable the homepage Reviews CTA button.



