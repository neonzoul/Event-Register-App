import generatePayload from 'promptpay-qr';
import QRCode from 'qrcode';

export async function generatePromptPayQR(promptPayId: string, amount: number): Promise<string> {
  const payload = generatePayload(promptPayId, { amount });
  return QRCode.toDataURL(payload, { width: 360, margin: 1 });
}
