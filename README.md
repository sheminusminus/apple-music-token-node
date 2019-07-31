# apple music token node

[![Build Status](https://travis-ci.org/sheminusminus/apple-music-token-node.svg?branch=master)](https://travis-ci.org/sheminusminus/apple-music-token-node)

use javascript to generate your developer tokens for use with the apple music api.

*adapted from: https://github.com/pelauimagineering/apple-music-token-generator/blob/master/music_token.py*

## install


npm

```
npm install -S apple-music-token-node
```

yarn
```
yarn add apple-music-token-node
```

-or-

clone, download, or copy-paste this script somewhere in your node project.


## updating from v1.x to v2.x


if you don't want to use the async api available in v2, the only code change you need to make is to update from this:

```
const getToken = require('apple-music-token-node');
```

to this:

```
const { getToken } = require('apple-music-token-node');
```

and you're done!

if you *would* like to use the new async api, you can require it like so:

```
const { getTokenAsync } = require('apple-music-token-node');
```

`getTokenAsync` takes the same arguments as `getToken`, and returns a promise (and thus is usable with `async`/`await`). the promise resolves to the same object that would be returned by using `getToken`.


## usage


make sure you've placed the .p8 private key file you generated somewhere accessible. also, include or require your `teamId` and `keyId` from apple.

synchronous usage:

```
const path = require('path');
const { getToken } = require('apple-music-token-node');

const { teamId, keyId } = require('./path-to-your-config');

const certPath = path.resolve(__dirname, './path-to-your-p8-file');
const tokenData = getToken(certPath, teamId, keyId);

// tokenData == { token: 'generated_token', expiresAt: timeInSeconds }
```

asynchronous usage:

```
const path = require('path');
const { getTokenAsync } = require('apple-music-token-node');

const { teamId, keyId } = require('./path-to-your-config');

const certPath = path.resolve(__dirname, './path-to-your-p8-file');

const generate = async () => {
    const tokenData = await getTokenAsync(certPath, teamId, keyId);
    // tokenData == { token: 'generated_token', expiresAt: timeInSeconds }
    // ...
};

// -or-

const generate = () => {
    getTokenAsync(certPath, teamId, keyId).then((tokenData) => {
        // tokenData == { token: 'generated_token', expiresAt: timeInSeconds }
        // ...
    });
};

```

## cli mode


cli mode to help generate quick tokens during development. for this, install globally:

npm

```
npm i -g apple-music-token-node
```

yarn

```
yarn add -g apple-music-token-node
```

then you can run:

```
amtn
```

and it will prompt you for the data needed to generate your developer token.
(prints to the console).

![Data entered correctly](https://i.imgur.com/Z9yXFte.png)
![Basic file path suggestion for incorrect entries](https://i.imgur.com/nUunmcI.png)
