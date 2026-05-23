import { RegistrationForm } from '@/components/RegistrationForm';
import { getEventConfig } from '@/lib/utils';

export default function HomePage() {
  const event = getEventConfig();
  return (
    <main className="min-h-screen px-4 py-10">
      <div className="max-w-2xl mx-auto space-y-5">
        <header className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{event.name}</h1>
          <p className="text-slate-500 mt-2">Fill in your details to reserve a seat</p>
        </header>
        <RegistrationForm />
        <p className="text-center text-slate-500">Registration fee: {event.ticketPrice.toLocaleString('en-US')} THB / person</p>
      </div>
    </main>
  );
}
