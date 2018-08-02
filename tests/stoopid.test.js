const StoopidWallet = require("../src/stoopidwallet");
const stoopidwallet = new StoopidWallet();

describe("Bitcoin",() => {
    beforeEach(() => {
        stoopidwallet.setCrypto('bitcoin');
    });

    test('sets testnet wallet', () => {
        let key = 'cSWQ1PJZssDhToHqxkHN5tWYgrFSdcHmizACUiLRhzSRYNELFUqF';
        stoopidwallet.createWallet('',key).then(function(wallet) {
            expect(wallet.bitcoin).toHaveProperty('address');
        }).catch(function(err) {
            console.log(err);
        })
    });
});