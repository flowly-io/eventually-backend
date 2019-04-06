export default {
  Query: {
    async groups(parent, args, ctx) {
      const groupNames = await ctx.db.collection("users").distinct("groups");
      const results = groupNames.map(groupName => ({ name: groupName }));
      return results;
    },
    async group(parent, args, ctx) {
      return { name: args.groupName };
    }
  },
  Mutation: {}
};

export const Group = {
  users: async (parent, args, ctx) => {
    const users = await ctx.db
      .collection("users")
      .find({ groups: parent.name })
      .toArray();
    return ctx.loaders.usersLoader.loadMany(users.map(user => user._id));
  }
};
