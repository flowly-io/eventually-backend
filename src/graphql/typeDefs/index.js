import path from "path";
import { gql } from "apollo-server";

import findFilesInDirectory from "../utils/findFilesInDirectory";
import { constructSchemaFromFiles } from "../utils/loadGrahpQLSchema";

/**
 * Generate the Type definitions for the server by
 * stitching a schema together from .graphql files.
 */
const generateTypeDefs = () => {
  // Load .graphql files from the `schemas` directory
  const gqlFiles = findFilesInDirectory(
    path.join(__dirname, "schemas"),
    /\.graphql/
  );

  // Stitch each .graphql file together into a single schema string
  const schema = constructSchemaFromFiles(gqlFiles);

  return gql(schema);
};

// Generate type defs
const typeDefs = generateTypeDefs();

export { typeDefs };
