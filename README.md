<a name="StoopidWallet"></a>

## StoopidWallet
A single endpoint to use any wallet or coin or network.

**Kind**: global class

* [StoopidWallet](#StoopidWallet)
    * [new StoopidWallet()](#new_StoopidWallet_new)
    * [.setCrypto(crypto)](#StoopidWallet+setCrypto) ⇒ <code>String</code>
    * [.getCrypto()](#StoopidWallet+getCrypto) ⇒ <code>String</code>
    * [.getAllWallets()](#StoopidWallet+getAllWallets) ⇒ <code>Object</code>
    * [.getWallet()](#StoopidWallet+getWallet) ⇒ <code>Object</code>
    * [.getBalance()](#StoopidWallet+getBalance) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [.createWallet(network, key)](#StoopidWallet+createWallet) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.sendCoin(amount, toAddr)](#StoopidWallet+sendCoin) ⇒ <code>Promise.&lt;String&gt;</code>

<a name="new_StoopidWallet_new"></a>

### new StoopidWallet()
Creates the wallet and crypto globals.

<a name="StoopidWallet+setCrypto"></a>

### stoopidWallet.setCrypto(crypto) ⇒ <code>String</code>
Sets the active crypto for use.

**Kind**: instance method of [<code>StoopidWallet</code>](#StoopidWallet)
**Returns**: <code>String</code> - - Confirmation of the set crypto type.

| Param | Type | Description |
| --- | --- | --- |
| crypto | <code>String</code> | The type of coin we're going to work. |

<a name="StoopidWallet+getCrypto"></a>

### stoopidWallet.getCrypto() ⇒ <code>String</code>
Gets the active crypto or wallet type.

**Kind**: instance method of [<code>StoopidWallet</code>](#StoopidWallet)
**Returns**: <code>String</code> - - The active crypto being used.
<a name="StoopidWallet+getAllWallets"></a>

### stoopidWallet.getAllWallets() ⇒ <code>Object</code>
Gets all available wallets and returns them.

**Kind**: instance method of [<code>StoopidWallet</code>](#StoopidWallet)
**Returns**: <code>Object</code> - - The full wallet object.
<a name="StoopidWallet+getWallet"></a>

### stoopidWallet.getWallet() ⇒ <code>Object</code>
Gets the active wallet.

**Kind**: instance method of [<code>StoopidWallet</code>](#StoopidWallet)
**Returns**: <code>Object</code> - - The active wallet object.
<a name="StoopidWallet+getBalance"></a>

### stoopidWallet.getBalance() ⇒ <code>Promise.&lt;Number&gt;</code>
Gets the active wallet.

**Kind**: instance method of [<code>StoopidWallet</code>](#StoopidWallet)
**Returns**: <code>Promise.&lt;Number&gt;</code> - - The balance of the active wallet
<a name="StoopidWallet+createWallet"></a>

### stoopidWallet.createWallet(network, key) ⇒ <code>Promise.&lt;Object&gt;</code>
Creates or re-creates a wallet for the active crypto

**Kind**: instance method of [<code>StoopidWallet</code>](#StoopidWallet)
**Returns**: <code>Promise.&lt;Object&gt;</code> - - The active wallet object.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| network | <code>String</code> |  | The network for the wallet. |
| key | <code>String</code> | <code>0</code> | The private key for an existing wallet. |

<a name="StoopidWallet+sendCoin"></a>

### stoopidWallet.sendCoin(amount, toAddr) ⇒ <code>Promise.&lt;String&gt;</code>
Creates and sends a transaction for the current active crypto.

**Kind**: instance method of [<code>StoopidWallet</code>](#StoopidWallet)
**Returns**: <code>Promise.&lt;String&gt;</code> - - The transaction hash.

| Param | Type | Description |
| --- | --- | --- |
| amount | <code>Number</code> | The amount to send. |
| toAddr | <code>String</code> | The address to send crypto too. |