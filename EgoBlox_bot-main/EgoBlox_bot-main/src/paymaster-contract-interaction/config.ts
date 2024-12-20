// //config.js
// import { createPublicClient, http } from 'viem';
// import { toCoinbaseSmartAccount } from 'viem/account-abstraction';
// import { baseSepolia } from 'viem/chains';
// import { privateKeyToAccount } from 'viem/accounts';

// // Your RPC url. Make sure you're using the right network (base vs base-sepolia)
// export const RPC_URL =
//   'https://api.developer.coinbase.com/rpc/v1/base/Y3cqPVNjohH5-Cgg_veLfU4qfsgY5kix';

// export const client = createPublicClient({
//   chain: baseSepolia,
//   transport: http(RPC_URL),
// });

// // Creates a Coinbase smart wallet using an EOA signer
// const owner = privateKeyToAccount(
//   '0xc8bebec368589697647d2de7745a37f5047ce0bc1825fe6ac160c48e7c403154',
// );
// export const account = async () => {
//   return await toCoinbaseSmartAccount({
//     client,
//     owners: [owner],
//   });
// };

import dotenv from 'dotenv';

// Updating path due to being executed in the examples/x directory
dotenv.config();

export const config = {
  rpc_url:
    'https://api.developer.coinbase.com/rpc/v1/base/Y3cqPVNjohH5-Cgg_veLfU4qfsgY5kix',
  private_key:
    '0xc8bebec368589697647d2de7745a37f5047ce0bc1825fe6ac160c48e7c403154',
  account_type: process.env.ACCOUNT_TYPE || 'simple',
  contract_address: '0x66519FCAee1Ed65bc9e0aCc25cCD900668D3eD49',
  function_name: 'mintTo',
  entry_point: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
};
