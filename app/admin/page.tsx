import { AdminDashboard } from '@/components/AdminDashboard';
import { createServerClient } from '@/utils/supabase/server';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const supabase = createServerClient();
  const { data } = supabase
    ? await supabase.from('registrations').select('*').order('created_at', { ascending: false })
    : { data: [] };

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <AdminDashboard data={data ?? []} />
      </div>
    </main>
  );
}
