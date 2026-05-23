'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { registrationSchema } from '@/lib/validation';

export function RegistrationForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    organization: '',
    ticket_count: 1,
    special_requirements: '',
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError('');
    setErrors({});

    const parsed = registrationSchema.safeParse(form);
    if (!parsed.success) {
      const nextErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? 'form');
        nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.error?.includes('This email is already registered')) {
          setErrors((prev) => ({ ...prev, email: data.error }));
        } else {
          setServerError(data.error ?? 'Something went wrong. Please try again.');
        }
        return;
      }

      router.push(`/confirmation/${data.registration_id}`);
    } catch {
      setServerError('Unable to connect. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
      {serverError ? <div className="rounded-lg bg-red-50 border border-red-200 text-red-600 p-3 text-sm">{serverError}</div> : null}
      <Input label="Full name *" value={form.full_name} error={errors.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} disabled={loading} />
      <Input label="Email *" type="email" value={form.email} error={errors.email} onChange={(e) => setForm({ ...form, email: e.target.value })} disabled={loading} />
      <Input label="Phone *" value={form.phone} error={errors.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} disabled={loading} />
      <Input label="Organization" value={form.organization} error={errors.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} disabled={loading} />
      <Input label="Ticket count *" type="number" min={1} max={5} value={form.ticket_count} error={errors.ticket_count} onChange={(e) => setForm({ ...form, ticket_count: Number(e.target.value) })} disabled={loading} />
      <label className="block space-y-1">
        <span className="text-sm font-medium text-slate-700">Special requirements</span>
        <textarea className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 placeholder:text-slate-400 disabled:bg-slate-100 disabled:cursor-not-allowed" rows={3} value={form.special_requirements} onChange={(e) => setForm({ ...form, special_requirements: e.target.value })} disabled={loading} />
        {errors.special_requirements ? <p className="text-red-500 text-sm mt-1">{errors.special_requirements}</p> : null}
      </label>
      <Button type="submit" loading={loading}>{loading ? 'Submitting...' : 'Register'}</Button>
    </form>
  );
}
