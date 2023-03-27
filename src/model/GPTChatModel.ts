import { ChatRole } from "../constants";

export class GPTChatModel {
  constructor(public role: ChatRole, public content: string) {}
}
