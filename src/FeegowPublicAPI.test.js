const FeegowPublicAPI = require('./FeegowPublicAPI');

var feegowApi;

test('Authenticate', () => {

    feegowApi = new FeegowPublicAPI('');

    const tokenInfo = feegowApi.tokenInfo;

    expect(tokenInfo).not.toHaveProperty('iss');
    expect(tokenInfo).not.toHaveProperty('aud');
    expect(tokenInfo).not.toHaveProperty('iat');
});

test('Get all patients', async () => {

    await expect(feegowApi.getPatients()).resolves.toHaveProperty('success', true)

}, 10000);
