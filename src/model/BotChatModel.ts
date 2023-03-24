import Services from "../services";

export class BotChatModel {
  constructor() {}

  async getAnswerFromGPT(message: string): Promise<string> {
    return Services.callGPTAPI(message);
  }

  async sendMessageBackToUser(message: string, recipientId: string) {
    return Services.sendMessageBackToFB(message, recipientId);
  }
}
