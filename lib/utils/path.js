"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertPath = exports.addPath = void 0;
var addPath = exports.addPath = function addPath(crontabText) {
  if (crontabText.startsWith('PATH=/usr/local/bin:')) {
    return crontabText;
  }
  return 'PATH=/usr/local/bin:$PATH\n' + crontabText;
};
var convertPath = exports.convertPath = function convertPath(line) {
  if (line.startsWith('PATH') && !line.startsWith('PATH=/usr/local/bin:')) {
    var arr = line.split(' ').join('').split('=');
    arr[1] = '/usr/local/bin:' + arr[1];
    return arr.join('=');
  } else {
    return line;
  }
};