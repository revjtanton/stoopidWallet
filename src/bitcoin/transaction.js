'use strict';
// A lot of this code was learned from Blockgeeks
// We didn't fork their repo, but the lesson used can be found here
// https://github.com/blockgeeks/bitcoin101

var keys = require('./keys');
var crypto = require('crypto');
var eccrypto = require('eccrypto');

var opcodes = {
    OP_DUP: '76',
    OP_HASH160: 'a9',
    OP_EQUALVERIFY: '88',
    OP_CHECKSIG: 'ac'
}

//================================
// Helper functions
//================================

function addPadding(num, bytes) {
    while(num.length < bytes*2) num = "0" + num;
    return num;
}

function toLE(input) {
    return input.match(/.{2}/g).reverse().join('');
}

function getFee() {
    return "10000"; 
}

function seralizeObjVal(obj) {
    var bin = Object.keys(obj).reduce((result, key) => {
        if (typeof obj[key] === 'object') {
            return result.concat(seralizeObjVal(obj[key]));
        } else {
            return result.concat(obj[key]);
        }
    }, []).join('');

    return bin;
}

function dsha256(data) {
    var bytes = Buffer.from(data, 'hex');
    var tmp = crypto.createHash('sha256').update(bytes).digest();
    var hash = crypto.createHash('sha256').update(tmp).digest();
    return hash;
}

//================================
// Signing Transaction
//================================

function ecdsa_sign(tx, priv) {
    var dhash = dsha256(tx);

    var key = Buffer.from(keys.decodePrivKey(priv), 'hex');

    return eccrypto.sign(key, dhash);
}

async function signInput(tx, indx, wallet) {
    var lockingKeyHash = tx.inputs[indx].unlockScript.slice(6,46);
    var pubKeyHash = keys.getKeyHashFromAddr(wallet.address);
    if (lockingKeyHash !== pubKeyHash) {
        throw new Error("Public key didn't match UTXO's locking requirement! Can't spend bitcoin!");
    }

    var newtx = JSON.parse(JSON.stringify(tx));

    for (var i = 0; i < newtx.inputs.length; i++) {
        if (i != indx) {
            newtx.inputs[i].scriptLength = '00';
            newtx.inputs[i].unlockScript = '';
        }
    }

    newtx.hashcode = "01000000"; 
    var binTx = seralizeObjVal(newtx);
    var signature = await ecdsa_sign(binTx, wallet.privateKey);
    signature = signature.toString('hex') + '01';

    var sigLenInBytes = toLE(addPadding((signature.length/2).toString(16), 1));
    var pubKeyLenInBytes = toLE(addPadding((wallet.publicKey.length/2).toString(16), 1));
    var unlockScript = sigLenInBytes + signature + pubKeyLenInBytes + wallet.publicKey;
    tx.inputs[indx].unlockScript = unlockScript.toString(16);
    tx.inputs[indx].scriptLength = (unlockScript.length/2).toString(16);
}

//================================
// Create Transaction
//================================

function getNewTx(inputs, outputs) {
    return {
        version: "01000000", 
        inputcount: toLE(addPadding(inputs.length.toString(16), 1)),
        inputs: inputs,
        outputcount: toLE(addPadding(outputs.length.toString(16), 1)),
        outputs: outputs,
        locktime: "00000000", 
    }
}

function createInputs(utxo, amount) {
    var inputs = [];
    var accum = 0;

    utxo.data.forEach(data => {
        if (accum < amount) {
            accum += data.value;
            inputs.push(data);
        }
    });

    inputs = inputs.map(tx => {
        var obj = {};
        obj.previousHash = toLE(tx.hash);
        obj.previousIndex = toLE(addPadding(tx.index.toString(16), 4));  
        obj.scriptLength = (tx.script.length/2).toString(16); 
        obj.unlockScript = tx.script; 
        obj.sequence = 'ffffffff'; 
        return obj;
    });

    inputs.push(accum);
    return inputs;
}

function createSingleOutput(amount, toAddr) {
    var pubKeyHash = keys.getKeyHashFromAddr(toAddr);
    var keyHashInBytes = (pubKeyHash.length/2).toString(16); 
    var script = opcodes.OP_DUP + opcodes.OP_HASH160 + keyHashInBytes + pubKeyHash + opcodes.OP_EQUALVERIFY + opcodes.OP_CHECKSIG; 

    var output = {};
    output.value = toLE(addPadding(amount.toString(16), 8));
    output.length = (script.length/2).toString(16); 
    output.script = script;

    return output;
}

function createOutputs(amount, toAddr, inputValue, wallet) {
    var outputs = [];

    outputs.push(createSingleOutput(amount, toAddr));

    var change = inputValue - amount - getFee();
    if (change > 0) {
        outputs.push(createSingleOutput(change, wallet.address));
    }

    return outputs;
}

async function create(utxo, amount, toAddr, wallet) {
    var inputs = createInputs(utxo, amount); 
    var inputValue = inputs.pop();
    var outputs = createOutputs(amount, toAddr, inputValue, wallet);
    var tx = getNewTx(inputs, outputs);
    
    for(var i = 0; i < inputs.length; i++) {
        await signInput(tx, i, wallet);
    }

    return seralizeObjVal(tx);
}

module.exports = {
    create
}