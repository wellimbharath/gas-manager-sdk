// Init gas manager 

import { GasManager } from '../index';

test('GasManager', async () => {
    const gasManager = new GasManager('0x0', '0x0');
 
    expect(gasManager.getGasWalletAddress()).toBe('0x0');
    expect(gasManager.getRelayUrl()).toBe('0x0');
}); 
