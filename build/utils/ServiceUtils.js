"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var delay = function (ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};
exports.default = {
    delay: delay,
};
