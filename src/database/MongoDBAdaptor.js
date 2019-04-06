import dotenv from "dotenv";
import { MongoClient } from "mongodb";

export class MongoDBAdaptor {
  constructor() {
    this.initialised = false;
  }

  async init() {
    if (this.initialised) return;

    dotenv.config();
    const env = process.env;

    // Construct connection URI
    const URI =
      `mongodb+srv://${env.MONGO_USER}:${env.MONGO_PASSWORD}@` +
      `${env.MONGO_CLUSTER.toLowerCase()}-${env.MONGO_SHARD}` +
      `.mongodb.net/${env.MONGO_DB}`;

    this.client = new MongoClient(URI, {
      useNewUrlParser: true
    });

    return new Promise((resolve, reject) => {
      // Connect using MongoDB client
      this.client.connect(error => {
        if (error) {
          console.error("Failed to connect to database.");
          console.error(error);
          reject(error);
        } else {
          this.initialised = true;
          this.database = this.client.db(this.dbName);
          console.error("Database service initialised.");
          resolve();
        }
      });
    });
  }
}
