import express from "express";
import { ChatGPTModel } from "./model";
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get("/webhook", async (req: any, res: any) => {
  const chatGPT = new ChatGPTModel();
  const answer = await chatGPT.getMessage(req.body.message);
  console.log(req.body);
  res.send(answer);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
