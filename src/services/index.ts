const axios = require("axios");

const callGPTAPI = (message: string): Promise<string> => {
  const client = axios.create({
    headers: {
      Authorization: "Bearer " + process.env.GPT_ACCESS_TOKEN,
    },
  });
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
  message: string,
  recipientId: string
): Promise<void> => {
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
    axios
      .post(
        `https://graph.facebook.com/v16.0/${process.env.PAGE_ID}/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`,
        params
      )
      .then((result: any) => {
        resolve();
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

const Services = { callGPTAPI, sendMessageBackToFB };

export default Services;
