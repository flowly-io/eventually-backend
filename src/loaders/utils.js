import { ObjectId } from "mongodb";
import DataLoader from "dataloader";

export const loadById = collectionName => db =>
  new DataLoader(async keys => {
    // Transform objectIds to a set of unique id (as strings)
    const uniqueKeys = new Set(keys.map(key => key.toHexString()));

    // Batch get objects with matching ids
    const results = await db
      .collection(collectionName)
      .find({ _id: { $in: Array.from(uniqueKeys).map(k => new ObjectId(k)) } });
    const data = await results.toArray();

    // Create map of objects with their Ids as keys
    const dict = data.reduce(
      (acc, currentVal) => ({
        ...acc,
        [currentVal._id]: currentVal
      }),
      {}
    );

    // Map keys back to objects
    return keys.map(key => dict[key]);
  });
