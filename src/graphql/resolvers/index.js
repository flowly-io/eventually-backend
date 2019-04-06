import user from "./user";
import capability from "./capability";

const resolvers = {
  Query: {
    ...user.Query,
    ...capability.Query
  },
  Mutation: {
    ...user.Mutation,
    ...capability.Mutation
  }
};

export { resolvers };
