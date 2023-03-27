import { MongoClient, ServerApiVersion } from "mongodb";

export class MongoClientModel {
  uri = `mongodb+srv://phuvinhhung1999:${process.env.DB_PASSWORD}@cluster0.xxuaju0.mongodb.net/?retryWrites=true&w=majority`;

  client: MongoClient = new MongoClient(this.uri, {
    serverApi: ServerApiVersion.v1,
  });

  constructor() {}

  async connectDB() {
    this.client.connect();
  }

  async closeDB() {
    this.client.close();
  }
}
