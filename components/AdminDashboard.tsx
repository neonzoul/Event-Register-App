'use client';

import type { Registration } from '@/types';

export function AdminDashboard({ data }: { data: Registration[] }) {
  const total = data.length;
  const checkedIn = data.filter((x) => x.status === 'checked_in').length;
  const remaining = total - checkedIn;

  function exportCSV() {
    const header = ['registration_id', 'full_name', 'email', 'phone', 'organization', 'ticket_count', 'status', 'created_at', 'checked_in_at'];
    const rows = data.map((r) => [r.registration_id, r.full_name, r.email, r.phone, r.organization ?? '', String(r.ticket_count), r.status, r.created_at, r.checked_in_at ?? '']);
    const csv = [header, ...rows]
      .map((row) => row.map((c) => `"${String(c).replaceAll('"', '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'registrations.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4"><p className="text-slate-500">Total</p><p className="text-2xl font-bold">{total}</p></div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4"><p className="text-slate-500">Checked In</p><p className="text-2xl font-bold text-emerald-700">{checkedIn}</p></div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4"><p className="text-slate-500">Remaining</p><p className="text-2xl font-bold text-amber-700">{remaining}</p></div>
      </div>
      <button onClick={exportCSV} className="px-4 py-2 rounded-lg bg-slate-800 text-white">Export CSV</button>
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50"><tr><th className="text-left p-3">ID</th><th className="text-left p-3">Name</th><th className="text-left p-3">Email</th><th className="text-left p-3">Status</th></tr></thead>
          <tbody>
            {data.map((r) => <tr key={r.id} className="border-t border-slate-200"><td className="p-3 font-mono">{r.registration_id}</td><td className="p-3">{r.full_name}</td><td className="p-3">{r.email}</td><td className="p-3">{r.status}</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
