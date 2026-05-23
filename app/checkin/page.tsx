import { CheckinSearch } from '@/components/CheckinSearch';
import { createServerClient } from '@/utils/supabase/server';

export const dynamic = 'force-dynamic';

export default async function CheckinPage() {
  const supabase = createServerClient();
  const { data } = supabase
    ? await supabase.from('registrations').select('*').order('created_at', { ascending: false })
    : { data: [] };

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold">Check-in</h1>
        <CheckinSearch initialData={data ?? []} />
      </div>
    </main>
  );
}
