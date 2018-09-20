/*
Catan Board Data Structure Overview:
  class Board:
    --> this.tiles:
      Description: Stores an array of 19 Tile objects.
      Return Value: this.tiles[tileId] returns the Tile object associated with
      Diagram:
        Note: This diagram shows what position on the board each tileId correpsonds to.
          0 1 2
         3 4 5 6
        7 8 9 . .
         . . . .
          . . .
      Return Value: this.tiles[tileId] returns the Tile object associated with the requesting tileId.

    --> The board consists of 19 tiles arranged in the shape of a hexagon.
    --> There are 54 vertices and 72 edges.

    Diagram 1:
      Note: The "^" symbols represent tiles.
        ^ ^ ^
       ^ ^ ^ ^
      ^ ^ ^ ^ ^
       ^ ^ ^ ^
        ^ ^ ^

  Tiles:
    --> Tiles are represented by the Tile class.
    --> The tiles are normal hexagons and have pointy orientation.
    --> Each tile has a unique ID.
    --> Each tile has 6 vertices and 6 edges.
    --> Each tile has a terrain and value associated with it.
    --> Each

    Diagram:
      Note: The "V" symbols represent vertices.
           V
      V         V

      V         V
           V

  Vertices:
    --> Vertices are represented by the Vertex class.
    --> Each vertex has either 2 or 3 connecting edges.

  Edges:
    --> Edges are represented by the Edge class.
    --> Each edge has 2 connecting vertices.
*/

class Board {
  constructor() {
    /*
    this.tiles:
      --> this.tiles contains instances of the Tile class
    Diagram:
      Note: This diagram shows what position on the board each tileId correpsonds to.
        0 1 2
       3 4 5 6
      7 8 9 . .
       . . . .
        . . .
    */
    this.tiles = new Array(19); // Stores Tile objects
    this.vertices = new Array(54);
    this.edges = new Array(72);
  }

  static get ROW_WIDTHS() {
    /*
    Explanation:
      ROW_WIDTHS[row] returns the width (the number of tiles in the row) of the requesting row.
    Diagram:
      Note: The "^" symbols represent tiles.
      Row 0:    ^ ^ ^    (Width = 3)
      Row 1:   ^ ^ ^ ^   (Width = 4)
      Row 2:  ^ ^ ^ ^ ^  (Width = 5)
      Row 3:   ^ ^ ^ ^   (Width = 4)
      Row 4:    ^ ^ ^    (Width = 3)
    */
    return ROW_WIDTHS;
  }

  static get ADJACENT_TILES_LIST() {
    /*
    Explanation:
      ADJACENT_TILES_LIST[tileId] returns a list of the IDs of the tiles that are adjacent (horizontally, vertically, and diagonally) to the requesting tile.
    Diagram:
      Note: The numbers represent the IDs of the tiles.
        0 1 2
       3 4 5 6
      7 8 9 . .
       . . . .
        . . .
    */
    return ADJACENT_TILES_LIST;
  }

  initialize() {
    var tileId = 0;
    for(let row = 0; row < Board.ROW_WIDTHS.length; row++) {
      for(let column = 0; column < Board.ROW_WIDTHS[row]; column++) {
        let tile = new Tile(tileId, row, "Forest", 8, Board.ADJACENT_TILES_LIST[tileId]);
        this.tiles.push(tile);
        tileId++;
      }
    }
  }


  genVertices() {
    for(let vertexId = 0; vertexId < vertexData.length; vertexId++) {
      let data = vertexData[vertexId];
      let data2 = vertexData2[vertexId];
      let vertex = new Vertex(vertexId, data, data2);
      this.vertices[vertexId] = vertex;
      for(let i = 0; i < data.length; i++) {
        let connectedTile = data[i];
        this.tiles[connectedTile[0]].vertices[connectedTile[1]] = vertex;
      }
    }
  }

  genEdges() {
    for(let edgeId = 0; edgeId < edgeData.length; edgeId++) {
      let data = edgeData[edgeId];
      let data2 = edgeData2[edgeId];
      let edge = new Edge(edgeId, data, data2);
      this.edges[edgeId] = edge;
      for(let i = 0; i < data.length; i++) {
        let connectedTile = data[i];
        this.tiles[connectedTile[0]].edges[connectedTile[1]] = edge;
      }
    }
  }
}

class Tile {
  constructor(id, row, terrain, value, adjacentTiles) {
    this.id = id;
    this.row = row;
    this.terrain = terrain;
    this.value = value;
    this.adjacentTiles = adjacentTiles;

    /*
    Explanation:
      this.rowsFromCenter stores the number of rows from the center row the requesting tile is.
    Diagram:
      Note: The numbers represent how many rows from the center row each tile is.
        2 2 2
       1 1 1 1
      0 0 0 0 0
       1 1 1 1
        2 2 2
    */
    this.rowsFromCenter = Math.abs(2 - this.row);
    /*
    Explanation:
      this.vertices["propertyName"] returns the Vertex object associated with the property.
    Diagram:
      Note: The property names represent the name of each vertex of a tile.
           v0
      v5        v1

      v4        v2
           v3
    */
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

var board = new Board([], []);
console.log(Board.ROW_WIDTHS);
console.log(Board.ADJACENT_TILES_LIST);
board.initialize();
board.genVertices();
board.genEdges();
console.log(board);
