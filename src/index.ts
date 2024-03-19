 
import { Transaction } from '@solana/web3.js';
import axios from 'axios';

export class GasManager {

    private projectId: string = '0x0';
    private apiKey: string = '0x0';

    private BASE_URL: string = 'https://gasmanager.nogas.io/v1/';

    private gasWalletAddress: string = '0x0';
    private relayUrl :string = '0x0';

    constructor(apiKey: string, projectId: string) {
        this.apiKey = apiKey;
        this.projectId = projectId;
        this.init();
    }

    public async init() {
        let response = await axios.get(this.BASE_URL + 'projects/'+this.projectId , {headers: {'x-api-key': this.apiKey}});
        let data = response.data;
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
        let data = {
            tx: tx.serializeMessage().toString('base64')
        } 
        return axios.post(this.relayUrl, data, {headers: {'x-api-key': this.apiKey}});
    }
}

export default GasManager;
