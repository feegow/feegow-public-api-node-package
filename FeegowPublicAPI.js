if (typeof exports != "undefined") {
  var { atob } = require("atob");
  var fetch = require("node-fetch");
}

class FeegowPublicAPI {
  constructor(token) {
    this.getPatients = this.getPatients.bind(this);
    this.getAvailableSchedule = this.getAvailableSchedule.bind(this);
    this.checkAndFormatVersion = this.checkAndFormatVersion.bind(this);

    const tokenInfo = this.decryptJwt(token);

    if (!tokenInfo) {
      throw "Token inválido";
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
  getPatients(version = "v1", data = {}) {
    version = this.checkAndFormatVersion(version);

    return new Promise((resolve, reject) => {
      const filter = new URLSearchParams(data).toString();

      const headers = new Headers();
      headers.append("X-Access-Token", this.token);
      headers.append("Content-Type", "application/json");

      fetch(` https://api.feegow.com/v1/api/${version}patient/list?${filter}`, {
        method: "GET",
        headers: headers,
      })
        .then((res) => res.json())
        .then((json) => resolve(json))
        .catch((error) =>
          reject(error["response"] ? error["response"]["data"] : error)
        );
    });
  }

  /**
   * @example
   * const data = {
   *    "tipo": "P",
   *    "data_start": "2021-09-09",
   *    "data_end": "2021-09-09"
   * };
   * */
  getAvailableSchedule(version = "v1", data = {}) {
    version = this.checkAndFormatVersion(version);

    return new Promise((resolve, reject) => {
      const filter = new URLSearchParams(data).toString();
      const headers = new Headers();
      headers.append("X-Access-Token", this.token);
      headers.append("Content-Type", "application/json");

      fetch(` https://api.feegow.com/v1/api/${version}patient/list?${filter}`, {
        method: "GET",
        headers: headers,
      })
        .then((res) => res.json())
        .then((json) => resolve(json))
        .catch((error) =>
          reject(error["response"] ? error["response"]["data"] : error)
        );
    });
  }

  decryptJwt(token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (err) {
      return false;
    }
  }

  checkAndFormatVersion(version) {
    switch (version) {
      case "v1":
      case "V1":
        return "";
      case "v2":
      case "V2":
        return "v2/";
      case "v3":
      case "V3":
        return "v3/";
      default:
        throw "Unknown API version.";
    }
  }
}

if (typeof exports != "undefined") {
  module.exports = FeegowPublicAPI;
}
