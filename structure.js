/*
Catan Board Data Structure:
  Overview:
    --> The Catan board consists of 19 tiles arranged in the shape of a hexagon.

    Diagram:
      Note: The "^" symbols represent tiles.
        ^ ^ ^
       ^ ^ ^ ^
      ^ ^ ^ ^ ^
       ^ ^ ^ ^
        ^ ^ ^
  Tiles:
    --> The tiles are normal hexagons and have pointy orientation.
    --> Each tile has 6 vertices and 6 edges.

    Diagram:
      Note: The "V" symbols represent vertices.
           V
      V         V

      V         V
           V
*/



class Board {

  constructor(terrains, values) {
    this.terrains = terrains;
    this.values = values;

    /*
    Overview:
      this.tiles stores the Tile objects associated with this Board object.
      this.tiles[tileId] returns the Tile object associated with the requesting tileId.
    Diagram:
      Note: This diagram shows what position on the board each tileId correpsonds to.
        0 1 2
       3 4 5 6
      7 8 9 . .
       . . . .
        . . .
    */
    this.tiles = [];
    this.edges = [];
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

  assignVertex(vertex, tileId, tileVertex) {
    this.tiles[tileId].vertices[tileVertex] = vertex;
  }

  buildFirstVertex(multiplier, tile, tileVertex) {
    var vertex = new Vertex();
    var connectedTiles = [];
    this.assignVertex(vertex, tile.id, tileVertex);
    connectedTiles.push(tile.id);
    if(tile.adjacentTiles.includes(tile.id - multiplier)) {
      connectedTiles.push(tile.id - multiplier);
      this.assignVertex(vertex, tile.id - multiplier, multiplier === 1 ? "v1" : "v4");
    }
    if(tile.adjacentTiles.includes(tile.id - multiplier * (5 - tile.rowsFromCenter))) {
      connectedTiles.push(tile.id - multiplier * (5 - tile.rowsFromCenter));
      this.assignVertex(vertex, tile.id - multiplier * (5 - tile.rowsFromCenter), multiplier === 1 ? "v3" : "v0");
    }
    vertex.connectedTiles = connectedTiles;
  }

  buildSecondVertex(multiplier, tile, tileVertex) {
    var vertex = new Vertex();
    var connectedTiles = [];
    connectedTiles.push(tile.id);
    this.assignVertex(vertex, tile.id, tileVertex);
    if(tile.adjacentTiles.includes(tile.id - multiplier * (5 - tile.rowsFromCenter))) {
      connectedTiles.push(tile.id - multiplier * (5 - tile.rowsFromCenter));
      this.assignVertex(vertex, tile.id - multiplier * (5 - tile.rowsFromCenter), multiplier === 1 ? "v2" : "v5");
    }
    if(tile.adjacentTiles.includes(tile.id - multiplier * (5 - tile.rowsFromCenter) + multiplier)) {
      connectedTiles.push(tile.id - multiplier * (5 - tile.rowsFromCenter) + multiplier);
      this.assignVertex(vertex, tile.id - multiplier * (5 - tile.rowsFromCenter) + multiplier, multiplier === 1 ? "v4" : "v1");
    }
    vertex.connectedTiles = connectedTiles;
  }

  buildThirdVertex(tile, tileVertex) {
    var vertex = new Vertex();
    var connectedTiles = [];
    connectedTiles.push(tile)
    this.assignVertex(vertex, tile.id, tileVertex);
    vertex.connectedTiles = connectedTiles;
  }

  generateVertices() {
    for(let multiplier = 1; multiplier > -2; multiplier -= 2) {
      let start = 0;
      let end = 12;
      if(multiplier === -1) {
        start = this.tiles.length - 1;
        end = 6;
      }
      for(let tileId = start; tileId !== end; tileId += multiplier) {
        let tile = this.tiles[tileId];
        let verticesToAlter = ["v5", "v0"];
        if(multiplier === -1) {
          verticesToAlter = ["v2", "v3"];
        }
        if(multiplier === 1 && (tileId === 2 || tileId === 6 || tileId === 11)) {
          verticesToAlter.push("v1");
        } else if(multiplier === -1 && (tileId === 16 || tileId === 12 || tileId === 7)) {
          verticesToAlter.push("v4");
        }

        this.buildFirstVertex(multiplier, tile, verticesToAlter[0]);
        this.buildSecondVertex(multiplier, tile, verticesToAlter[1]);

        if(verticesToAlter.length === 3) {
          this.buildThirdVertex(tile, verticesToAlter[2]);
        }
      }
    }
  }

  generateEdges() {

    for(let multiplier = 1; multiplier > -2; multiplier -= 2) {
      let count = multiplier === 1 ? 0 : 71;
      let start = 0;
      let end = 12;
      if(multiplier === -1) {
        start = this.tiles.length - 1;
        end = 6;
      }
      for(let tileId = start; tileId !== end; tileId += multiplier) {
        if(tileId === 3 || tileId === 15) {
          count += multiplier * 4;
        } else if(tileId === 7 || tileId === 11) {
          count += multiplier * 5;
        }

        let tile = this.tiles[tileId];
        let vertexToAlter = "v0";
        if(multiplier === -1) {
          vertexToAlter = "v3";
        }


        let vertex = tile.vertices[vertexToAlter];
        let nec = vertexToAlter === "v0" ? ["v5", "v1"] : ["v2", "v4"];

        for(let i = 0; i < nec.length; i++) {
          let edge = new Edge(count, [vertex, tile.vertices[nec[i]]]);
          vertex.connectedEdges.push(edge);
          tile.vertices[nec[i]].connectedEdges.push(edge);
          this.edges[count] = edge;
          count += multiplier;
        }
      }
    }

    let count = 6;
    for(let tileId = 0; tileId < this.tiles.length; tileId++) {
      let tile = this.tiles[tileId];
      if(tileId === 3) {
        count += 9;
      } else if(tileId === 7) {
        count += 11;
      } else if(tileId === 12) {
        count += 11;
      } else if(tileId === 16) {
        count += 9;
      }

      let edge = new Edge(count, [tile.vertices["v5"], tile.vertices["v4"]]);
      tile.vertices["v5"].connectedEdges.push(edge);
      tile.vertices["v4"].connectedEdges.push(edge);
      this.edges[count] = edge;
      count++;

      if(tileId === 2 || tileId === 6 || tileId === 11 || tileId === 15 || tileId === 18) {
        let edge = new Edge(count, [tile.vertices["v1"], tile.vertices["v2"]]);
        tile.vertices["v1"].connectedEdges.push(edge);
        tile.vertices["v2"].connectedEdges.push(edge);
        this.edges[count] = edge;
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
    this.vertices = {"v0": null, "v1": null, "v2": null, "v3": null, "v4": null, "v5": null};
  }
}

class Vertex {
  constructor() {
    this.connectedTiles = [];
    this.connectedEdges = [];

    this.value = Math.floor(Math.random() * 3);
  }
}

class Edge {
    constructor(id, connectedVertices) {
      this.id = id
      this.connectedVertices = connectedVertices;

      this.value = Math.floor(Math.random() * 2);
    }
}

var board = new Board([], []);
console.log(Board.ROW_WIDTHS);
console.log(Board.ADJACENT_TILES_LIST);
board.initialize();
board.generateVertices();
board.generateEdges();
console.log(board);
