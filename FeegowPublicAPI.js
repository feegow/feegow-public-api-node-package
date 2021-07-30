
if (typeof exports != "undefined") {  
    var { atob } = require('atob');
    var fetch = require('node-fetch');
}

class FeegowPublicAPI {

    constructor(token) {

        this.getPatients = this.getPatients.bind(this);
        this.checkAndFormatVersion = this.checkAndFormatVersion.bind(this);

        const tokenInfo = this.decryptJwt(token);

        if (!tokenInfo) {
            throw 'Token inválido';
        }

        this.token = token;
        this.tokenInfo = tokenInfo;
    }

    /**
     * @example 
     * const data = {
     *    "view_mode": "full", // not working
     *    "limit": 1, // not working
     *    "offset": 0,
     *    "telefone": "(21) 2018-0123",
     *    "cpf": "177.820.767-73"
     * };
     * */
    getPatients(version = 'v1', data = {
        offset: null,
        limit: null,
        telefone: null,
        cpf: null,
        view_mode: null
    }) {

        version = this.checkAndFormatVersion(version);
        
        return new Promise((resolve, reject) => {

            const data = {
                "view_mode": "full", // not working
                "limit": 1, // not working
                "offset": 0,
                "telefone": "(21) 2018-0123",
                "cpf": "177.820.767-73"
            };

            const filter = new URLSearchParams(data).toString();
    
            fetch(` https://api.feegow.com/${version}/api/patient/list?${filter}`, { 
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true',
                    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
                    'Access-Control-Allow-Headers': 'x-access-token, access-control-allow-headers, origin, accept, x-requested-with, content-type, access-control-request-method, access-control-request-headers',
                    'X-Access-Token': this.token,
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(json => resolve(json))
                .catch((error) => reject(error['response'] ? error['response']['data'] : error));
        });
    }

    decryptJwt(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (err) {
            return false;
        }
    }

    checkAndFormatVersion(version) {
        switch(version) {
            case 'v1':
            case 'V1':
                return 'v1';
            case 'v2':
            case 'V2':
                return 'v2';
            case 'v3':
            case 'V3':
                return 'v3';
            default:
                throw 'Unknown API version.';
        }
    }
}

if (typeof exports != "undefined") {    
    module.exports = FeegowPublicAPI;
}