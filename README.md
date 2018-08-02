# stoopidWallet
A lightweight multi-coin crypto wallet package.

### What's your status?
[![Travis](https://travis-ci.org/StoopidCompany/stoopidWallet.svg?branch=master)](https://travis-ci.org/StoopidCompany/stoopidWallet)
[![pull requests](https://img.shields.io/badge/pull%20requests-accepting-brightgreen.svg?style=flat)](https://github.com/StoopidCompany/stoopidWallet/fork)

### How do I install this?
This will eventually be an npm package.  It is not currently published.  It will be soon :)

### How do I use this?
This assumes that you've been able to get this from npm....which you currently can't. If you know how to use npm then you'd know how to fork this and include `stoopidwallet.js` anyway, so let's just assume you've installed this from npm or can otherwise modify the instructions yourself.  That way I don't have to entirely re-write this later.

First you're going to want to include the package and declare the class
```javascript
var StoopidWallet = require("../src/stoopidwallet");
var stoopidwallet = new StoopidWallet();
```

There are quite a few unified functions you can use with our Stoopid Wallet.  You can swap between coins using the `setCrypto()` method. If you wanted to use Bitcoin you could do so by setting `bitcoin` via `setCrypto()` like so:
```javascript
stoopidwallet.setCrypto('bitcoin');
```

After you establish what kind of coin you're going to be working with, you can create a wallet, create a transaction, and more! 

### That's not enough information!
We'll add more information to this README as the project rolls along.  For now, please checkout our [wiki](https://github.com/StoopidCompany/stoopidWallet/wiki) for more information.

### LICENSE
MIT