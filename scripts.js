class Tile {
  constructor(i, row, adjacentTiles, terrain, value, rowsFromCenter) {
    this.id = i;
    this.adjacentTiles = adjacentTiles;
    this.terrain = terrain;
    this.value = value;
    this.row = row;
    this.rowFromCenter = Math.abs(3 - this.row);
    this.vertices = {"v0": null, "v1": null, "v2": null, "v3": null, "v4": null, "v5": null};
  }


  static generateVertices() {
    var tileC = 0;
    while(tileC < 12) {
      var adj = [];
      var tile = tiles[tileC];
      adj.push(tile.id);
      if(tile.adjacentTiles.includes(tile.id - 1)) {
        adj.push(tile.id - 1);
      }
      if(tile.adjacentTiles.includes(tile.id - (5 - tile.rowFromCenter))) {
        adj.push(tile.id - (5 - tile.rowFromCenter));
      }
      var v = new Vertex(adj);

      tile.vertices.v5 = v;
      if(adj.includes(tile.id - 1)) {
        let tile2 = tiles[tile.id - 1];
        tile2.vertices.v1 = v;
      }
      if(adj.includes(tile.id - (5 - tile.rowFromCenter))) {
        let tile2 = tiles[tile.id - (5 - tile.rowFromCenter)];
        tile2.vertices.v3 = v;
      }

      vertices.push(v);

      adj = [];
      adj.push(tile.id);
      if(tile.adjacentTiles.includes(tile.id - (5 - tile.rowFromCenter))) {
        adj.push(tile.id - (5 - tile.rowFromCenter));
      }
      if(tile.adjacentTiles.includes(tile.id - (5 - tile.rowFromCenter) + 1)) {
        adj.push(tile.id - (5 - tile.rowFromCenter) + 1);
      }
      var x = new Vertex(adj);

      tile.vertices.v0 = x;
      if(adj.includes(tile.id - (5 - tile.rowFromCenter))) {
        let tile2 = tiles[tile.id - (5 - tile.rowFromCenter)];
        tile2.vertices.v2 = x;
      }
      if(adj.includes(tile.id - (5 - tile.rowFromCenter) + 1)) {
        let tile2 = tiles[tile.id - (5 - tile.rowFromCenter) + 1];
        tile2.vertices.v4 = x;
      }


      vertices.push(x);
      if(tileC === 2 || tileC === 6 || tileC === 11) {
        var y = new Vertex([tile.id]);
        vertices.push(y);
        tile.vertices.v1 = y;
      }
      tileC++;
    }
    var tileC = tiles.length - 1;
    while(tileC > 6) {
      var adj = [];
      var tile = tiles[tileC];
      adj.push(tile.id);
      if(tile.adjacentTiles.includes(tile.id + 1)) {
        adj.push(tile.id + 1);
      }
      if(tile.adjacentTiles.includes(tile.id + (5 - tile.rowFromCenter))) {
        adj.push(tile.id + (5 - tile.rowFromCenter));
      }
      var v = new Vertex(adj);

      tile.vertices.v2 = v;
      if(adj.includes(tile.id + 1)) {
        let tile2 = tiles[tile.id + 1];
        tile2.vertices.v4 = v;
      }
      if(adj.includes(tile.id + (5 - tile.rowFromCenter))) {
        let tile2 = tiles[tile.id + (5 - tile.rowFromCenter)];
        tile2.vertices.v0 = v;
      }

      vertices.push(v);

      adj = [];
      adj.push(tile.id);
      if(tile.adjacentTiles.includes(tile.id + (5 - tile.rowFromCenter))) {
        adj.push(tile.id + (5 - tile.rowFromCenter));
      }
      if(tile.adjacentTiles.includes(tile.id + (5 - tile.rowFromCenter) - 1)) {
        adj.push(tile.id + (5 - tile.rowFromCenter) - 1);
      }
      var x = new Vertex(adj);

      tile.vertices.v3 = x;
      if(adj.includes(tile.id + (5 - tile.rowFromCenter))) {
        let tile2 = tiles[tile.id + (5 - tile.rowFromCenter)];
        tile2.vertices.v5 = x;
      }
      if(adj.includes(tile.id + (5 - tile.rowFromCenter) - 1)) {
        let tile2 = tiles[tile.id + (5 - tile.rowFromCenter) - 1];
        tile2.vertices.v1 = x;
      }

      vertices.push(x);
      if(tileC === 16 || tileC === 12 || tileC === 7) {
        var y = new Vertex([tile.id]);
        vertices.push(y);
        tile.vertices.v4 = y;
      }
      tileC--;
    }
  }



}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var adjacentList = [[1, 3, 4], [0, 2, 4, 5], [1, 5, 6],
                    [0, 4, 7, 8], [0, 1, 3, 5, 8, 9], [1, 2, 4, 6, 9, 10], [2, 5, 10, 11],
                    [3, 8, 12], [3, 4, 7, 9, 12, 13], [4, 5, 8, 10, 13, 14], [5, 6, 9, 11, 14, 15], [6, 10, 15],
                    [7, 8, 13, 16], [8, 9, 12, 14, 16, 17], [9, 10, 13, 15, 17, 18], [10, 11, 14, 18],
                    [12, 13, 17], [13, 14, 16, 18], [14, 15, 17]];

class Vertex {
  constructor(tiles) {
    this.tiles = tiles;
    this.value = getRandomInt(3);
  }
}


// ---------------------------------------------------------------------------------
function getHexagonVertices(position, radius) {
  var vertices = [];
  for(let i = 0; i < 6; i++) {
    let angle = ((Math.PI / 3) * i) + (Math.PI / 6);
    vertices.push({x: position.x + radius * Math.cos(angle), y: position.y + radius * Math.sin(angle)});
  }
  return vertices;
};

