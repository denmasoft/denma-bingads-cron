'use strict';
var Client = require('node-rest-client').Client;
var Connection = module.exports = function(options) {
    options = options || {};
    this._headers = {'Content-Type': 'application/json'};
    this._data = {};
    this._data.headers = this._headers;
    this._url = options.url;
    this._client = new Client();
  };
  Connection.prototype.log = function(data) {
    this._data.data = data;
    this._client.post(this._url, this._data, function (result, response) {});
};

Connection.prototype.logInfo = function(data) {
  this._data.data = data;
  this._client.post(this._url, this._data, function (result, response) {});
};