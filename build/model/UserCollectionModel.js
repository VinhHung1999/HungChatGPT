"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCollectionModel = void 0;
var MongoClientModel_1 = require("./MongoClientModel");
var UserModel_1 = require("./UserModel");
var lodash_1 = require("lodash");
var constants_1 = require("../constants");
var UserCollectionModel = /** @class */ (function (_super) {
    __extends(UserCollectionModel, _super);
    function UserCollectionModel() {
        var _this = _super.call(this) || this;
        _this.collection = _this.client.db("gpt-chatbot").collection("users");
        return _this;
    }
    UserCollectionModel.prototype.insertUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.collection.insertOne(user)];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, this.client.close()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    UserCollectionModel.prototype.findUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.collection.findOne({ id: id })];
                    case 2:
                        result = _a.sent();
                        if ((0, lodash_1.isNil)(result)) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, UserModel_1.UserModel.initiate(result)];
                }
            });
        });
    };
    UserCollectionModel.prototype.updateUserByUserInfo = function (user, newMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var currentTime, newPreMessage, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.connect()];
                    case 1:
                        _a.sent();
                        currentTime = new Date().getTime();
                        newPreMessage = __spreadArray(__spreadArray([], user.preMessage, true), [newMessage], false);
                        if (currentTime - user.requestTime > 5 * 3600000) {
                            newPreMessage = [];
                        }
                        return [4 /*yield*/, this.collection.updateOne({ id: user.id }, {
                                $set: {
                                    preMessage: newPreMessage,
                                    requestTime: new Date().getTime(),
                                },
                            })];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, this.client.close()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    UserCollectionModel.prototype.updateUserPreMessageById = function (id, newMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.findUserById(id)];
                    case 2:
                        result = _a.sent();
                        if ((0, lodash_1.isNil)(result)) {
                            this.insertUser(new UserModel_1.UserModel(id, [newMessage], new Date().getTime()));
                        }
                        else {
                            this.updateUserByUserInfo(result, newMessage);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserCollectionModel.prototype.getPreMessageInfoBy = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var messages, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        messages = [];
                        return [4 /*yield*/, this.findUserById(id)];
                    case 1:
                        user = _a.sent();
                        if ((0, lodash_1.isNil)(user) || user.preMessage.length === 0)
                            return [2 /*return*/, []];
                        user === null || user === void 0 ? void 0 : user.preMessage.forEach(function (message) {
                            messages.push({
                                role: constants_1.ChatRole.User,
                                content: message.user,
                            });
                            messages.push({
                                role: constants_1.ChatRole.Assistant,
                                content: message.bot,
                            });
                        });
                        return [2 /*return*/, messages];
                }
            });
        });
    };
    return UserCollectionModel;
}(MongoClientModel_1.MongoClientModel));
exports.UserCollectionModel = UserCollectionModel;
