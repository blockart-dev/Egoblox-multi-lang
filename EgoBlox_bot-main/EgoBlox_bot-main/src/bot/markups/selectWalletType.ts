export const selectWalletTypeMarkup = async () => {
  return {
    message: `Please Select Wallet type 👇`,
    keyboard: [
      [
        {
          text: 'Coinbase Smart Account',
          callback_data: JSON.stringify({
            command: '/createSmartWallet',
            language: 'english',
          }),
        },
      ],
      [
        {
          text: 'standard wallet',
          callback_data: JSON.stringify({
            command: '/createNormalWallet',
            language: 'english',
          }),
        },
      ],
      [
        {
          text: 'close ❌',
          callback_data: JSON.stringify({
            command: '/close',
            language: 'english',
          }),
        },
      ],
    ],
  };
};
