function close_vertices(stateOfVertices, baseVertexId) {
  var connectedEdges = board.vertices[baseVertexId].connectedEdges;
  for(let i = 0; i < connectedEdges.length; ++i) {
    let edge = board.edges[connectedEdges[i]];
    stateOfVertices[edge.connectedVertices[0]] = 0;
    stateOfVertices[edge.connectedVertices[1]] = 0;
  }
}
