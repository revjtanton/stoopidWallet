const StoopidWallet = require("../src/stoopidwallet");
const stoopidwallet = new StoopidWallet();

/**
 * General tests
 */
describe("General",() => {
    test("default api is blockcypher and default coin is bitcoin.",() => {
        let result = {
            api: stoopidwallet.api.name,
            crypto: stoopidwallet.crypto
        }
        let correct = {
            api: "blockcypher",
            crypto: "bitcoin"
        }
        expect(result).toMatchObject(correct);
    })

    test("can set and get active crypto",() => {
        let crypto = stoopidwallet.setCrypto("bitcoin");
        let result = stoopidwallet.getCrypto();
        expect(result).toBe(crypto);
    })

    test("can set and get active api",() => {
        let api = stoopidwallet.setApi("blockcypher");
        let result = stoopidwallet.getApi();
        expect(result.name).toBe(api.name)
    })

    test("get the last block number from the active crypto",() => {
        stoopidwallet.getLastBlockNumber().then(function(result) {
            expect(result).toBeGreaterThan(0);
        })
    })

    test("get the most recent block from the active crypto",() => {
        stoopidwallet.getLastBlockNumber().then(function(number) {
            stoopidwallet.getBlock(number).then(function(result) {
                expect(result.number).toBeGreaterThan(0);
            })
        })
    })

    test("get the wallets",() => {
        expect(stoopidwallet.wallet).toBeDefined();
    })
})

/**
 * Bitcoin tests
 */
// describe("Bitcoin",() => {
//     beforeEach(() => {
//         stoopidwallet.setCrypto('bitcoin');
//     })

//     test("gets the latest block number", () => {
//         stoopidwallet.getLastBlockNumber().then(function(number) {
//             expect(number).toBeGreaterThan(0);
//         })
//     })

//     test('sets testnet wallet', () => {
//         let key = 'cSWQ1PJZssDhToHqxkHN5tWYgrFSdcHmizACUiLRhzSRYNELFUqF';
//         stoopidwallet.createWallet('',key).then(function(wallet) {
//             expect(wallet.bitcoin).toHaveProperty('address');
//         }).catch(function(err) {
//             console.log(err);
//         })
//     });
// });

/**
 * Ethereum tests
 */
// describe("Etherem",() => {
//     beforeEach(() => {
//         stoopidwallet.setCrypto('ethereum');
//     });

//     test("gets the latest block number", () => {
//         stoopidwallet.getLastBlockNumber().then(function(number) {
//             expect(number).toBeGreaterThan(0);
//         })
//     })

//     test('sets beth testnet wallet', () => {
//         let key = "";
//         stoopidwallet.createWallet('',key).then(function(wallet) {
//             expect(wallet.ethereum).toHaveProperty('address');
//         }).catch(function(err) {
//             console.log(err);
//         })
//     })
// })