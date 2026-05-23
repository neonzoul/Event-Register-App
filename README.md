# Event Registration System

A production-ready event registration system built with Next.js, Supabase, Resend, and PromptPay QR.

## Repository
- GitHub: https://github.com/neonzoul/Event-Register-App

## Features
- Public registration form with validation
- Confirmation page with registration ID and PromptPay QR
- Confirmation email after successful registration
- Admin check-in page
- Admin dashboard with CSV export

## Tech Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Supabase (PostgreSQL)
- Resend (Email)
- Vercel (Deployment)

## Prerequisites
- Node.js 20+
- npm 10+
- Git
- Supabase account
- Resend account
- Vercel account

## 1. Download Project from GitHub

```bash
git clone https://github.com/neonzoul/Event-Register-App.git
cd Event-Register-App
```

Example:

```bash
git clone https://github.com/neonzoul/Event-Register-App.git
cd Event-Register-App
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Environment Variables

Create local env file:

```bash
cp .env.example .env.local
```

If you are on Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Then edit `.env.local` and set real values:

- `NEXT_PUBLIC_EVENT_NAME`
- `NEXT_PUBLIC_EVENT_DATE`
- `NEXT_PUBLIC_EVENT_TIME`
- `NEXT_PUBLIC_EVENT_VENUE`
- `NEXT_PUBLIC_TICKET_PRICE`
- `NEXT_PUBLIC_PROMPTPAY_ID`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`

## 4. Setup Supabase Database

1. Create a Supabase project.
2. Open **SQL Editor**.
3. Run this schema:

```sql
CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  organization TEXT,
  ticket_count INTEGER NOT NULL DEFAULT 1 CHECK (ticket_count BETWEEN 1 AND 5),
  special_requirements TEXT,
  status TEXT NOT NULL DEFAULT 'registered' CHECK (status IN ('registered', 'checked_in')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  checked_in_at TIMESTAMP WITH TIME ZONE,
  CONSTRAINT unique_email UNIQUE (email)
);

CREATE INDEX idx_registrations_search
  ON registrations USING gin (
    to_tsvector('simple', full_name || ' ' || email || ' ' || registration_id)
  );

CREATE INDEX idx_registrations_status ON registrations (status);

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_insert"
  ON registrations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "public_read"
  ON registrations FOR SELECT
  USING (true);

CREATE POLICY "public_update"
  ON registrations FOR UPDATE
  USING (true)
  WITH CHECK (true);
```

4. Go to **Project Settings -> API** and copy:
- Project URL -> `NEXT_PUBLIC_SUPABASE_URL`
- anon public key -> `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 5. Setup Resend

1. Create a Resend account.
2. Create an API key.
3. Set `RESEND_API_KEY` in `.env.local`.
4. Set `RESEND_FROM_EMAIL`:
- Use your verified domain email in production
- Or use `onboarding@resend.dev` for testing

## 6. Run Locally

```bash
npm run dev
```

Open:
- `http://localhost:3000` -> Registration
- `http://localhost:3000/checkin` -> Check-in page
- `http://localhost:3000/admin` -> Admin dashboard

## 7. Production Build Check

```bash
npm run build
npm start
```

## 8. Deploy to Vercel

### Option A: Deploy with GitHub integration (recommended)
1. Push your code to GitHub.
2. Go to Vercel -> **Add New Project**.
3. Import your GitHub repository.
4. Framework preset: **Next.js** (auto-detected).
5. Add all environment variables from `.env.local` to Vercel:
   - Project Settings -> Environment Variables
6. Click **Deploy**.

### Option B: Deploy with Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow prompts, then set env vars in dashboard and redeploy.

## 9. Environment Variables in Vercel

Add the same values used in `.env.local` for:
- Production
- Preview (optional but recommended)

After adding/updating env vars, redeploy the project.

## 10. Post-Deploy Test Scenario

Run this checklist on your live URL:

1. Submit registration from `/`.
2. Confirm redirect to `/confirmation/[registration_id]`.
3. Check registration appears in Supabase table.
4. Verify confirmation email is received.
5. Verify PromptPay QR renders and is scannable.
6. Open `/checkin`, search attendee, perform check-in.
7. Open `/admin`, verify counts update.
8. Export CSV and confirm file content is correct.

## Troubleshooting

- `System is not configured yet`
  - Missing Supabase env vars in local or Vercel.

- No email received
  - Check `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and Resend domain verification.

- Build passes locally but fails on Vercel
  - Verify all required environment variables exist in Vercel.

## Scripts

```bash
npm run dev    # Start development server
npm run build  # Production build
npm run start  # Start production server
npm run lint   # Lint
```
