import Services from "../services";

export class BotChatModel {
  constructor() {}

  async getAnswerFromGPT(message: string): Promise<string> {
    try {
      const answer = await Services.callGPTAPI(message);
      return answer;
    } catch (e) {
      // console.log(e.response);
      return "SomeThing went wrong!!";
    }
  }

  async sendMessageBackToUser(message: string, recipientId: string) {
    try {
      await Services.sendMessageBackToFB(message, recipientId);
    } catch (e) {
      console.log(e);
    }
  }
}
