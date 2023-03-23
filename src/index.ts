import express from "express";
import { ChatGPTModel } from "./model";
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const token =
  "EAAQ3Xgh37mYBAL0mHL7lAWvcrqjNO7iFwWA3QNeVN5VJrrai0S0SEhQ3JPeXMZAXgY0NkrFJWzuaBTnMjXsTyLVvpRCJlDZBvpGrTIEUz9AwaT3TPJz6MKCOLQ4jvk4X6ZACVEchgPGANoLvkA6AAW8qLZAy2f8uR2w2H1ZAiuGxpYxnwM3dq";

app.get("/webhook", async (req: any, res: any) => {
  const chatGPT = new ChatGPTModel();
  const answer = await chatGPT.getMessage(req.body.message);
  console.log(req.body);
  res.send(answer);
});

app.get("/", (req, res) => {
  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];
  console.log("mode: ", mode);
  console.log("token: ", token);
  console.log("challenge: ", challenge);

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

app.post("/", (req, res) => {
  const body = req.body;
  console.log(body);
  console.log(JSON.stringify(body));
  console.log(body.entry[0].messaging);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
