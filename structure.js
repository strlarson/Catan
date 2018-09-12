class Board {
  constructor(terrains, values) {
    this.terrains = terrains;
    this.values = values;

    this.tiles = [];
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

        let connectedTiles = [tile.id];

        var v = new Vertex([]);
        tile.vertices[verticesToAlter[0]] = v;
        if(tile.adjacentTiles.includes(tile.id - multiplier)) {
          connectedTiles.push(tile.id - multiplier);
          let nec = multiplier === 1 ? "v1" : "v4";
          this.tiles[tile.id - multiplier].vertices[nec] = v;
        }
        if(tile.adjacentTiles.includes(tile.id - multiplier * (5 - tile.rowsFromCenter))) {
          connectedTiles.push(tile.id - multiplier * (5 - tile.rowsFromCenter));
          let nec = multiplier === 1 ? "v3" : "v0";
          this.tiles[tile.id - multiplier * (5 - tile.rowsFromCenter)].vertices[nec] = v;
        }
        v.connectedTiles = connectedTiles;

        connectedTiles = [tile.id];

        v = new Vertex([]);
        tile.vertices[verticesToAlter[1]] = v;
        if(tile.adjacentTiles.includes(tile.id - multiplier * (5 - tile.rowsFromCenter))) {
          connectedTiles.push(tile.id - multiplier * (5 - tile.rowsFromCenter));
          let nec = multiplier === 1 ? "v2" : "v5";
          this.tiles[tile.id - multiplier * (5 - tile.rowsFromCenter)].vertices[nec] = v;
        }
        if(tile.adjacentTiles.includes(tile.id - multiplier * (5 - tile.rowsFromCenter) + multiplier)) {
          connectedTiles.push(tile.id - multiplier * (5 - tile.rowsFromCenter) + multiplier);
          let nec = multiplier === 1 ? "v4" : "v1";
          this.tiles[tile.id - multiplier * (5 - tile.rowsFromCenter) + multiplier].vertices[nec] = v;
        }
        v.connectedTiles = connectedTiles;

        v = new Vertex([tile.id]);
        if(verticesToAlter.length === 3) {
          tile.vertices[verticesToAlter[2]] = v;
        }
      }
    }
  }

  generateEdges() {
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

        let vertex = tile.vertices[verticesToAlter[0]];
        let nec = verticesToAlter[0] === "v5" ? ["v4", "v0"] : ["v1", "v3"];
        for(let i = 0; i < nec.length; i++) {
          let edge = new Edge([vertex, tile.vertices[nec[i]]]);
          vertex.connectedEdges.push(edge);
          tile.vertices[nec[i]].connectedEdges.push(edge);
        }

        vertex = tile.vertices[verticesToAlter[1]];
        nec = verticesToAlter[1] === "v0" ? "v1" : "v4";
        let edge = new Edge([vertex, tile.vertices[nec]]);
        vertex.connectedEdges.push(edge);
        tile.vertices[nec].connectedEdges.push(edge);

        if(verticesToAlter.length === 3) {
          let vertex = tile.vertices[verticesToAlter[2]];
          let nec = verticesToAlter[2] === "v1" ? "v2" : "v5";
          let edge = new Edge([vertex, tile.vertices[nec]]);
          vertex.connectedEdges.push(edge);
          tile.vertices[nec].connectedEdges.push(edge);
        }
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
  constructor(connectedTiles) {
    this.connectedTiles = connectedTiles;
    this.connectedEdges = [];

    this.value = Math.floor(Math.random() * 3);
  }
}

class Edge {
    constructor(connectedVertices) {
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
