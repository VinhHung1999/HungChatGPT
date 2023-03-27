import {
  Collection,
  Db,
  Document,
  InsertOneResult,
  ObjectId,
  UpdateResult,
} from "mongodb";
import { MongoClientModel } from "./MongoClientModel";
import { UserModel } from "./UserModel";
import { isNil } from "lodash";
import { GPTChatModel } from "./GPTChatModel";
import { ChatRole } from "../constants";

export class UserCollectionModel extends MongoClientModel {
  collection: Collection = this.client.db("gpt-chatbot").collection("users");
  constructor() {
    super();
  }
  async insertUser(user: UserModel): Promise<InsertOneResult<Document>> {
    await this.client.connect();
    const result = await this.collection.insertOne(user);
    await this.client.close();
    return result;
  }

  async findUserById(id: string): Promise<UserModel | null> {
    await this.client.connect();
    const result = await this.collection.findOne({ id });
    if (isNil(result)) {
      return null;
    }
    return UserModel.initiate(result);
  }

  async updateUserByUserInfo(
    user: UserModel,
    newMessage: { user: string; bot: string }
  ): Promise<UpdateResult> {
    await this.client.connect();
    const currentTime = new Date().getTime();
    let newPreMessage = [...user.preMessage, newMessage];
    if (currentTime - user.requestTime > 5 * 3600000) {
      newPreMessage = [];
    }
    const result = await this.collection.updateOne(
      { id: user.id },
      {
        $set: {
          preMessage: newPreMessage,
          requestTime: new Date().getTime(),
        },
      }
    );
    await this.client.close();
    return result;
  }

  async updateUserPreMessageById(
    id: string,
    newMessage: { user: string; bot: string }
  ) {
    await this.client.connect();
    const result = await this.findUserById(id);
    if (isNil(result)) {
      this.insertUser(new UserModel(id, [newMessage], new Date().getTime()));
    } else {
      this.updateUserByUserInfo(result, newMessage);
    }
  }

  async getPreMessageInfoBy(id: string): Promise<GPTChatModel[]> {
    const messages: GPTChatModel[] = [];
    const user = await this.findUserById(id);
    if (isNil(user) || user.preMessage.length === 0) return [];
    user?.preMessage.forEach((message) => {
      messages.push({
        role: ChatRole.User,
        content: message.user,
      });
      messages.push({
        role: ChatRole.Assistant,
        content: message.bot,
      });
    });
    return messages;
  }
}
