'use strict';

var Web3 = require('web3');
const COIN = 1000000000000000000; 

class EthereumWallet {
    /**
     * Sets our web3 connection to ganache
     * 
     * @todo Offer other network connections and host our own master node.
     */
    constructor() {
        this.web3 = new Web3("ws://localhost:7545");
        this.network = 'ganache';
    }

    /**
     * Sets the active web3 connection
     * @param {String} network - The type of connection.
     */
    changeNetwork(network) {
        if(network === "metamask") {
            this.web3.setProvider(window.web3.currentProvider);
        } else if (network === "ganache") {
            this.network = "ganache";
            this.web3.setProvider(new Web3('ws://localhost:7545'));
        }
    }    

    /**
     * Sets the active crypto for use.
     * @returns {Object} - The full wallet object.
     */   

    createWallet() {
        var wallet = this.web3.eth.accounts.create('2435@#@#@±±±±!!!!678543213456764321§34567543213456785432134567');
        return wallet;
    }

    /**
     * Imports an existing wallet from the private key.
     * @param {String} privateKey - The private key we're restoring.
     * @returns {Object} - The full wallet object.
     */
    importWallet(privateKey) {
        return this.web3.eth.accounts.privateKeyToAccount(privateKey);
    }

    /**
     * Gets the number of transactions based on address.
     * @param {String} addr - The address to query.
     * @returns {Number} - The number of transactions.
     */
    getTransactionCount(addr) {
        return this.web3.eth.getTransactionCount(addr);
    }

    /**
     * Gets the balance of an address.
     * @param {String} addr - The address to query.
     * @returns {Promise<Number>} - The address balance. 
     */
    getBalance(addr) {
        return new Promise((resolve, reject) => {
            this.web3.eth.getBalance(addr, function (err, result) {
                if (err) reject(err);
                resolve(result / COIN);
            })
        })
    }

    /**
     * Creates and signs a new transaction.
     * @param {String} toAddr - The recipient address
     * @param {Number} val - The amount of ETH.
     * @param {Object} wallet - The full wallet object.
     * @returns {Promise<Object>} - Confirmation of the set crypto type. 
     */
    createTransaction(toAddr,val,wallet) {
        /** @todo Come up with a better number to string conversion. */
        var val = '' + val;
        var tx = {
            nonce: this.getTransactionCount(wallet.address),
            to: toAddr,
            value: this.web3.utils.toWei(val,'ether'),
            gas: 2000000
        }

        return new Promise((resolve, reject) => {
            this.web3.eth.accounts.signTransaction(tx,wallet.privateKey, function(err, result) {
                if (err) reject(err);
                resolve(result);
            })
        })
    }

    /**
     * Broadcasts a previously signed transaction to the blockchain.
     * @param {String} data - The raw transaction data hash.
     * @returns {String} - The transaction hash returned from the blockchain.
     */
    sendTransaction(data) {
        return new Promise((resolve, reject) => {
            this.web3.eth.sendSignedTransaction(data, function (err, result) {
                if(err) reject(err);
                resolve(result);
            })
        })
    }
}

module.exports = EthereumWallet;