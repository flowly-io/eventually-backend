import { ApolloServer } from "apollo-server";

import { typeDefs, resolvers } from "./graphql";
import getDB from "./services/database";

// Set up Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // Connect to the database
    const db = await getDB();

    // Parse authentication
    const header = req.headers.authorization;

    // TODO: decode header
    // TODO: add user info to context
    const userId = header;

    return { db, userId };
  }
});

// Launch the server
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