function drawHexagon(position, radius, terrain, value) {
  var vertices = getHexagonVertices(position, radius);
  gameRenderer.beginPath();
  gameRenderer.fillStyle = tColors[terrain];
  gameRenderer.moveTo(vertices[0].x, vertices[0].y);
  for(let index = 1; index < vertices.length; index++) {
    gameRenderer.lineTo(vertices[index].x, vertices[index].y);
  }
  gameRenderer.lineTo(vertices[0].x, vertices[0].y);
  gameRenderer.fill();
  gameRenderer.closePath();

  gameRenderer.beginPath();
  gameRenderer.fillStyle = "black";
  gameRenderer.textAlign = "center";
  gameRenderer.textBaseline = "middle";
  gameRenderer.font = "20px Arial";
  gameRenderer.fillText(String(value), vertices[0].x - ((vertices[0].x - vertices[2].x) / 2), vertices[4].y - ((vertices[4].y - vertices[1].y) / 2));
  gameRenderer.closePath();
}
//---------------------------------------------------------------------------------

var gameCanvas = document.getElementById("game-canvas");
var gameRenderer = gameCanvas.getContext("2d")

gameCanvas.width = 800;
gameCanvas.height = 1600;

var tColors = {"wood": "#196F3D", "sheep": "#ABEBC6", "wheat": "#F4D03F", "brick": "#E74C3C", "ore": "#34495E", "desert": "#F5CBA7"};
// Assuming an array of 19 hex objects
// R1: 3
// R2: 4
// R3: 5
// R4: 4
// R5: 3

function assignTerrains() {
  // INCOMPLETE
  var terrains = ["wood", "sheep", "wheat", "brick", "ore", "brick", "sheep", "desert", "wood", "wheat", "wood", "wheat", "brick", "sheep", "sheep", "ore", "ore", "wheat", "wood"];
  return terrains;
}

function assignValues() {
  // INCOMPLETE
  var values = [11, 12, 9, 4, 6, 5, 10, 0, 3, 11, 4, 8, 8, 10, 9, 3, 5, 2, 6];
  return values;
}



function drawGameBoard() {
  //INCOMPLETE
  // Hexagon Width = sqrt(3) * radius
  // Hexagon Height = 2 * radius
  // Distance between adjacent vertical hexagons = height * 3 / 4

  var startX = 400;
  var startY = 400;
  var radius = 50;
  var rowWidths = [3, 4, 5, 4, 3];
  var tileCount = 0;

  for(let row = 0; row < 5; row++) {
    var xOffset;
    if(rowWidths[row] === 3) {
      xOffset = startX + Math.sqrt(3) * radius;
    } else if(rowWidths[row] === 4) {
      xOffset = startX + (Math.sqrt(3) * radius) / 2;
    } else {
      xOffset = startX;
    }

    var yOffset = startY + row * (radius * 1.5);

    for(let column = 0; column < rowWidths[row]; column++) {
      drawHexagon({x: xOffset, y: yOffset}, radius, tiles[tileCount].terrain, tiles[tileCount].value);
      xOffset += Math.sqrt(3) * radius;
      tileCount++;
    }
  }
}

function drawVertices() {
  var startX = 400;
  var startY = 400;
  var radius = 50;
  var rowWidths = [3, 4, 5, 4, 3];
  var tileCount = 0;
  for(let row = 0; row < 3; row++) {
    var xOffset;
    if(rowWidths[row] === 3) {
      xOffset = startX + Math.sqrt(3) * radius;
    } else if(rowWidths[row] === 4) {
      xOffset = startX + (Math.sqrt(3) * radius) / 2;
    } else {
      xOffset = startX;
    }
    var yOffset = startY + row * (radius * 1.5);
    for(let column = 0; column < rowWidths[row]; column++) {
      var tile = tiles[tileCount];
      var vertices = getHexagonVertices({x: xOffset, y: yOffset}, radius);

      var v1V = tile.vertices["v5"].value;
      if(v1V === 0) {
        gameRenderer.beginPath();
        gameRenderer.fillStyle = "grey";
        gameRenderer.arc(vertices[3].x, vertices[3].y, 10, 0, Math.PI * 2);
        gameRenderer.fill();
        gameRenderer.closePath();
      } else if (v1V === 1) {
        gameRenderer.beginPath();
        gameRenderer.fillStyle = "black";
        gameRenderer.rect(vertices[3].x - 10, vertices[3].y - 10, 20, 20);
        gameRenderer.fill();
        gameRenderer.closePath();
      } else {
        gameRenderer.beginPath();
        gameRenderer.fillStyle ="#87ceeb";
        gameRenderer.arc(vertices[3].x, vertices[3].y, 8, 0, Math.PI * 2);
        gameRenderer.fill();
        gameRenderer.closePath();
      }
      xOffset += Math.sqrt(3) * radius;
      tileCount++;
    }
  }
}

var vertices = [];
var terrains = assignTerrains();
var values = assignValues();
var tiles = [];
// var rowIndexes = [3, 4, 5, 4, 3];
//
// var count = 0;
// for(var row = 0; row < rowIndexes.length; row++) {
//   for(var i = 0; i < rowIndexes[row]; i++) {
//     var t = new Tile(count, row + 1, adjacentList[count], terrains[count], values[count]);
//     tiles[count] = t;
//     count++
//   }
// }

drawGameBoard();
Tile.generateVertices();
// console.log(tiles);
// for(var i = 0; i < tiles.length; i++) {
//   console.log(tiles[i].vertices);
// }
//
// console.log(vertices);
drawVertices();
