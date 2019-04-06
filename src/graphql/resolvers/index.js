import { ObjectId } from "mongodb";
import { UserInputError } from "apollo-server";

const resolvers = {
  Query: {
    // Get the current user's profile
    async me(parent, args, ctx) {
      return ctx.db
        .collection("users")
        .findOne({ _id: new ObjectId(ctx.userId) });
    },

    // Get a user
    async user(parent, args, ctx) {
      return ctx.db
        .collection("users")
        .findOne({ _id: new ObjectId(args.userId) });
    },
    // Get list of users
    async capabilities(parent, args, ctx) {
      return ctx.db
        .collection("capabilities")
        .find({})
        .toArray();
    },

    // Get list of users
    async users(parent, args, ctx) {
      return ctx.db
        .collection("users")
        .find({})
        .toArray();
    }
  },

  Mutation: {
    // Create a user
    async createUser(parent, args, ctx) {
      const _id = new ObjectId();
      await ctx.db.collection("users").insertOne({
        _id,
        ...args.user
      });
      return await ctx.db.collection("users").findOne({ _id });
    },

    // Delete a user
    async deleteUser(parent, args, ctx) {
      if (!args.userId) throw new UserInputError("User Id cannot be empty");
      const result = await ctx.db
        .collection("users")
        .removeOne({ _id: new ObjectId(args.userId) });
      return result.deletedCount;
    },

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

export { resolvers };
