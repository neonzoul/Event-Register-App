import { generatePromptPayQR } from '@/lib/qr';
import { formatCurrency } from '@/lib/utils';

export async function QRPayment({ promptpayId, amount }: { promptpayId: string; amount: number }) {
  const qr = await generatePromptPayQR(promptpayId, amount);
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
      <h3 className="text-lg font-semibold text-slate-900 mb-2">Pay with PromptPay</h3>
      <p className="text-slate-600 mb-4">Amount due: {formatCurrency(amount)}</p>
      <img src={qr} alt="PromptPay QR" className="mx-auto w-64 h-64" />
      <p className="text-sm text-slate-500 mt-4">PromptPay: {promptpayId}</p>
    </div>
  );
}
