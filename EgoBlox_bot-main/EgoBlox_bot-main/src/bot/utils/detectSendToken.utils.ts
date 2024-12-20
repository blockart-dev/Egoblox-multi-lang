export function detectSendToken(message) {
  // Regex to match /send <amount> <token> <receiver>, with support for ETH, USDC, DAI
  const regex =
    /\/send\s+(\d+(\.\d+)?)\s+(ETH|USDC|DAI)\s+(@?[\w.]+|0x[a-fA-F0-9]{40})/i;

  // Test the message against the regex
  const match = message.match(regex);

  if (match) {
    let receiver = match[4];
    let walletType;

    // Determine the wallet type based on the receiver pattern
    if (receiver.startsWith('@')) {
      walletType = 'username';
      receiver = receiver.slice(1); // Remove the "@" if it's a username
    } else if (receiver.endsWith('.eth')) {
      walletType = 'ens'; // It's an ENS domain
    } else if (/^0x[a-fA-F0-9]{40}$/.test(receiver)) {
      walletType = 'walletAddress'; // It's an Ethereum wallet address
    }

    return {
      action: 'send',
      amount: match[1], // The amount (e.g., "0.5")
      token: match[3].toUpperCase(), // Token (e.g., "ETH", "USDC", or "DAI")
      receiver: receiver, // The receiver without "@" if it's a username
      walletType: walletType, // Type of wallet: username, ens, or walletAddress
    };
  }

  // If no match, return null or an appropriate error message
  return null;
}
