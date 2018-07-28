'use strict';

var BitcoinWallet = require("./bitcoin/bitcoin");
var bitcoin = new BitcoinWallet();

class StoopidWallet {
    constructor() {
        this.wallet = {
            bitcoin: {},
            ethereum: {}
        };
        this.crypto = '';
    }

    setCrypto(crypto) {
        this.crypto = crypto;
        return this.crypto;
    }

    getCrypto() {
        return this.crypto;
    }

    getWallet() {
        return this.wallet;
    }

    getBalance() {
        return new Promise((resolve, reject) => {
            if(this.crypto === 'bitcoin') {
                bitcoin.getBalance(this.wallet.bitcoin.address).then(function(bal) {
                    resolve(bal);
                })
            }
        })
    }

    createWallet(network='',key=0) {
        if(this.crypto === 'bitcoin') this.wallet.bitcoin = bitcoin.createWallet(network,key);

        return new Promise((resolve,reject) => {
            if(this.wallet === {}) reject("error, There is no wallet!");

            resolve(this.wallet);
        })
    }

    sendCoin(amount,toAddr) {
        return new Promise((resolve, reject) => {
            if(this.crypto === 'bitcoin') {
                bitcoin.sendBitcoin(amount,toAddr,this.wallet.bitcoin).then(function(result) {
                    resolve(result);
                })
            }
        })
    }
}

module.exports = StoopidWallet;