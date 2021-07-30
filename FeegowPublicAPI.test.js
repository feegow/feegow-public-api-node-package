require('dotenv').config();

const FeegowPublicAPI = require('./FeegowPublicAPI');

var feegowApi;

test('Authenticate with valid token', () => {

    feegowApi = new FeegowPublicAPI(process.env.TOKEN);

    const tokenInfo = feegowApi.tokenInfo;

    //console.log(tokenInfo);

    expect(tokenInfo).toHaveProperty('iss');
    expect(tokenInfo).toHaveProperty('aud');
    expect(tokenInfo).toHaveProperty('iat');
    expect(tokenInfo).toHaveProperty('licenseID');
});

test('Authenticate with invalid token', () => {
    expect(() => {
        feegowApi = new FeegowPublicAPI('aefaefaefaef');
    }).toThrow('Token inválido');
});

test('Get all patients', async () => {
    await expect(feegowApi.getPatients()).resolves.toHaveProperty('success', true)
}, 10000);
