import { NextResponse } from 'next/server';
import { checkinSchema } from '@/lib/validation';
import { createServerClient } from '@/utils/supabase/server';

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const parsed = checkinSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const supabase = createServerClient();
    if (!supabase) {
      return NextResponse.json({ error: 'System is not configured yet' }, { status: 500 });
    }

    const { data: existing } = await supabase
      .from('registrations')
      .select('*')
      .eq('registration_id', parsed.data.registration_id)
      .single();

    if (!existing) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    if (existing.status === 'checked_in') {
      return NextResponse.json({ error: 'Already checked in' }, { status: 409 });
    }

    const { data, error } = await supabase
      .from('registrations')
      .update({ status: 'checked_in', checked_in_at: new Date().toISOString() })
      .eq('registration_id', parsed.data.registration_id)
      .select('*')
      .single();

    if (error) {
      return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
