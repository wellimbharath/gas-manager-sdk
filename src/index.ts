import {
  PublicKey,
  Transaction,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js';
import axios from 'axios';
import { Address } from './models/address';

export class GasManager {
  private projectId = '0x0';
  private apiKey = '0x0';

  private BASE_URL = 'https://gasapi.solstation.xyz/v1/';

  private gasWalletAddress = '0x0';
  private relayUrl = '0x0';

  constructor(apiKey: string, projectId: string) {
    this.apiKey = apiKey;
    this.projectId = projectId;
  }

  public async init() {
    const response = await axios.get(this.BASE_URL + 'projects/' + this.projectId, {
      headers: { 'x-api-key': this.apiKey },
    });
    const data = response.data;
    this.gasWalletAddress = data.gasWalletAddress;
    this.relayUrl = data.relayUrl;
  }

  public getGasWalletAddress() {
    return this.gasWalletAddress;
  }

  public getRelayUrl() {
    return this.relayUrl;
  }

  public submitTransaction(tx: Transaction) {
    const data = {
      tx: tx.serializeMessage().toString('base64'),
    };
    return axios.post(this.relayUrl, data, { headers: { 'x-api-key': this.apiKey } });
  }

  public submitVersionedTransaction(tx: VersionedTransaction) {
    const data = {
      tx: tx.serialize(),
    };
    return axios.post(this.relayUrl, data, { headers: { 'x-api-key': this.apiKey } });
  }

  public addAddress(data: Address) {
    return axios.post(this.BASE_URL + 'projects/' + this.projectId + '/address', data, {
      headers: { 'x-api-key': this.apiKey, 'Content-Type': 'application/json' },
    });
  }

  public getAddress() {
    return axios.get(this.BASE_URL + 'projects/' + this.projectId + '/address', {
      headers: { 'x-api-key': this.apiKey, 'Content-Type': 'application/json' },
    });
  }

  //  a function to create transaction taking instructions from the user, add fee payer and return the transaction
  public createTransaction(instructions: TransactionInstruction[]) {
    const transaction = new Transaction();
    transaction.add(...instructions);
    transaction.feePayer = new PublicKey(this.gasWalletAddress);
    return transaction;
  }

  //  a function to create a versioned transaction taking instructions from the user, add fee payer and return the transaction
  public createVersionedTransaction(instructions: TransactionInstruction[], blockhash: string) {
    const message = new TransactionMessage({
      payerKey: new PublicKey(this.gasWalletAddress), // Public key of the account that will pay for the transaction
      recentBlockhash: blockhash, // Latest blockhash
      instructions: instructions, // Instructions included in transaction
    }).compileToV0Message();

    const transaction = new VersionedTransaction(message);
    return transaction;
  }

  // create and submit to relay
  public async createAndSubmitTransaction(instructions: TransactionInstruction[]) {
    const transaction = this.createTransaction(instructions);
    return this.submitTransaction(transaction);
  }

  // create and submit to relay versioned
  public async createAndSubmitVersionedTransaction(instructions: TransactionInstruction[], blockhash: string) {
    const transaction = this.createVersionedTransaction(instructions, blockhash);
    return this.submitVersionedTransaction(transaction);
  }
}

export default GasManager;
