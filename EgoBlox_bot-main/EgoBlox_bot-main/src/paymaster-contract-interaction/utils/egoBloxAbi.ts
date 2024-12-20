export const egoBloxAbi = [
  { type: 'receive', stateMutability: 'payable' },
  {
    type: 'function',
    name: 'transferERC20',
    inputs: [
      { name: '_token', type: 'address', internalType: 'contract IERC20' },
      { name: '_to', type: 'address', internalType: 'address' },
      { name: '_amount', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'transferETH',
    inputs: [{ name: '_to', type: 'address', internalType: 'address payable' }],
    outputs: [],
    stateMutability: 'payable',
  },
];
