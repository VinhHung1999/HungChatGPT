import { ObjectId } from "mongodb";
import LodashUtils from "../utils/LodashUtils";

export class UserModel {
  constructor(
    public id: string,
    public preMessage: { user: string; bot: string }[],
    public requestTime: number
  ) {}

  static initiate(json: unknown): UserModel {
    const id = LodashUtils.safeGetString(json, "id", "");
    const preMessage = LodashUtils.safeGetArray(json, "preMessage", []);
    const requestTime = LodashUtils.safeGetNumber(json, "requestTime", 0);

    return new UserModel(id, preMessage, requestTime);
  }
}
