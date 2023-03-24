"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios = require("axios");
var callGPTAPI = function (message) {
    var client = axios.create({
        headers: {
            Authorization: "Bearer " + process.env.GPT_ACCESS_TOKEN,
        },
    });
    return new Promise(function (resolve, reject) {
        var params = {
            messages: [{ role: "user", content: message }],
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
var sendMessageBackToFB = function (message, recipientId) {
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
            .post("https://graph.facebook.com/v16.0/".concat(process.env.PAGE_ID, "/messages?access_token=").concat(process.env.PAGE_ACCESS_TOKEN), params)
            .then(function (result) {
            resolve();
        })
            .catch(function (err) {
            reject(err);
        });
    });
};
var Services = { callGPTAPI: callGPTAPI, sendMessageBackToFB: sendMessageBackToFB };
exports.default = Services;
