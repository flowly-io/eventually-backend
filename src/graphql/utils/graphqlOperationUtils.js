/**
 * This function collects the fields at the specified level in a GraphQL operation object.
 * The field must be nested at a specific level in the query for a match.
 * @arg operation `OperationDefinitionNode` object to search in.
 * @arg level how deep to search into the query. Default is 0.
 */
const collectFields = (operation, level = 0) => {
  if (level < 0) throw new Error("Cannot search less than 0 selected fields.");
  let nodes = operation.selectionSet.selections;

  // Collect fields at the specified level.
  for (let i = 0; i < level; i++) {
    nodes = nodes.reduce(
      (list, current) =>
        current.selectionSet
          ? [...list, ...current.selectionSet.selections]
          : list,
      []
    );
  }

  return nodes.map(node => node.name.value);
};

/**
 * This function searches for a field at the specified level in a GraphQL operation object.
 * The field must be nested at a specific level in the query for a match.
 * @arg operation `OperationDefinitionNode` object to search in.
 * @arg fieldName the name of the field to search for.
 * @arg level how deep to search into the query. Default is 0.
 */
const hasSelectedField = (operation, fieldName, level = 0) => {
  const fields = new Set(collectFields(operation, level));
  return fields.has(fieldName);
};

export { collectFields, hasSelectedField };
