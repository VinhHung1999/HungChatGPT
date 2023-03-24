const axios = require("axios");

const client = axios.create({
  headers: {
    Authorization:
      "Bearer " + "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",
  },
});

const callGPTAPI = (message: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const params = {
      prompt: message,
      model: "text-davinci-003",
      max_tokens: 10,
      temperature: 0,
    };
    client
      .post("https://api.openai.com/v1/completions", params)
      .then((result: any) => {
        resolve(result.data.choices[0].text);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

const sendMessageBackToFB = (
  recipientId: string,
  message: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const params = {
      recipient: {
        id: recipientId,
      },
      messaging_type: "RESPONSE",
      message: {
        text: message,
      },
    };
    client
      .post(
        "https://graph.facebook.com/v16.0/121800517519786/messages?access_token=EAAQ3Xgh37mYBAMLY7mH4waq8mSiTTm4g4iVatZCfF8rLy71p790QMAbRWg6VACu6A7vXBDV2Bh2fVzsJYS1l0bcvQYg4riFsQmoGKS5SkoNINizLIgBCYd2qqPZCvae12Y1OnrD8JEaNoXH2pmIYWFdoTZAeTZBXWAoqrklyUySdNyUvpNJd",
        params
      )
      .then((result: any) => {
        resolve(result.data.choices[0].text);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

const Services = { callGPTAPI, sendMessageBackToFB };

export default Services;
