import express from "express";
import { BotChatModel } from "./model";
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const botChat = new BotChatModel();

app.get("/gpt", async (req: any, res: any) => {
  const answer = await botChat.getAnswerFromGPT("test");
  res.send(answer);
});

app.get("/", (req, res) => {
  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];
  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === token) {
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
  const body = req.body;
  const entry = body.entry[0];

  console.log("body", JSON.stringify(body));
  // console.log(JSON.stringify(body));
  const recipientId = body.entry?.[0]?.messaging?.[0]?.sender?.id || "";
  if (recipientId !== "121800517519786") {
    const message = body.entry?.[0].messaging?.[0].message?.text || "Nothing";
    console.log("message: ", message);
    console.log("recipientId: ", recipientId);
    const answer = await botChat.getAnswerFromGPT(message);
    console.log("GPT answer: ", answer);
    // botChat.sendMessageBackToUser(answer, recipientId);
    console.log("SendFaceBook Success");
    res.sendStatus(200);
  } else {
    res.sendStatus(200);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
