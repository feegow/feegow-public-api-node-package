
if (typeof exports != "undefined") {  
    var { atob } = require('atob');
    var axios = require('axios');
} else {
    import { atob } from 'atob';
    import axios from 'axios';
}

class FeegowPublicAPI {

    constructor(token) {

        this.getPatients = this.getPatients.bind(this)

        const tokenInfo = this.decryptJwt(token);

        if (!tokenInfo) {
            throw 'Token inválido';
        }

        this.token = token;
        this.tokenInfo = tokenInfo;
    }

    getPatients() {
        
        return new Promise((resolve, reject) => {

            const data = JSON.stringify({
                "view_mode": "full",
                "limit": 1,
                "offset": 0,
                "telefone": "(21) 2018-0123",
                "cpf": "177.820.767-73"
            });
    
            const config = {
                method: 'get',
                url: 'https://api.feegow.com/v1/api/patient/list',
                headers: {
                    'X-Access-Token': this.token,
                    'Content-Type': 'application/json'
                },
                data: data
            };
    
            axios(config)
                .then((response) => resolve(response['data']))
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
}

if (typeof exports != "undefined") {    
    module.exports = FeegowPublicAPI;
}