'use strict';

var request = require('request');
var Bitcoin = require('../bitcoin/bitcoin');
const BTC = 100000000;
const ETH = 1000000000000000000;

/**
 * This connects to the BlockCypher API.
 * We use this to get data about the Bitcoin network
 * But also to transmit signed transactions.
 * This works with either the mainnet or testnet.
 */
class BlockCypher {
    /**
    * Sets the api endpoint and network.
    * @param {String} [crypto = "bitcoin"] - The crypto we're interacting with.
    * @param {String} [network = "main"] - The network we're intereacting with.
    */
    constructor(crypto = "bitcoin",network = "main") {
        this.bitcoin = new Bitcoin();

        if(crypto === "bitcoin") this.api = "https://api.blockcypher.com/v1/btc/";
        if(crypto === "ethereum") this.api = "https://api.blockcypher.com/v1/eth/";
        this.crypto = crypto;

        if(network === "beth") {
            this.api = "https://api.blockcypher.com/v1/beth/";
            this.network = "test";
        } else {   
            this.network = network;
        }

        this.name = "blockcypher";
    }

    /**
     * Sets the active crypto for use.
     * @param {String} crypto - The type of coin we're going to work.
     * @returns {String} - Confirmation of the set crypto type. 
     */
    setCrypto(crypto,network = "main") {
        if(crypto === "bitcoin") this.api = "https://api.blockcypher.com/v1/btc/";
        if(crypto === "ethereum") this.api = "https://api.blockcypher.com/v1/eth/";

        this.crypto = crypto;
        this.changeNetwork(network);

        return this.crypto;
    }

    /**
     * Changes the active Bitcoin network. 
     * Can be main, beth, or test3.
     * @param {String} network - The network we're setting.
     */
    changeNetwork(network) {
        if(network === "beth") {
            this.crypto = "ethereum";
            this.api = "https://api.blockcypher.com/v1/beth/";
            this.network = "test";
        } else {
            this.network = network;
        }

        return this.network;
    }

    /**
     * Gets the last block from the blockchain.
     * @returns {Promise<Number>} - The latest block number for the set network.
     */
    getLastBlockNumber() {
        var url = this.api + this.network;

        return new Promise((resolve, reject) => {
            request(url, (err, res, body) => {
                if(err) reject(err);
                var result = JSON.parse(body)
                resolve(result.height);
            })
        })
    }

    /**
     * Gets a block from the blockchain by its id.
     * @param {Number} id - The block id.
     * @returns {Promise<Object>} - The block object.
     */
    getBlock(id) {
        var url = this.api + this.network + '/blocks/' + id;

        return new Promise((resolve, reject) => {
            request(url, (err, res, body) => {
                if(err) reject(err);
                var result = JSON.parse(body);
                resolve({
                    hash: result.hash,
                    number: result.height,
                    time: result.time
                })
            })
        })
    }
    /**
     * Gets the balance of an address instead of adding up UTXO's.
     * @param {String} addr - The Bitcoin address.
     * @returns {Promise<Object>} - The balance. 
     */

    getBalance(addr) {
        var url = this.api + this.network + '/addrs/' + addr + '/balance';

        return new Promise((resolve, reject) => {
            request(url, (err, res, body) => {
                if (err) reject(err);
                var result = JSON.parse(body);
                if(this.crypto === "bitcoin") resolve(result.balance / BTC);
                if(this.crypto === "ethereum") resolve(result.balance / ETH);
            })
        })
    }

    /**
     * Creates or restores a wallet.
     * @param {String} [key = 0] - The private key if we're restoring a wallet.
     * @returns {Object} - The active wallet object. 
     */
    setWallet(key = 0) {
        let wallet = "";
        if(this.crypto === "bitcoin") wallet = this.bitcoin.createWallet(this.network,key);

        return wallet;
    }

    /**
     * Gets the UTXO's from an address.
     * @param {String} addr - The Bitcoin address.
     * @returns {Promise<Object>} - The UTXO set. 
     */
    getUtxos(addr) {
        var url = this.api + this.network + '/addrs/' + addr + '?unspentOnly=true&includeScript=true';

        return new Promise((resolve, reject) => {
            request(url, (err, res, body) => {
                if (err) reject(err);
                var data = JSON.parse(body);
                var result = data.txrefs.map(tx => {
                    return {
                        hash: tx.tx_hash,
                        index: tx.tx_output_n,
                        value: tx.value,
                        script: tx.script
                    };
                });
                resolve({data: result});
            })
        })
    }

    /** @todo make a history call. Issue #10 */
    // getHistory(addr) {
    //     var url = this.api + this.network + '/addrs/' + addr + '/full?limit=50';
    //     return new Promise((resolve, reject) => {
    //         request(url, (err, res, body) => {
    //             if(err) reject(err);
    //             var data = JSON.parse(body);
    //             console.log(data);
    //         })
    //     })
    // }

    /**
     * Broadcasts a new transaction to the Bitcoin network.
     * @param {JSON} data - The signed and fully formed transaction.
     * @returns {Promise<Object>} - The transaction hash returned from the network. 
     */
    sendTx(data) {
        var url = this.api + this.network + '/txs/push';
        var payload = {tx: data};

        return new Promise((resolve, reject) => {
            request.post({url: url, form: JSON.stringify(payload)}, (err, res, body) => {
                if (err) reject(err);
                var result = JSON.parse(body);
                resolve(result.tx.hash)
            })
        })
    }
}

module.exports = BlockCypher;