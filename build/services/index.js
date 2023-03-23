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
var Services = { callGPTAPI: callGPTAPI };
exports.default = Services;
