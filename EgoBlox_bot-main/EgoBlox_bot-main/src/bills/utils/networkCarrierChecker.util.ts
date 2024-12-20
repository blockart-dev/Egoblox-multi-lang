export const getCarrier = (phoneNumber: string): string | null => {
  const mtnRegex =
    /^(0803|0806|0703|0903|0906|0806|0706|0813|0810|0814|0816|0913|0916)/;
  const gloRegex = /^(0805|0705|0905|0807|0815|0811|0915)/;
  const airtelRegex = /^(0802|0902|0701|0808|0708|0812|0901|0907)/;
  const etisalatRegex = /^(0809|0909|0817|0818|0908)/;

  if (mtnRegex.test(phoneNumber)) {
    return 'MTN NIGERIA';
  } else if (gloRegex.test(phoneNumber)) {
    return 'GLO NIGERIA';
  } else if (airtelRegex.test(phoneNumber)) {
    return 'AIRTEL NIGERIA';
  } else if (etisalatRegex.test(phoneNumber)) {
    return '9MOBILE NIGERIA';
  } else {
    return null;
  }
};
