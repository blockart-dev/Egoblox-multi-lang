import { Injectable } from '@nestjs/common';
import { erc20Abi } from './utils/erc20Abi';
import { egoBloxAbi } from './utils/egoBloxAbi';
import {
  createBundlerClient,
  toCoinbaseSmartAccount,
} from 'viem/account-abstraction';
import { http, createPublicClient } from 'viem';
import { base, baseSepolia } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import * as dotenv from 'dotenv';
dotenv.config();

const RPC_URL =
  process.env.ENVIRONMENT === 'TESTNET'
    ? process.env.PAYMASTER_RPC_URL_TESTNET
    : process.env.PAYMASTER_RPC_URL_MAINNET;

const EGOBLOX_ADDRESS =
  process.env.ENVIRONMENT === 'TESTNET'
    ? process.env.EGOBLOX_ADDRESS_TESTNET
    : process.env.EGOBLOX_ADDRESS_MAINNET;

const chain = process.env.ENVIRONMENT === 'TESTNET' ? baseSepolia : base;

const publicClient = createPublicClient({
  chain: chain,
  transport: http(RPC_URL),
});

@Injectable()
export class ContractInteractionService {
  // Get account based on private key
  async getAccount(privateKey: `0x${string}`) {
    try {
      const owner = privateKeyToAccount(privateKey);
      console.log(owner);
      return await toCoinbaseSmartAccount({
        client: publicClient,
        owners: [owner],
      });
    } catch (error) {
      console.error('Error getting account:', error);
      throw error; // Rethrow the error to handle it in calling functions
    }
  }

  // Get bundler client for processing transactions
  private async getBundlerClient(privateKey: `0x${string}`) {
    const userAccount = await this.getAccount(privateKey);
    return createBundlerClient({
      account: userAccount,
      client: publicClient,
      transport: http(RPC_URL),
      chain: chain,
    });
  }

  // Helper function to estimate gas and adjust pre-verification gas
  private async estimateGas(userOperation, bundlerClient) {
    try {
      const estimate =
        await bundlerClient.estimateUserOperationGas(userOperation);
      estimate.preVerificationGas *= 2n; // Adjust preVerification upward
      return estimate;
    } catch (error) {
      console.error('Error estimating gas:', error);
      throw error; // Rethrow the error for further handling
    }
  }

  // Execute ETH transfer
  async executeEthTransferTransaction(
    privateKey: `0x${string}`,
    receiver: `0x${string}`,
    amount: number,
  ) {
    try {
      // Step 1: Get the user's account from the private key
      const userAccount = await this.getAccount(privateKey);
      console.log('This is the address:', userAccount.address);

      // Step 2: Initialize bundler client
      const bundlerClient = await this.getBundlerClient(privateKey);

      // Step 3: Create the ETH transfer transaction
      const ethTransferCall: any = {
        abi: egoBloxAbi,
        functionName: 'transferETH',
        to: EGOBLOX_ADDRESS,
        args: [receiver],
        value: amount * 10 ** 18, // Amount in ETH (converted to wei)
      };

      // Step 4: Assign the gas estimation logic
      userAccount.userOperation = {
        estimateGas: (userOperation) =>
          this.estimateGas(userOperation, bundlerClient),
      };

      // Step 5: Sign and send the transaction
      const userOpHash = await bundlerClient.sendUserOperation({
        account: userAccount,
        calls: [ethTransferCall],
        paymaster: true,
      });

      // Step 6: Wait for the transaction receipt
      const receipt = await bundlerClient.waitForUserOperationReceipt({
        hash: userOpHash,
      });
      console.log('Transaction receipt :', receipt);
      return receipt;
    } catch (error) {
      console.error('Error sending ETH transfer transaction:', error);
      throw error; // Rethrow to allow higher-level handling
    }
  }

  // Execute the ERC20 token transfer
  async executeTransferErc20Transaction(
    privateKey: `0x${string}`,
    tokenAddress: `0x${string}`,
    receiver: `0x${string}`,
    amount: number,
    decimals: number,
  ) {
    try {
      const userAccount = await this.getAccount(privateKey);
      console.log('This is address:', userAccount.address);
      const bundlerClient = await this.getBundlerClient(privateKey);

      const erc20TransferCall: any = {
        abi: erc20Abi,
        functionName: 'transfer',
        to: tokenAddress,
        args: [receiver, amount * 10 ** decimals],
      };

      userAccount.userOperation = {
        estimateGas: (userOperation) =>
          this.estimateGas(userOperation, bundlerClient),
      };

      // Sign and send the UserOperation
      const userOpHash = await bundlerClient.sendUserOperation({
        account: userAccount,
        calls: [erc20TransferCall],
        paymaster: true,
      });

      // Step 6: Wait for the transaction receipt
      const receipt = await bundlerClient.waitForUserOperationReceipt({
        hash: userOpHash,
      });
      console.log('Transaction receipt :', receipt);
      return receipt;
    } catch (error) {
      console.error('Error sending ERC20 transfer transaction:', error);
      throw error; // Rethrow to allow higher-level handling
    }
  }
}
