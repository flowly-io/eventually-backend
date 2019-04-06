import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./graphql";

// Set up Apollo server
const server = new ApolloServer({ typeDefs, resolvers });

// Launch the server
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
