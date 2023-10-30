"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addPath = void 0;
var addPath = exports.addPath = function addPath(crontabText) {
  if (crontabText.startsWith('PATH=/usr/local/bin:')) {
    return crontabText;
  }
  return 'PATH=/usr/local/bin:$PATH\n' + crontabText;
};