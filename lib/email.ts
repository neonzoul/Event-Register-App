import { Resend } from 'resend';
import type { Registration } from '@/types';
import { getEventConfig } from './utils';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendConfirmationEmail(registration: Registration): Promise<void> {
  if (!resend || !process.env.RESEND_FROM_EMAIL) return;

  const event = getEventConfig();
  const total = registration.ticket_count * event.ticketPrice;

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to: registration.email,
    subject: `Registration Confirmed - ${event.name}`,
    html: `
      <div style="max-width:600px;margin:0 auto;font-family:Helvetica Neue,Arial,sans-serif;color:#333">
        <div style="background:#10b981;padding:24px;text-align:center;border-radius:8px 8px 0 0">
          <h1 style="color:white;margin:0;font-size:24px">Registration Confirmed</h1>
        </div>
        <div style="padding:24px;background:#fff;border:1px solid #e5e7eb">
          <p>Registration ID: <strong>${registration.registration_id}</strong></p>
          <p>Name: ${registration.full_name}</p>
          <p>Email: ${registration.email}</p>
          <p>Tickets: ${registration.ticket_count}</p>
          <p>Total: <strong>${total.toLocaleString('en-US')} THB</strong></p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0" />
          <p>Event: ${event.name}</p>
          <p>Date: ${event.date}</p>
          <p>Time: ${event.time}</p>
          <p>Venue: ${event.venue}</p>
        </div>
      </div>
    `,
  });
}
