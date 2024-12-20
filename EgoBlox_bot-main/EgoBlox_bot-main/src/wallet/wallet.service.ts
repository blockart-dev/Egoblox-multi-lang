import { Injectable } from '@nestjs/common';
import * as multichainWallet from 'multichain-crypto-wallet';
import * as dotenv from 'dotenv';

dotenv.config();

const RPC_URL =
  process.env.ENVIRONMENT === 'TESTNET'
    ? process.env.RPC_URL_TESTNET
    : process.env.RPC_URL;

const USDC_ADDRESS =
  process.env.ENVIRONMENT === 'TESTNET'
    ? process.env.USDC_ADDRESS_TESTNET
    : process.env.USDC_ADDRESS;

const DAI_ADDRESS =
  process.env.ENVIRONMENT === 'TESTNET'
    ? process.env.DAI_ADDRESS_TESTNET
    : process.env.DAI_ADDRESS;

@Injectable()
export class WalletService {
  // create wallet
  createWallet = (): Record<string, string> => {
    const wallet = multichainWallet.createWallet({ network: 'ethereum' });
    return wallet;
  };

  getWalletFromMnemonic = (mnemonic: string): Record<string, string> => {
    const wallet = multichainWallet.generateWalletFromMnemonic({
      mnemonic,
      network: 'ethereum',
    });
    return wallet;
  };

  getAddressFromPrivateKey = (privateKey: string): Record<string, string> => {
    const wallet = multichainWallet.getAddressFromPrivateKey({
      privateKey,
      network: 'ethereum',
    });
    return wallet;
  };

  encryptWallet = async (
    password: string,
    privateKey: string,
  ): Promise<Record<string, string>> => {
    const encrypted = await multichainWallet.getEncryptedJsonFromPrivateKey({
      network: 'ethereum',
      privateKey,
      password,
    });
    return encrypted;
  };

  decryptWallet = async (
    password: string,
    encryptedWallet: string,
  ): Promise<Record<string, string>> => {
    const decrypted = await multichainWallet.getWalletFromEncryptedJson({
      network: 'ethereum',
      json: encryptedWallet,
      password,
    });
    return decrypted;
  };

  getEthBalance = async (address: string): Promise<Record<string, number>> => {
    const balance = await multichainWallet.getBalance({
      address,
      network: 'ethereum',
      rpcUrl: `${RPC_URL}`,
    });
    return balance;
  };

  getERC20Balance = async (
    address: string,
    tokenAddress: string,
  ): Promise<Record<string, number>> => {
    const balance = await multichainWallet.getBalance({
      address,
      network: 'ethereum',
      rpcUrl: `${RPC_URL}`,
      tokenAddress: tokenAddress,
    });
    return balance;
  };

  transferEth = async (
    privateKey: string,
    recipientAddress: string,
    amount: number,
    description?: string,
  ): Promise<Record<any, unknown>> => {
    const transer = await multichainWallet.transfer({
      recipientAddress,
      amount,
      network: 'ethereum',
      rpcUrl: `${RPC_URL}`,
      privateKey,
      // gasPrice: '20', // TODO: increase this for faster transaction
      data: description || '',
    });

    return transer;
  };

  transferUSDC = async (
    privateKey: string,
    recipientAddress: string,
    amount: number,
    description?: string,
  ): Promise<Record<any, unknown>> => {
    const transer = await multichainWallet.transfer({
      recipientAddress,
      amount,
      network: 'ethereum',
      rpcUrl: `${RPC_URL}`,
      privateKey,
      // gasPrice: '20', // TODO: increase this for faster transaction
      tokenAddress: USDC_ADDRESS,
      data: description || '',
    });

    return transer;
  };

  transferDAI = async (
    privateKey: string,
    recipientAddress: string,
    amount: number,
    description?: string,
  ): Promise<Record<any, unknown>> => {
    const transer = await multichainWallet.transfer({
      recipientAddress,
      amount,
      network: 'ethereum',
      rpcUrl: `${RPC_URL}`,
      privateKey,
      // gasPrice: '20', // TODO: increase this for faster transaction
      tokenAddress: DAI_ADDRESS,
      data: description || '',
    });

    return transer;
  };

  getTransactionReceipt = async (
    hash: string,
  ): Promise<Record<any, unknown>> => {
    const receipt = await multichainWallet.getTransaction({
      hash,
      network: 'ethereum',
      rpcUrl: `${RPC_URL}`,
    });

    return receipt;
  };
}
