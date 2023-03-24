const axios = require("axios");

const callGPTAPI = (message: string): Promise<string> => {
  const client = axios.create({
    headers: {
      Authorization: "Bearer " + process.env.GPT_ACCESS_TOKEN,
    },
  });
  return new Promise((resolve, reject) => {
    const params = {
      messages: [{ role: "user", content: message }],
      model: "gpt-3.5-turbo",
    };
    client
      .post("https://api.openai.com/v1/chat/completions", params)
      .then((result: any) => {
        resolve(result.data.choices[0].message.content);
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
