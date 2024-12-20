export function detectAirtime(message: string) {
  // Regex to match /airtime <amount> <phoneNumber> <token>, with support for ETH, USDC, DAI (case-insensitive)
  const regex = /\/airtime\s+(\d+(\.\d+)?)\s+(\d{11})\s+(ETH|USDC|DAI)/i;

  // Test the message against the regex
  const match = message.match(regex);

  if (match) {
    return {
      action: 'airtime',
      amount: match[1], // The amount (e.g., "100")
      phoneNumber: match[3], // The phone number (e.g., "07043258857")
      token: match[4].toUpperCase(), // Token (e.g., "ETH", "USDC", or "DAI")
    };
  }

  // If no match, return null or an appropriate error message
  return null;
}
