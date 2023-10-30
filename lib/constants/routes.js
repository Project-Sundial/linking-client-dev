"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PING_MONITOR = exports.GET_UPDATES = exports.GET_MONITORS = exports.CREATE_MONITOR = exports.BASE_URL = void 0;
var BASE_URL = exports.BASE_URL = 'http://localhost:58669'; // should be env variable
var PING_MONITOR = exports.PING_MONITOR = '/api/pings/';
var CREATE_MONITOR = exports.CREATE_MONITOR = '/api/monitors';
var GET_MONITORS = exports.GET_MONITORS = '/api/monitors';
var GET_UPDATES = exports.GET_UPDATES = '/api/updates';