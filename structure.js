class Board {
  static get ROW_WIDTHS() {
    return ROW_WIDTHS;
  }

  static get ADJACENT_TILES() {
    return ADJACENT_TILES;
  }

  static get VERTEX_CONNECTIONS() {
    return VERTEX_CONNECTIONS;
  }

  static get CONNECTED_EDGES() {
    return CONNECTED_EDGES;
  }

  static get EDGE_CONNECTIONS() {
    return EDGE_CONNECTIONS;
  }

  static get CONNECTED_VERTICES() {
    return CONNECTED_VERTICES;
  }

  constructor(terrains, values) {
    this.tiles = new Array(19);
    this.vertices = new Array(54);
    this.edges = new Array(72);

    this.initialize(terrains, values);
  }

  initialize(terrains, values) {
    this.generateTiles(terrains, values);
    this.generateVertices();
    this.generateEdges();
  }

  generateTiles(terrains, values) {
    for(let tileId = 0; tileId < this.tiles.length; ++tileId) {
      let tile = new Tile(tileId, terrains[tileId], values[tileId], Board.ADJACENT_TILES[tileId]);
      this.tiles[tileId] = tile;
    }
  }

  generateVertices() {
    for(let vertexId = 0; vertexId < this.vertices.length; ++vertexId) {
      let connectedTiles = Board.VERTEX_CONNECTIONS[vertexId];
      let connectedEdges = Board.CONNECTED_EDGES[vertexId];
      let vertex = new Vertex(vertexId, connectedTiles, connectedEdges);
      for(let i = 0; i < connectedTiles.length; ++i) {
        let connectedTile = connectedTiles[i];
        this.tiles[connectedTile[0]].vertices[connectedTile[1]] = vertex;
      }
      this.vertices[vertexId] = vertex;
    }
  }

  generateEdges() {
    for(let edgeId = 0; edgeId < this.edges.length; edgeId++) {
      let connectedTiles = Board.EDGE_CONNECTIONS[edgeId];
      let connectedVertices = Board.CONNECTED_VERTICES[edgeId];
      let edge = new Edge(edgeId, connectedTiles, connectedVertices);
      for(let i = 0; i < connectedTiles.length; i++) {
        let connectedTile = connectedTiles[i];
        this.tiles[connectedTile[0]].edges[connectedTile[1]] = edge;
      }
      this.edges[edgeId] = edge;
    }
  }
}

class Tile {
  constructor(id, terrain, value, adjacentTiles) {
    this.id = id;
    this.terrain = terrain;
    this.value = value;
    this.adjacentTiles = adjacentTiles;

    this.vertices = [];
    this.edges = [];
  }
}

class Vertex {
  constructor(id, connectedTiles, connectedEdges) {
    this.id = id
    this.connectedTiles = connectedTiles;
    this.connectedEdges = connectedEdges;

    this.value = Math.floor(Math.random() * 3);
  }
}

class Edge {
    constructor(id, connectedTiles, connectedVertices) {
      this.id = id
      this.connectedTiles = connectedTiles;
      this.connectedVertices = connectedVertices;

      this.value = Math.floor(Math.random() * 2);
    }
}
