## apple music token generator for node

### usage

clone, download, or copy-paste this script somewhere in your node project.

place the .p8 private key file you generated somewhere accessible.

include or require your `teamId` and `keyId` from apple.

then just:

```
const path = require('path');

const getToken = require('./path-to-this-script');
const { teamId, keyId } = require('./path-to-your-config');

const certPath = path.resolve(__dirname, './path-to-your-p8-file');
const tokenData = getToken(certPath, teamId, keyId);

// tokenData == { token: 'generated_token', expiresAt: timeInSeconds }
```