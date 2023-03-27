"use strict";
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
var constants_1 = require("../constants");
var axios = require("axios");
var callGPTAPI = function (messages) {
    var client = axios.create({
        headers: {
            Authorization: "Bearer " + process.env.GPT_ACCESS_TOKEN,
        },
    });
    return new Promise(function (resolve, reject) {
        var params = {
            messages: __spreadArray(__spreadArray([
                { role: constants_1.ChatRole.System, content: constants_1.INTRODUCTION_TEXT }
            ], messages, true), [
                { role: constants_1.ChatRole.System, content: constants_1.NOTE_IMPORTANT },
            ], false),
            model: "gpt-3.5-turbo",
        };
        client
            .post("https://api.openai.com/v1/chat/completions", params)
            .then(function (result) {
            resolve(result.data.choices[0].message.content);
        })
            .catch(function (err) {
            reject(err);
        });
    });
};
var sendMessageBackToFB = function (message, recipientId, pageId) {
    return new Promise(function (resolve, reject) {
        var params = {
            recipient: {
                id: recipientId,
            },
            messaging_type: "RESPONSE",
            message: {
                text: message,
            },
        };
        axios
            .post("https://graph.facebook.com/v16.0/".concat(pageId, "/messages?access_token=").concat(process.env.PAGE_ACCESS_TOKEN), params)
            .then(function (result) {
            resolve();
        })
            .catch(function (err) {
            reject(err);
        });
    });
};
var sendAction = function (recipientId, pageId) {
    return new Promise(function (resolve, reject) {
        var params = {
            recipient: {
                id: recipientId,
            },
            sender_action: constants_1.Action.typingOn,
        };
        axios
            .post("https://graph.facebook.com/v16.0/".concat(pageId, "/messages?access_token=").concat(process.env.PAGE_ACCESS_TOKEN), params)
            .then(function (result) {
            resolve();
        })
            .catch(function (err) {
            reject(err);
        });
    });
};
var Services = { callGPTAPI: callGPTAPI, sendMessageBackToFB: sendMessageBackToFB, sendAction: sendAction };
exports.default = Services;
