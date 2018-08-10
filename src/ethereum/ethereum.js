'use strict';

var BlockCypher = require("../apis/blockcypher");
var tx = require('./transaction');
const COIN = 1000000000000000000; 

/**
 * Our Ethereum functionality. 
 */
class EthereumWallet {
    /**
     * Sets up our BlockCypher API
     * 
     * @todo replace BlockCypher with more options including our own hosted api.
     */
    constructor() {
        this.blockcypher = new BlockCypher();
    }

    /**
     * Gets the latest block number.
     * @return {Number} - The latest block number.
     */
    getLastBlockNumber() {
        return this.blockcypher.getLastBlockNumber();
    }

    /**
     * Gets the balance of an address.
     * @param {String} addr - The address to lookup.
     * @returns {Number} - The balance. 
     */
    getBalance(addr) {
        return this.blockcypher.getBalance(addr);
    }

    /**
     * Creates or restores a wallet.
     * @param {String} network - The network for the wallet.
     * @param {Number} key - The private key for a wallet to restore.
     * @returns {Object} - The active wallet object. 
     */
    createWallet(network="eth", key=0) {
        // if(key !== 0) {
        //     network = keys.getNetworkFromKey(key);
        // }
        // this.blockcypher.changeNetwork(network);

        // return keys.createWallet(network,key);
    }

    /**
     * Creates a transaction.
     * @param {Number} amount - The amount to send.
     * @param {String} toAddr - The address to send Ethereum too.
     * @param {Object} wallet - The full wallet object for the sending account.
     * @returns {Promise<Number>} - The transaction hash.
     */
    sendEthereum(amount, toAddr, wallet) {
    //     amount = (amount * COIN)/1; 

    //     return new Promise((resolve, reject) => {
    //         this.blockcypher.getUtxos(wallet.address).then(utxo => {
    //             return tx.create(utxo, amount, toAddr, wallet);
    //         }).then(tx => {
    //             return this.blockcypher.sendTx(tx);
    //         }).then(result => {
    //             resolve(result);
    //         }).catch(err => reject(err));
    //     })
    }
}

module.exports = EthereumWallet;