"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var model_1 = require("./model");
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
var app = (0, express_1.default)();
app.use(express_1.default.json());
var port = process.env.PORT || 3000;
var preMessage = "";
var TOKEN = "EAAQ3Xgh37mYBAL0mHL7lAWvcrqjNO7iFwWA3QNeVN5VJrrai0S0SEhQ3JPeXMZAXgY0NkrFJWzuaBTnMjXsTyLVvpRCJlDZBvpGrTIEUz9AwaT3TPJz6MKCOLQ4jvk4X6ZACVEchgPGANoLvkA6AAW8qLZAy2f8uR2w2H1ZAiuGxpYxnwM3dq";
var botChat = new model_1.BotChatModel();
app.get("/gpt", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userCollection, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userCollection = new model_1.UserCollectionModel();
                return [4 /*yield*/, userCollection.updateUserPreMessageById("123", {
                        user: "test",
                        bot: "test",
                    })];
            case 1:
                result = _a.sent();
                console.log(result);
                res.sendStatus(200);
                return [2 /*return*/];
        }
    });
}); });
app.get("/webhook", function (req, res) {
    // Parse the query params
    var mode = req.query["hub.mode"];
    var token = req.query["hub.verify_token"];
    var challenge = req.query["hub.challenge"];
    // Check if a token and mode is in the query string of the request
    if (mode && token) {
        // Check the mode and token sent is correct
        if (mode === "subscribe" && token === TOKEN) {
            // Respond with the challenge token from the request
            console.log("WEBHOOK_VERIFIED");
            res.status(200).send(challenge);
        }
        else {
            // Respond with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
    else {
        res.sendStatus(403);
    }
});
app.get("/private-right", function (req, res) {
    // Parse the query params
    res.sendStatus(200);
});
app.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, senderId, pageId, message, e_1;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return __generator(this, function (_l) {
        switch (_l.label) {
            case 0:
                _l.trys.push([0, 6, , 7]);
                body = req.body;
                senderId = ((_e = (_d = (_c = (_b = (_a = body.entry) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.messaging) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.sender) === null || _e === void 0 ? void 0 : _e.id) || "";
                pageId = (_f = body.entry) === null || _f === void 0 ? void 0 : _f[0].id;
                console.log("body: ", JSON.stringify(body));
                message = ((_j = (_h = (_g = body.entry) === null || _g === void 0 ? void 0 : _g[0].messaging) === null || _h === void 0 ? void 0 : _h[0].message) === null || _j === void 0 ? void 0 : _j.text) || "Nothing";
                if (!(body.object === "page")) return [3 /*break*/, 4];
                if (!(((_k = process.env.PAGE_ID) === null || _k === void 0 ? void 0 : _k.includes(pageId)) &&
                    senderId != process.env.PAGE_ID &&
                    message !== preMessage)) return [3 /*break*/, 2];
                console.log("message: ", message);
                preMessage = message;
                return [4 /*yield*/, botChat.answer(senderId, pageId, message)];
            case 1:
                _l.sent();
                res.status(200).send("EVENT_RECEIVED");
                return [3 /*break*/, 3];
            case 2:
                res.status(200).send("EVENT_RECEIVED");
                _l.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                res.status(200).send("EVENT_RECEIVED");
                _l.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                e_1 = _l.sent();
                console.log(e_1);
                res.sendStatus(404);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
