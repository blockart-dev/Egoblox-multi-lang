export const showBillsMarkup = async () => {
  // <s>Bills</s>
  return {
    message: `Bills:`,
    keyboard: [
      [
        {
          text: 'Buy Airtime 📞',
          callback_data: JSON.stringify({
            command: '/airtime',
            language: 'english',
          }),
        },
        {
          text: 'Buy Data 📲',
          callback_data: JSON.stringify({
            command: '/data',
            language: 'english',
          }),
        },
      ],
      [
        {
          text: 'Buy Electricity 💡',
          callback_data: JSON.stringify({
            command: '/light',
            language: 'english',
          }),
        },
        {
          text: 'Buy crypto ₦',
          web_app: {
            url: `https://sandbox--payments-widget.netlify.app/landing/${process.env.YELLOW_CARD_API_KEY}`,
          },
        },
      ],
      [
        {
          text: 'Send token 💸',
          callback_data: JSON.stringify({
            command: '/sendToken',
            language: 'english',
          }),
        },
        {
          text: 'Fund wallet 💵',
          callback_data: JSON.stringify({
            command: '/fundWallet',
            language: 'english',
          }),
        },
      ],
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
