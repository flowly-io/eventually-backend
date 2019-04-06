import { ApolloServer } from "apollo-server";

import { typeDefs, resolvers } from "./graphql";
import getDB from "./services/database";

// LOADERS
import eventOrganisersLoader from "./loaders/eventOrganisers";

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

    return {
      db,
      userId,
      loaders: { eventOrganisersLoader: eventOrganisersLoader(db) }
    };
  },
  introspection: true
});

// Launch the server
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
