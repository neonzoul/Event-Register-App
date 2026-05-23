import { NextResponse } from 'next/server';
import { registrationSchema } from '@/lib/validation';
import { createServerClient } from '@/utils/supabase/server';
import { sendConfirmationEmail } from '@/lib/email';

function randomRegistrationId() {
  return `REG-${Math.floor(10000 + Math.random() * 90000)}`;
}

async function generateUniqueId() {
  const supabase = createServerClient();
  if (!supabase) throw new Error('Supabase is not configured');

  for (let i = 0; i < 10; i++) {
    const candidate = randomRegistrationId();
    const { data } = await supabase.from('registrations').select('id').eq('registration_id', candidate).maybeSingle();
    if (!data) return candidate;
  }
  throw new Error('failed to generate registration id');
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registrationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid input' }, { status: 400 });
    }

    const supabase = createServerClient();
    if (!supabase) {
      return NextResponse.json({ error: 'System is not configured yet' }, { status: 500 });
    }

    const registration_id = await generateUniqueId();

    const payload = {
      ...parsed.data,
      registration_id,
      organization: parsed.data.organization || null,
      special_requirements: parsed.data.special_requirements || null,
    };

    const { data, error } = await supabase.from('registrations').insert(payload).select('*').single();

    if (error) {
      if (error.message.toLowerCase().includes('email')) {
        return NextResponse.json({ error: 'This email is already registered' }, { status: 409 });
      }
      return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }

    sendConfirmationEmail(data).catch((e) => console.error('Email send failed', e));

    return NextResponse.json({ registration_id: data.registration_id, message: 'ok' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
