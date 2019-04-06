import user from "./user";
import capability from "./capability";
import event, { Event } from "./event";
import group, { Group } from "./group";

const resolvers = {
  Query: {
    ...user.Query,
    ...capability.Query,
    ...event.Query,
    ...group.Query
  },
  Mutation: {
    ...user.Mutation,
    ...capability.Mutation,
    ...event.Mutation,
    ...group.Mutation
  },
  Event,
  Group
};

export { resolvers };
