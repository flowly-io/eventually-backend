import { ObjectId } from "mongodb";
import { UserInputError } from "apollo-server";

export default {
  Query: {
    // Get list of capabilities
    async capabilities(parent, args, ctx) {
      return ctx.db
        .collection("capabilities")
        .find({})
        .toArray();
    }
  },

  Mutation: {
    async createCapability(parent, args, ctx) {
      const _id = new ObjectId();
      await ctx.db.collection("capabilities").insertOne({
        _id,
        ...args.capability
      });
      return await ctx.db.collection("capabilities").findOne({ _id });
    },

    async deleteCapability(parent, args, ctx) {
      if (!args.capabilityId)
        throw new UserInputError("Capability Id cannot be empty");
      const result = await ctx.db
        .collection("capabilities")
        .removeOne({ _id: new ObjectId(args.capabilityId) });
      return result.deletedCount;
    }
  }
};
