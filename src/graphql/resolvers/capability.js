import { ObjectId } from "mongodb";
import { UserInputError, ForbiddenError } from "apollo-server";

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
      const { capability } = args;

      // Check that capability has a unique name
      const capabilityCheck = await ctx.db
        .collection("capabilities")
        .findOne({ name: capability.name });
      if (capabilityCheck)
        throw new ForbiddenError(
          `A capability with the name "${capability.name}" already exists.`
        );

      // Create capability object
      const _id = new ObjectId();
      await ctx.db.collection("capabilities").insertOne({
        _id,
        ...capability
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

export const CapabilityInstance = {
  parent: async (parent, args, ctx) => {
    return ctx.db
      .collection("capabilities")
      .findOne({ _id: new ObjectId(parent._id) });
  }
};
