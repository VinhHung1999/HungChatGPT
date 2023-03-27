import {
  Action,
  ChatRole,
  INTRODUCTION_TEXT,
  NOTE_IMPORTANT,
} from "../constants";
import { GPTChatModel } from "../model/GPTChatModel";

const axios = require("axios");

const callGPTAPI = (messages: GPTChatModel[]): Promise<string> => {
  const client = axios.create({
    headers: {
      Authorization: "Bearer " + process.env.GPT_ACCESS_TOKEN,
    },
  });
  return new Promise((resolve, reject) => {
    const params = {
      messages: [
        { role: ChatRole.System, content: INTRODUCTION_TEXT },
        ...messages,
        { role: ChatRole.System, content: NOTE_IMPORTANT },
      ],
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
  recipientId: string,
  pageId: string
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
        `https://graph.facebook.com/v16.0/${pageId}/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`,
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

const sendAction = (recipientId: string, pageId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const params = {
      recipient: {
        id: recipientId,
      },
      sender_action: Action.typingOn,
    };
    axios
      .post(
        `https://graph.facebook.com/v16.0/${pageId}/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`,
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

const Services = { callGPTAPI, sendMessageBackToFB, sendAction };

export default Services;
