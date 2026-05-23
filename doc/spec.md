# Event Registration System - Implementation Spec

## Purpose
This document is the implementation reference for a web-based event registration system.

## System Overview
The system supports the full flow:
1. Attendee submits registration form.
2. Data is saved to Supabase.
3. Confirmation email is sent.
4. PromptPay QR is shown for payment.
5. Admin checks in attendees on event day.

## Users
- Attendee: uses `/` and `/confirmation/[id]`
- Admin: uses `/checkin` and `/admin`

## Tech Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Supabase (PostgreSQL)
- Resend (email)
- `promptpay-qr` + `qrcode`
- Vercel deployment

## Required Pages
- `/`: Registration form
- `/confirmation/[id]`: Confirmation + payment QR
- `/checkin`: Search + check-in actions
- `/admin`: Dashboard + CSV export

## API Routes
- `POST /api/register`
  - Validate input
  - Generate unique `REG-xxxxx`
  - Insert into `registrations`
  - Send confirmation email asynchronously
- `PATCH /api/checkin`
  - Validate request
  - Find registration by `registration_id`
  - Update status to `checked_in`

## Database Table
`registrations`
- id (UUID primary key)
- registration_id (text unique)
- full_name
- email (unique)
- phone
- organization (nullable)
- ticket_count (1-5)
- special_requirements (nullable)
- status (`registered` | `checked_in`)
- created_at
- checked_in_at (nullable)

## Environment Variables
- NEXT_PUBLIC_EVENT_NAME
- NEXT_PUBLIC_EVENT_DATE
- NEXT_PUBLIC_EVENT_TIME
- NEXT_PUBLIC_EVENT_VENUE
- NEXT_PUBLIC_TICKET_PRICE
- NEXT_PUBLIC_PROMPTPAY_ID
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- RESEND_API_KEY
- RESEND_FROM_EMAIL

## Validation Rules
- full_name: 2-100 chars
- email: valid format
- phone: 9-12 digits/hyphen
- ticket_count: integer 1-5
- organization: optional, <=200 chars
- special_requirements: optional, <=500 chars

## UX Requirements
- Mobile-first layout
- Clear loading and error states
- Accessible labels and focus states
- Fast page load on 4G

## Deployment Checklist
- Registration flow works end-to-end
- Confirmation page shows QR and amount
- Check-in updates status correctly
- Admin dashboard counts are accurate
- CSV export opens correctly with UTF-8 text

## Notes
This file was normalized to English-only content to remove prior encoding corruption.
