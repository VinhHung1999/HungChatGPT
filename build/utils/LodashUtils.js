"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var safeGetString = function (json, path, defaultValue) {
    var value = (0, lodash_1.get)(json, path);
    if (typeof value === "string") {
        return value;
    }
    return defaultValue;
};
var safeGetNumber = function (json, path, defaultValue) {
    var value = (0, lodash_1.get)(json, path);
    if (typeof value === "number") {
        return value;
    }
    return defaultValue;
};
var safeGet = function (json, path, defaultValue) {
    var value = (0, lodash_1.get)(json, path);
    if ((0, lodash_1.isNil)(value)) {
        return defaultValue;
    }
    return value;
};
var safeGetArray = function (json, path, defaultValue) {
    var value = (0, lodash_1.get)(json, path);
    if ((0, lodash_1.isArray)(value)) {
        return value;
    }
    return defaultValue;
};
exports.default = {
    safeGetString: safeGetString,
    safeGetNumber: safeGetNumber,
    safeGet: safeGet,
    safeGetArray: safeGetArray,
};
