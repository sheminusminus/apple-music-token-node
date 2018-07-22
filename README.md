## apple music token node

[![Build Status](https://travis-ci.org/sheminusminus/apple-music-token-node.svg?branch=master)](https://travis-ci.org/sheminusminus/apple-music-token-node)

use javascript to generate your developer tokens for use with the apple music api.

*adapted from: https://github.com/pelauimagineering/apple-music-token-generator/blob/master/music_token.py*

### install

```
npm install -S apple-music-token-node
```

-or-

clone, download, or copy-paste this script somewhere in your node project.

### usage

make sure you've placed the .p8 private key file you generated somewhere accessible. also, include or require your `teamId` and `keyId` from apple.


```
const path = require('path');
const getToken = require('apple-music-token-node');

const { teamId, keyId } = require('./path-to-your-config');

const certPath = path.resolve(__dirname, './path-to-your-p8-file');
const tokenData = getToken(certPath, teamId, keyId);

// tokenData == { token: 'generated_token', expiresAt: timeInSeconds }
```

### cli mode

cli mode to help generate quick tokens during development. for this, install globally:

```
npm i -g apple-music-token-node
```

then you can run

```
amtn
```

and it will prompt you for the data needed to generate your developer token.
(prints to the console).

![Data entered correctly](https://i.imgur.com/Z9yXFte.png)
![Basic file path suggestion for incorrect entries](https://i.imgur.com/nUunmcI.png)
