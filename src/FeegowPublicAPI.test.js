const FeegowPublicAPI = require('./FeegowPublicAPI');

var feegowApi;

test('Authenticate', () => {

    feegowApi = new FeegowPublicAPI('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJmZWVnb3ciLCJhdWQiOiJwdWJsaWNhcGkiLCJpYXQiOjE2MjUwNjk5MTAsImxpY2Vuc2VJRCI6IjU0NTkiLCJzdWNjZXNzIjp0cnVlLCJ1c2VySWQiOiIzMDAwMjgiLCJsaWNlbnNlSWQiOiI1NDU5IiwiaXNIb21vbG9nIjp0cnVlLCJkYXRldGltZSI6IjIwMjEtMDYtMzAiLCJ2YWxpZF91bnRpbCI6IjIwMjEtMDctMDEifQ.PWj6gc78t1WzidUyp0lTOIizQhty5M9KkKwGvjMWn6w');

    const tokenInfo = feegowApi.tokenInfo;

    expect(tokenInfo).toHaveProperty('iss');
    expect(tokenInfo).toHaveProperty('aud');
    expect(tokenInfo).toHaveProperty('iat');
});

test('Get all patients', async () => {

    await expect(feegowApi.getPatients()).resolves.toHaveProperty('success', true)

}, 10000);