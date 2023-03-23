import Services from "../services";

export class ChatGPTModel {
  constructor() {}

  async getMessage(message: string): Promise<string> {
    try {
      const answer = await Services.callGPTAPI(message);
      return answer;
    } catch (e) {
      console.log(e);
      return "SomeThing went wrong!!";
    }
  }
}
