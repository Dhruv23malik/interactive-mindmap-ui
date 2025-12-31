export function parseMindmap(
  data,
  parentId = null,
  level = 0,
  index = 0,
  nodes = [],
  edges = []
) {
  const nodeId = data.id;

  nodes.push({
    id: nodeId,
    parentNode: parentId, // used for collapse logic
    data: {
      label: data.title,
      summary: data.summary,
      details: data.details
    },
    position: {
      x: level * 260,
      y: index * 140
    }
  });

  if (parentId) {
    edges.push({
      id: `${parentId}-${nodeId}`,
      source: parentId,
      target: nodeId
    });
  }

  data.children.forEach((child, i) => {
    parseMindmap(
      child,
      nodeId,
      level + 1,
      index + i + 1,
      nodes,
      edges
    );
  });

  return { nodes, edges };
}
