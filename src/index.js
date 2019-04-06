import { ApolloServer } from "apollo-server";
import { parse } from "graphql";
import moment from "moment";

import { typeDefs, resolvers } from "./graphql";
import getDB from "./services/database";
import { collectFields } from "./graphql/utils/graphqlOperationUtils";

// LOADERS
import usersLoader from "./loaders/users";

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
      loaders: { usersLoader: usersLoader(db) }
    };
  },
  introspection: true
});

// Launch the server
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`\n🚀  Server ready at ${url}`);
});
