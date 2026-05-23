'use client';

import { useMemo, useState } from 'react';
import type { Registration } from '@/types';
import { Badge } from './ui/Badge';

export function CheckinSearch({ initialData }: { initialData: Registration[] }) {
  const [items, setItems] = useState(initialData);
  const [q, setQ] = useState('');
  const [pending, setPending] = useState<string>('');

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return items;
    return items.filter((r) =>
      [r.full_name, r.email, r.registration_id].join(' ').toLowerCase().includes(t),
    );
  }, [items, q]);

  async function checkin(registrationId: string) {
    setPending(registrationId);
    const res = await fetch('/api/checkin', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ registration_id: registrationId }),
    });
    if (res.ok) {
      setItems((prev) =>
        prev.map((i) =>
          i.registration_id === registrationId
            ? { ...i, status: 'checked_in', checked_in_at: new Date().toISOString() }
            : i,
        ),
      );
    }
    setPending('');
  }

  return (
    <div className="space-y-4">
      <input className="w-full px-4 py-3 border border-slate-300 rounded-lg" placeholder="Search name, email, or registration ID" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="space-y-3">
        {filtered.map((r) => (
          <div key={r.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-slate-900">{r.full_name}</p>
              <p className="text-sm text-slate-600">{r.email}</p>
              <p className="text-sm text-slate-500 font-mono">{r.registration_id}</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge status={r.status} />
              <button disabled={r.status === 'checked_in' || pending === r.registration_id} onClick={() => checkin(r.registration_id)} className="px-4 py-2 rounded-lg bg-emerald-600 text-white disabled:bg-slate-300">
                {pending === r.registration_id ? 'Updating...' : 'Check In'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
