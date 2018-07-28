'use strict';

var BlockCypher = require("../apis/blockcypher");
var keys = require('./keys');
var tx = require('./transaction');
const COIN = 100000000; 

class BitcoinWallet {
    constructor() {
        this.blockcypher = new BlockCypher();
    }

    getBalance(addr) {
        return this.blockcypher.getBalance(addr);
    }

    createWallet(network="mainnet", key=0) {
        if(key !== 0) {
            network = keys.getNetworkFromKey(key);
        }
        this.blockcypher.changeNetwork(network);

        return keys.createWallet(network,key);
    }

    sendBitcoin(amount, toAddr, wallet) {
        amount = (amount * COIN)/1; 

        return new Promise((resolve, reject) => {
            this.blockcypher.getUtxos(wallet.address).then(utxo => {
                return tx.create(utxo, amount, toAddr, wallet);
            }).then(tx => {
                return this.blockcypher.sendTx(tx);
            }).then(result => {
                resolve(result);
            }).catch(err => reject(err));
        })

    }
}

module.exports = BitcoinWallet;