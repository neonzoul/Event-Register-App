import { notFound } from 'next/navigation';
import { ConfirmationCard } from '@/components/ConfirmationCard';
import { QRPayment } from '@/components/QRPayment';
import { createServerClient } from '@/utils/supabase/server';
import { getEventConfig } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function ConfirmationPage({ params }: { params: { id: string } }) {
  const supabase = createServerClient();
  if (!supabase) notFound();

  const { data, error } = await supabase.from('registrations').select('*').eq('registration_id', params.id).single();

  if (error || !data) notFound();

  const event = getEventConfig();
  const amount = data.ticket_count * event.ticketPrice;

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="max-w-2xl mx-auto space-y-4">
        <ConfirmationCard registration={data} />
        <QRPayment promptpayId={event.promptpayId} amount={amount} />
      </div>
    </main>
  );
}
