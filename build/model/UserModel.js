"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var LodashUtils_1 = __importDefault(require("../utils/LodashUtils"));
var UserModel = /** @class */ (function () {
    function UserModel(id, preMessage, requestTime) {
        this.id = id;
        this.preMessage = preMessage;
        this.requestTime = requestTime;
    }
    UserModel.initiate = function (json) {
        var id = LodashUtils_1.default.safeGetString(json, "id", "");
        var preMessage = LodashUtils_1.default.safeGetArray(json, "preMessage", []);
        var requestTime = LodashUtils_1.default.safeGetNumber(json, "requestTime", 0);
        return new UserModel(id, preMessage, requestTime);
    };
    return UserModel;
}());
exports.UserModel = UserModel;
