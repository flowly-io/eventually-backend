import user from "./user";
import capability from "./capability";
import event from "./event";

const resolvers = {
  Query: {
    ...user.Query,
    ...capability.Query,
    ...event.Query
  },
  Mutation: {
    ...user.Mutation,
    ...capability.Mutation,
    ...event.Mutation
  }
};

export { resolvers };
