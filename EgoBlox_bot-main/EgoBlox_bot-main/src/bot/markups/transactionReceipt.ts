import * as dotenv from 'dotenv';
dotenv.config();

export const transactionReceiptMarkup = async (
  receipt: any,
  description?: any,
) => {
  const BASE_SCAN_URL =
    process.env.ENVIRONMENT === 'TESTNET'
      ? process.env.BASE_SCAN_URL_TESTNET
      : process.env.BASE_SCAN_URL;
  return {
    message: `<b>Transaction Receipt</b>\n\nHash: <a href="${BASE_SCAN_URL}/tx/${receipt.transactionHash}">${receipt.transactionHash}</a>\n\nStatus:${receipt.status === 0 ? 'Failed ❌' : 'Successful ✅'}\nDescription:${description || ''}`,

    keyboard: [
      [
        {
          text: 'Close ❌',
          callback_data: JSON.stringify({
            command: '/close',
            language: 'english',
          }),
        },
      ],
    ],
  };
};
