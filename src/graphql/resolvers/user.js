import { ObjectId } from "mongodb";
import { UserInputError } from "apollo-server";

export default {
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
    async users(parent, args, ctx) {
      return ctx.db
        .collection("users")
        .find({})
        .toArray();
    },

    async usersInGroup(parent, args, ctx) {
      return ctx.db
        .collection("users")
        .find({ groups: args.groupName })
        .toArray();
    }
  },

  Mutation: {
    // Create a user
    async createUser(parent, args, ctx) {
      const _id = new ObjectId();
      await ctx.db.collection("users").insertOne({
        _id,
        ...args.user,
        userType: null,
        groups: []
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

    async setUserGroups(parent, args, ctx) {
      if (!args.userId) throw new UserInputError("User Id cannot be empty");
      if (!Array.isArray(args.groups))
        throw new UserInputError("Groups must be an array of strings");

      // Check that user exists
      const userCheck = await ctx.db
        .collection("users")
        .findOne({ _id: new ObjectId(args.userId) });
      if (!userCheck)
        throw new UserInputError(
          `The user "${args.userId}" could not be found.`
        );

      await ctx.db
        .collection("users")
        .updateOne(
          { _id: new ObjectId(args.userId) },
          { $set: { groups: args.groups } }
        );

      return ctx.db
        .collection("users")
        .findOne({ _id: new ObjectId(args.userId) });
    }
  }
};
