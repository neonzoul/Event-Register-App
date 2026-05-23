export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', maximumFractionDigits: 0 }).format(value);
}

export function getEventConfig() {
  return {
    name: process.env.NEXT_PUBLIC_EVENT_NAME ?? 'Academic Conference 2026',
    date: process.env.NEXT_PUBLIC_EVENT_DATE ?? '2026-07-15',
    time: process.env.NEXT_PUBLIC_EVENT_TIME ?? '09:00 - 17:00',
    venue: process.env.NEXT_PUBLIC_EVENT_VENUE ?? 'Main Hall, Building A, Floor 3',
    ticketPrice: Number(process.env.NEXT_PUBLIC_TICKET_PRICE ?? 500),
    promptpayId: process.env.NEXT_PUBLIC_PROMPTPAY_ID ?? '0812345678',
  };
}
