type Props = { status: 'registered' | 'checked_in' };

export function Badge({ status }: Props) {
  if (status === 'checked_in') {
    return <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">Checked In</span>;
  }
  return <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">Registered</span>;
}
