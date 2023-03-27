import { ChatRole } from "../constants";
import Services from "../services";
import ServicesUtils from "../utils/ServiceUtils";
import { GPTChatModel } from "./GPTChatModel";
import { UserCollectionModel } from "./UserCollectionModel";

export class BotChatModel {
  constructor() {}
  async answer(
    senderId: string,
    pageId: string,
    message: string
  ): Promise<void> {
    const userCollection = new UserCollectionModel();
    const preConversation = await userCollection.getPreMessageInfoBy(senderId);
    preConversation.push(new GPTChatModel(ChatRole.User, message));
    const answer = await Services.callGPTAPI(preConversation);
    console.log("answer: ", answer);
    if (answer === "") return;
    await this.sendMessage(answer, senderId, pageId);
    await userCollection.updateUserPreMessageById(senderId, {
      user: message,
      bot: answer,
    });
  }

  async sendMessage(message: string, senderId: string, pageId: string) {
    if (message.includes("\n")) {
      await Services.sendAction(senderId, pageId);
      await ServicesUtils.delay(3000);
      await Services.sendMessageBackToFB(message, senderId, pageId);
    } else {
      for (const sentence of message.split(".")) {
        if (sentence === "") continue;
        await Services.sendAction(senderId, pageId);
        await ServicesUtils.delay(3000);
        await Services.sendMessageBackToFB(sentence, senderId, pageId);
      }
    }
    console.log("Send Messages Successfully!!");
  }
}
