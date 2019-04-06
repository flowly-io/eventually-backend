import { ApolloServer } from "apollo-server";
import { parse } from "graphql";
import moment from "moment";

import getDB from "./database";
import { createUsersLoader, createCapabilitiesLoader } from "./loaders";
import { typeDefs, resolvers } from "./graphql";
import { collectFields } from "./graphql/utils/graphqlOperationUtils";

import mockData from "./mocks/generateMockData";

/**
 * Set this to `true` if you want to load mock data to the
 * database when the server starts.
 *
 * WARNING: this will CLEAR ALL EXISTING DATA.
 *
 * By default this is not allowed in production.
 */
const USE_MOCK_DATA = true;

(async () => {
  // FIXME: This block of code adds mock data in non-production environments.
  // Remove this when no longer needed.
  if (USE_MOCK_DATA && process.env.NODE_ENV !== "production") {
    // Add mock data
    const db = await getDB();
    await mockData(db);
  }
})();

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
    // NOTE: for now, we are allowing requests to directly include userId
    // as the header token for quick and dirty development and testing.
    const userId = header;

    // FIXME: Remove this in production. Logging purposes only.
    const fields = collectFields(parse(req.body.query).definitions[0]);
    console.log(
      `${moment().format(
        "YYYY-MM-DD hh:mm:ssa"
      )} | Processing requests: ${fields.join(", ")}`
    );

    return {
      db,
      userId,
      loaders: {
        // Add all required loaders into context here
        usersLoader: createUsersLoader(db),
        capabilitiesLoader: createCapabilitiesLoader(db)
      }
    };
  },

  // FIXME: remove these in production as best practice
  cors: false,
  introspection: true,
  playground: true
});

// Launch the server
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`\ne✅eutually alpha ready at ${url}!`);
});
