import { MongoDBAdaptor } from "./MongoDBAdaptor";

const mongoAdaptor = new MongoDBAdaptor();

export default async () => {
  await mongoAdaptor.init();
  return mongoAdaptor.database;
};
