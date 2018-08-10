'use strict';
// A lot of this code was learned from Blockgeeks
// We didn't fork their repo, but the lesson used can be found here
// https://github.com/blockgeeks/bitcoin101

var crypto = require('crypto');
var base58 = require('bs58');
var ecurve = require('ecurve');
var BigInteger = require('bigi');
var getRandomValue = require('get-random-values');

function createPrivKey() {
    return Buffer.from(getRandomValue(new Uint8Array(32))).toString('hex');
}

function createKeyPair(key = 0) {
    var privateKey = (key === 0) ? createPrivKey() : decodePrivKey(key);
    var elliptic = ecurve.getCurveByName('secp256k1');
    var publicKey = elliptic.G.multiply(BigInteger.fromHex(privateKey));
    publicKey = publicKey.getEncoded(true).toString('hex');

    return {private: privateKey, public: publicKey};
}

function generateAddr(publicKey, network="main") {
    var bytes = Buffer.from(publicKey, 'hex');
    var tmp = crypto.createHash('sha256').update(bytes).digest();
    var pubKeyHash = crypto.createHash('rmd160').update(tmp).digest();

    var versionPrefix = (network === "test3") ? "6f" : "00";
    var input = versionPrefix + pubKeyHash.toString('hex');

    bytes = Buffer.from(input, 'hex');
    tmp = crypto.createHash('sha256').update(bytes).digest();
    var checksum = crypto.createHash('sha256').update(tmp).digest();

    var addr = input + checksum.toString('hex').substr(0,8);

    bytes = Buffer.from(addr, 'hex');
    addr = base58.encode(bytes);
    return addr;
}

function getKeyHashFromAddr(addr) {
    var bytes = base58.decode(addr);
    bytes = bytes.slice(1,21); 
    return bytes.toString('hex');
}

function encodePrivKey(privateKey, network="main") {
    var prefix = (network === "test3") ? "EF" : "80";
    var newKey = prefix + privateKey + "01";

    var bytes = Buffer.from(newKey, 'hex');
    var tmp = crypto.createHash('sha256').update(bytes).digest();
    var checksum = crypto.createHash('sha256').update(tmp).digest();

    newKey += checksum.toString('hex').substr(0,8);

    bytes = Buffer.from(newKey, 'hex');
    const key = base58.encode(bytes);
    return key;
}

function decodePrivKey(key) {
    var bytes = base58.decode(key);

    bytes = bytes.slice(1,33);
    return bytes.toString('hex');
}

function getNetworkFromKey(key) {
    var network = "unkown";
    if (key !== 0) {
        var first = key.charAt(0);

        if (first === 'K' || first === 'L') {
            network = "main";
        } else if (first === 'c') {
            network = "test3";
        } 
    }
    return network;
}

function createWallet(network="main", importKey=0) {
    var keys = createKeyPair(importKey);
    var addr = generateAddr(keys.public, network);

    return {
        privateKey: encodePrivKey(keys.private, network),
        publicKey: keys.public,
        address: addr
    }
}

module.exports = {
    createWallet,
    getNetworkFromKey,
    getKeyHashFromAddr,
    decodePrivKey
}