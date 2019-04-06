import { ObjectId } from "mongodb";

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
  },

  capabilities: async (parent, args, ctx) => {
    const capabilities = await ctx.db
      .collection("capabilities")
      .find({ delegateGroupNames: parent.name });
    return capabilities.toArray();
  },

  capabilityInstances: async (parent, args, ctx) => {
    // Get capabilities in group
    const capabilities = await (await ctx.db
      .collection("capabilities")
      .find({ delegateGroupNames: parent.name })).toArray();
    const capabilityIds = capabilities.map(
      capability => new ObjectId(capability._id)
    );

    // Get events which have these capabilities
    const events = await (await ctx.db
      .collection("events")
      .find({ "capabilities._id": { $in: capabilityIds } })).toArray();

    // Flatten instances and add event to each instance
    return events.reduce(
      (instances, event) => [
        ...instances,
        ...event.capabilities
          .filter(
            // Filter out any capabilities that are
            // not of the same type
            c =>
              capabilityIds
                .map(id => id.toHexString())
                .indexOf(c._id.toHexString()) >= 0
          )
          .map(capability => ({
            event,
            type: "EventCapabilityInstance",
            ...capability
          }))
      ],
      []
    );
  }
};
