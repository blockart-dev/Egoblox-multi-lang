export const allFeaturesMarkup = async () => {
  return {
    message: `Please Select any action below 👇`,
    keyboard: [
      [
        {
          text: 'Wallet 💳',
          callback_data: JSON.stringify({
            command: '/walletFeatures',
            language: 'english',
          }),
        },
        {
          text: 'Bills 💡',
          callback_data: JSON.stringify({
            command: '/bills',
            language: 'english',
          }),
        },
      ],
      [
        {
          text: 'Buy crypto ₦',
          web_app: {
            url: `https://sandbox--payments-widget.netlify.app/landing/${process.env.YELLOW_CARD_API_KEY}`,
          },
        },
        {
          text: 'Send token 💸',
          callback_data: JSON.stringify({
            command: '/sendToken',
            language: 'english',
          }),
        },
      ],
      [
        {
          text: '📢 Share',
          language: 'english',
          switch_inline_query:
            'EgoBlox, managing your crypto has never been easier!.',
        },
      ],
    ],
  };
};
