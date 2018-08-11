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

The default assumes you're working with Bitcoin via the BlockCypher API and you're using the main network.  You can change the crypto using the `setCrypto()` method like so:
```javascript
stoopidwallet.setCrypto("ethereum");
```

If using the BlockCypher API (currently the only option) you'll need to define the test network as `beth`. This is because BlockCypher uses their own testnet for Ethereum. For Bitcoin you'll need to define the test network as `test3`.  You can do that like this:
```javascript
stoopidwallet.setNetwork("beth");
```

Almost anything with a `set` also has a `get` function.  This is true with setting/getting crypto, network, api, or the wallets.  

To create a wallet for a crypto/network, just call the `setWallet()` method.  You an pass a private key to this to restore an existing wallet for that network.  Currently private key storage is not in the scope of this project, however we may add some management features in the future.  To create a new wallet complete with an address and private key, simply run:
```javascript
stoopidwallet.setWallet()
```

The `setWallet()` method returns a `Promise` which is the wallet object.  `stoopidwallet` will keep track of the separate wallets you may have at any given time.  In the future certain information, like balance, will be kept along with the address infromation for quick access. You can get the full wallet object of the active crypto at any time this way:
```javascript
stoopidwallet.getWallet()
```

### That's not enough information!
We'll add more information to this README as the project rolls along.  For now, please checkout our [wiki](https://github.com/StoopidCompany/stoopidWallet/wiki) for more information.

### LICENSE
MIT
