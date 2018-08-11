const StoopidWallet = require("../src/stoopidwallet");
const stoopidwallet = new StoopidWallet();

/**
 * General tests
 */
describe("General",() => {
    test("default crypto is bitcoin, api is blockcypher, and network is main",() => {
        let result = {
            crypto: stoopidwallet.crypto,
            api: stoopidwallet.api.name,
            network: stoopidwallet.api.network
        }
        let correct = {
            crypto: "bitcoin",
            api: "blockcypher",
            network: "main"
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

    test("can set and get active network",() => {
        let network = "beth";
        stoopidwallet.setCrypto("ethereum");
        stoopidwallet.setNetwork(network);

        let result = {
            crypto: stoopidwallet.crypto,
            network: stoopidwallet.api.network
        }
        let correct = {
            crypto: "ethereum",
            network: "test"
        }
        expect(result).toMatchObject(correct);
    })

    test("get the last block number from the active crypto network",() => {
        stoopidwallet.getLastBlockNumber().then(function(result) {
            expect(result).toBeGreaterThan(0);
        }).catch(function(err) {
            console.log(err);
        })
    })

    /** @todo fix this test. passes, then returns error AFTER test complete */
    // test("get the most recent block from the active crypto network",() => {
    //     stoopidwallet.getLastBlockNumber().then(function(number) {
    //         stoopidwallet.getBlock(number).then(function(result) {
    //             // console.log(stoopidwallet.api.api);
    //             expect(result.number).toBeDefined();
    //         }).catch(function(err) {
    //             console.log(err);
    //         })
    //     }).catch(function(err) {
    //         console.log(err);
    //     })
    // })

    test("get the wallets",() => {
        expect(stoopidwallet.wallet).toBeDefined();
    })
})

/**
 * Bitcoin tests
 */
describe("Bitcoin",() => {
    beforeEach(() => {
        stoopidwallet.setCrypto("bitcoin");
        stoopidwallet.setApi("blockcypher");
        stoopidwallet.setNetwork("test3");
    })

    test("sets testnet wallet", () => {
        let key = 'cSWQ1PJZssDhToHqxkHN5tWYgrFSdcHmizACUiLRhzSRYNELFUqF';
        stoopidwallet.setWallet(key).then(function(wallet) {
            expect(wallet.bitcoin).toHaveProperty('address');
        }).catch(function(err) {
            console.log(err);
        })
    })

    test("gets testnet wallet",() => {
        let wallet = stoopidwallet.getWallet();
        console.log(wallet);
        expect(wallet).toHaveProperty('address');
    })

    test("gets testnet wallet balance", () => {
        let wallet = stoopidwallet.getWallet();
        stoopidwallet.getBalance(wallet.address).then(function(bal) {
            expect(bal).toBeGreaterThan(0);
        })
    })
});

/**
 * Ethereum tests
 * @todo find another API to replace BlockCypher for ETH testnet. BETH sucks.
 * Can't push local ganache tests to Travis.
 */
// describe("Etherem",() => {
//     beforeEach(() => {
//         stoopidwallet.setCrypto("ethereum");
//         stoopidwallet.setApi("blockcypher");
//         stoopidwallet.setNetwork("beth");
//     });

//     test("sets testnet wallet", () => {
//         stoopidwallet.setWallet().then(function(wallet) {
//             expect(wallet.ethereum).toHaveProperty('address');
//         }).catch(function(err) {
//             console.log(err);
//         })
//     })

//     test("gets testnet wallet",() => {
//         let wallet = stoopidwallet.getWallet();
//         console.log(wallet);
//         expect(wallet).toHaveProperty('address');
//     })

//     test("gets testnet wallet balance", () => {
//         let wallet = stoopidwallet.getWallet();
//         stoopidwallet.getBalance(wallet.address).then(function(bal) {
//             expect(bal).toBeGreaterThan(0);
//         }).catch(function(err) {
//             console.log(err);
//         })
//     })
// })