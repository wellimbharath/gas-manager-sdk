## Gasmanager NodeJs SDK 

This is the official SDK for the Gasmanager API. It provides a simple way to interact with the API.
 
## Installation

```bash
npm install gas-manager-sdk
```


## Usage

```javascript
const Gasmanager = require('gas-manager-sdk');

const gasmanager = new Gasmanager({
    apiKey: 'your-api-key',
    projectId: 'your-project-id'
});

const feePayer = gasManager.getGasWalletAddress();

console.log(feePayer);

const relayUrl = gasManager.getRelayUrl();

console.log(relayUrl);

const hash = gasManager.submitTransaction();
```

## Documentation

You can find the full documentation [here](https://docs.nogas.io/)


