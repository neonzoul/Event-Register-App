import type { Registration } from '@/types';
import { formatCurrency, getEventConfig } from '@/lib/utils';

export function ConfirmationCard({ registration }: { registration: Registration }) {
  const event = getEventConfig();
  const total = registration.ticket_count * event.ticketPrice;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-3">
      <h2 className="text-2xl font-semibold text-emerald-700">Registration Successful</h2>
      <p className="text-slate-600">Registration ID: <span className="font-mono font-bold text-slate-900">{registration.registration_id}</span></p>
      <p className="text-slate-700">Name: {registration.full_name}</p>
      <p className="text-slate-700">Email: {registration.email}</p>
      <p className="text-slate-700">Tickets: {registration.ticket_count}</p>
      <p className="text-slate-700">Total: <span className="font-semibold text-emerald-700">{formatCurrency(total)}</span></p>
      <div className="rounded-lg bg-slate-50 p-4 border border-slate-200 text-sm text-slate-700">
        <p>Event: {event.name}</p>
        <p>Date: {event.date}</p>
        <p>Time: {event.time}</p>
        <p>Venue: {event.venue}</p>
      </div>
    </div>
  );
}
