import Services from "../services";

export class ChatGPTModel {
  constructor() {}

  getMessage(message: string): Promise<string> {
    return Services.callGPTAPI(message);
  }
}
