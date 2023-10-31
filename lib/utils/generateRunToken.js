"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateRunToken = void 0;
var _crypto = _interopRequireDefault(require("crypto"));
var _runToken = require("../constants/runToken.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var generateRunToken = exports.generateRunToken = function generateRunToken() {
  var bytes = _crypto["default"].randomBytes(_runToken.RUN_TOKEN_LENGTH / 2); // Divide by 2 to get the number of bytes
  return bytes.toString('hex');
};