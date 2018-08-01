'use strict';

var StoopidWallet = require("../src/stoopidwallet");
var stoopidwallet = new StoopidWallet();

var key = '';

stoopidwallet.setCrypto('ethereum');
stoopidwallet.createWallet('',key)
.then(function() {
    stoopidwallet.getBalance()
    .then(function(bal) {
        console.log(bal);
        return bal;
    })
    .then(function() {
        stoopidwallet.sendCoin(25,'').then(function(res) {
            console.log(res);
        })
    })
})
