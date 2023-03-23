"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGPTModel = void 0;
var services_1 = __importDefault(require("../services"));
var ChatGPTModel = /** @class */ (function () {
    function ChatGPTModel() {
    }
    ChatGPTModel.prototype.getMessage = function (message) {
        return services_1.default.callGPTAPI(message);
    };
    return ChatGPTModel;
}());
exports.ChatGPTModel = ChatGPTModel;
