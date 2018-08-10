<p align="center"><a href="https://kutt.it" title="kutt.it"><img src="https://stoopid.website/static/logo.67c58d89.png" alt="Stoopid Company"></a></p>

# stoopidWallet
A lightweight multi-coin crypto wallet package.

### What's your status?
[![Travis](https://travis-ci.org/StoopidCompany/stoopidWallet.svg?branch=master)](https://travis-ci.org/StoopidCompany/stoopidWallet)
[![pull requests](https://img.shields.io/badge/pull%20requests-accepting-brightgreen.svg?style=flat)](https://github.com/StoopidCompany/stoopidWallet/fork)
[![Twitter URL](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Check%20out%20this%20sick%20crypto%20wallet%20http%3A%2F%2Fstpd.io%2Fstpdwllt)

### How do I install this?
This will eventually be an npm package.  It is not currently published.  It will be soon :)

### How do I use this?
For now you'll have to checkout the repo and then include it, so....

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
