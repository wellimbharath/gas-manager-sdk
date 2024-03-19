 
import { Transaction } from '@solana/web3.js';
import axios from 'axios';

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
        const response = await axios.get(this.BASE_URL + 'projects/'+this.projectId , {headers: {'x-api-key': this.apiKey}});
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
            tx: tx.serializeMessage().toString('base64')
        } 
        return axios.post(this.relayUrl, data, {headers: {'x-api-key': this.apiKey}});
    }
}

export default GasManager;
