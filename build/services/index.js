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
            prompt: message,
            model: "text-davinci-003",
            max_tokens: 10,
            temperature: 0,
        };
        client
            .post("https://api.openai.com/v1/completions", params)
            .then(function (result) {
            resolve(result.data.choices[0].text);
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
                id: "6245799878821771",
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
