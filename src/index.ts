import express from "express";
import { BotChatModel } from "./model";
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const TOKEN =
  "EAAQ3Xgh37mYBAL0mHL7lAWvcrqjNO7iFwWA3QNeVN5VJrrai0S0SEhQ3JPeXMZAXgY0NkrFJWzuaBTnMjXsTyLVvpRCJlDZBvpGrTIEUz9AwaT3TPJz6MKCOLQ4jvk4X6ZACVEchgPGANoLvkA6AAW8qLZAy2f8uR2w2H1ZAiuGxpYxnwM3dq";

const botChat = new BotChatModel();

app.get("/gpt", async (req: any, res: any) => {
  const answer = await botChat.getAnswerFromGPT("test");
  res.send(answer);
});

app.get("/webhook", (req, res) => {
  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];
  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === TOKEN) {
      // Respond with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403);
  }
});

app.get("/webhook", (req, res) => {
  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];
  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === TOKEN) {
      // Respond with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403);
  }
});

app.post("/", async (req, res) => {
  try {
    const body = req.body;

    const senderId = body.entry?.[0]?.messaging?.[0]?.sender?.id || "";
    console.log("recipientId: ", senderId);
    console.log("body: ", JSON.stringify(body));
    if (senderId != process.env.PAGE_ID) {
      const message = body.entry?.[0].messaging?.[0].message?.text || "Nothing";
      console.log("message: ", message);
      console.log("recipientId: ", senderId);
      const answer = await botChat.getAnswerFromGPT(message);
      console.log("GPT answer: ", answer);
      if (answer !== "") {
        await botChat.sendMessageBackToUser(answer, senderId);
      }
      console.log("SendFaceBook Success");
      res.sendStatus(200);
    } else {
      res.sendStatus(200);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(502);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
