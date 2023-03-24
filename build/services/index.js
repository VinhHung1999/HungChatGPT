"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios = require("axios");
var client = axios.create({
    headers: {
        Authorization: "Bearer " + "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",
    },
});
var callGPTAPI = function (message) {
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
var sendMessageBackToFB = function (recipientId, message) {
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
        client
            .post("https://graph.facebook.com/v16.0/121800517519786/messages?access_token=EAAQ3Xgh37mYBAMLY7mH4waq8mSiTTm4g4iVatZCfF8rLy71p790QMAbRWg6VACu6A7vXBDV2Bh2fVzsJYS1l0bcvQYg4riFsQmoGKS5SkoNINizLIgBCYd2qqPZCvae12Y1OnrD8JEaNoXH2pmIYWFdoTZAeTZBXWAoqrklyUySdNyUvpNJd", params)
            .then(function (result) {
            resolve(result.data.choices[0].text);
        })
            .catch(function (err) {
            reject(err);
        });
    });
};
var Services = { callGPTAPI: callGPTAPI, sendMessageBackToFB: sendMessageBackToFB };
exports.default = Services;
