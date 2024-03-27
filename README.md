 # Solana Gas Manager SDK

The Solana Gas Manager SDK is a simple, one-page SDK that provides an easy way to manage gas payments for transactions on the Solana blockchain. It allows you to create and submit transactions with gas payments handled by a designated gas wallet.

## Installation

To install the Solana Gas Manager SDK, use npm:

```bash
npm install gas-manager-sdk
```

## Usage

First, import the `GasManager` class from the SDK:

```typescript
import { GasManager } from 'gas-manager-sdk';
```

Then, create an instance of the `GasManager` class by providing your API key and project ID:

```typescript
const gasManager = new GasManager('YOUR_API_KEY', 'YOUR_PROJECT_ID');
```

Before using the SDK, you need to initialize it by calling the `init` method:

```typescript
await gasManager.init();
```

### Creating and Submitting Transactions

To create a transaction, use the `createTransaction` method and provide an array of `TransactionInstruction` objects:

```typescript
const instructions: TransactionInstruction[] = [
  // Add your transaction instructions here
];
const transaction = gasManager.createTransaction(instructions);
```

To submit the transaction, use the `submitTransaction` method:

```typescript
gasManager.submitTransaction(transaction)
  .then((response) => {
    console.log('Transaction submitted:', response.data);
  })
  .catch((error) => {
    console.error('Error submitting transaction:', error);
  });
```

Alternatively, you can create and submit a transaction in a single step using the `createAndSubmitTransaction` method:

```typescript
gasManager.createAndSubmitTransaction(instructions)
  .then((response) => {
    console.log('Transaction submitted:', response.data);
  })
  .catch((error) => {
    console.error('Error submitting transaction:', error);
  });
```

### Creating and Submitting Versioned Transactions

To create a versioned transaction, use the `createVersionedTransaction` method and provide an array of `TransactionInstruction` objects and the recent blockhash:

```typescript
const instructions: TransactionInstruction[] = [
  // Add your transaction instructions here
];
const blockhash = 'RECENT_BLOCKHASH';
const transaction = gasManager.createVersionedTransaction(instructions, blockhash);
```

To submit the versioned transaction, use the `submitVersionedTransaction` method:

```typescript
gasManager.submitVersionedTransaction(transaction)
  .then((response) => {
    console.log('Versioned transaction submitted:', response.data);
  })
  .catch((error) => {
    console.error('Error submitting versioned transaction:', error);
  });
```

Alternatively, you can create and submit a versioned transaction in a single step using the `createAndSubmitVersionedTransaction` method:

```typescript
gasManager.createAndSubmitVersionedTransaction(instructions, blockhash)
  .then((response) => {
    console.log('Versioned transaction submitted:', response.data);
  })
  .catch((error) => {
    console.error('Error submitting versioned transaction:', error);
  });
```

### Managing Addresses

To add an address, use the `addAddress` method and provide an `Address` object:

```typescript
const address: Address = {
  // Add your address details here
};
gasManager.addAddress(address)
  .then((response) => {
    console.log('Address added:', response.data);
  })
  .catch((error) => {
    console.error('Error adding address:', error);
  });
```

To get the addresses associated with your project, use the `getAddress` method:

```typescript
gasManager.getAddress()
  .then((response) => {
    console.log('Addresses:', response.data);
  })
  .catch((error) => {
    console.error('Error getting addresses:', error);
  });
```
