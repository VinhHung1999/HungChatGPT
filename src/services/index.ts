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

const Services = { callGPTAPI };

export default Services;
