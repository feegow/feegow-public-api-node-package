# Feegow Public API

## Importing

#### Node

1. `npm install @feegow/publicapi`
2. `const FeegowPublicAPI = require('@feegow/publicapi');`

#### HTML

1. `<script src="https://unpkg.com/@feegow/publicapi/FeegowPublicAPI.js"></script>`

## Usage

```
const feegowApi = new FeegowPublicAPI('<your_x_access_token>');

// Calls an endpoint without specifying version or passing parameters
feegowApi.getPatients();

// Calls an endpoint specifying version
feegowApi.getPatients('v1');

// Calls an endpoint specifying version and passing parameters
feegowApi.getPatients('v1', {
    "view_mode": "full", // not working
    "limit": 1, // not working
    "offset": 0,
    "telefone": "(21) 2018-0123",
    "cpf": "177.820.767-73"
});
