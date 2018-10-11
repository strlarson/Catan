var stateOfVertices = new Array(54).fill(1); // 0: Closed | 1: Open
var positionsOfVertices = new Array(54);



var tColors = {"wood": "#254117", "sheep": "#A4A981", "wheat": "#EDA55D", "brick": "#7B3F37", "ore": "#70726F", "desert": "#F5CBA7"};
// Assuming an array of 19 hex objects



var board = new Board(["wood", "sheep", "wood", "ore", "stone", "ore", "wheat", "desert", "wood",
                      "brick", "wheat", "brick", "ore", "brick", "desert", "wood", "brick", "brick", "brick"], [2, 3, 4, 5, 6, 6, 7, 2, 3, 4, 1, 2, 6, 7, 5, 4, 3, 2, 5]);
// board.initialize();
console.log(board);

let lS = true;
let rS = true;
let gui = new Gui(window.innerWidth, window.innerHeight, lS, rS);
// drawGradient();
let canvas = document.getElementById("board-canvas");
let canvasCxt = canvas.getContext("2d");


const TOP_BAR_PERCENTAGE = 0.08;
const BOTTOM_BAR_PERCENTAGE = 0.08;

var boardHeight = window.innerHeight - window.innerHeight * (TOP_BAR_PERCENTAGE + BOTTOM_BAR_PERCENTAGE);
var tileSize = boardHeight / 10;
initialize_positions_of_vertices(canvas);
draw_game_board(canvas, false, false);
close_vertices(stateOfVertices, 4);
// close_vertices(stateOfVertices, 5);
draw_vertices();

let banner = new Turn_Banner(canvas, "oof");
banner.set_position();
banner.draw();






function draw_settlement(x, y) {
  canvasCxt.fillStyle = "red";
  canvasCxt.lineWidth = 3;
  canvasCxt.beginPath();
  canvasCxt.moveTo(x - 12, y + 10);
  canvasCxt.lineTo(x + 12, y + 10);
  canvasCxt.lineTo(x + 12, y - 10);
  canvasCxt.lineTo(x, y - 20);
  canvasCxt.lineTo(x - 12, y - 10);
  canvasCxt.lineTo(x - 12, y + 10);
  canvasCxt.closePath();
  canvasCxt.fill();
  canvasCxt.stroke();

  canvasCxt.beginPath();
  canvasCxt.lineWidth = 3;
  canvasCxt.moveTo(x + 12, y + 10);
  canvasCxt.lineTo(x + 24, y);
  canvasCxt.lineTo(x + 24, y - 20);
  canvasCxt.lineTo(x + 12, y - 10);
  canvasCxt.lineTo(x + 12, y + 10);
  // canvasCxt.lineTo(x - 12, y + 10);
  canvasCxt.closePath();
  canvasCxt.fill();
  canvasCxt.stroke();

  canvasCxt.beginPath();
  canvasCxt.lineWidth = 3;
  canvasCxt.moveTo(x + 12, y - 10);
  canvasCxt.lineTo(x + 24, y - 20);
  canvasCxt.lineTo(x + 12, y - 30);
  canvasCxt.lineTo(x, y - 20);
  canvasCxt.lineTo(x + 12, y - 10);
  // canvasCxt.lineTo(x - 12, y + 10);
  canvasCxt.closePath();
  canvasCxt.fill();
  canvasCxt.stroke();
  // canvasCxt.moveTo(x + 12, y + 10);
  // canvasCxt.moveTo(x + 12, y + 10);
  // canvasCxt.lineTo(x + 22, y);
  // canvasCxt.lineTo(x + 22, y - 20);
  // canvasCxt.lineTo(x + 12, y - 10);
  // // canvasCxt.fill();
  // // canvasCxt.stroke();
  // canvasCxt.moveTo(x, y - 20);
  // canvasCxt.lineTo(x + 12, y - 30);
  // canvasCxt.lineTo(x + 22, y - 20);
  // // canvasCxt.fill();
  // canvasCxt.stroke();
  // canvasCxt.closePath();
}












function draw_vertices() {
  for(let i = 0; i < stateOfVertices.length; ++i) {
    if(stateOfVertices[i]) {
      let position = positionsOfVertices[i];
      let rand = Math.floor(Math.random() * 8);
      if(rand === 5) {
        draw_settlement(position[0], position[1], 150);
      } else {
        canvasCxt.beginPath();
        canvasCxt.fillStyle = "rgba(133, 187, 101, 0.6)";
        canvasCxt.arc(position[0], position[1], 20, 0, Math.PI * 2);
        canvasCxt.fill();
        // canvasCxt.stroke();
        canvasCxt.closePath();
      }
    }
  }
}






window.onresize = function(event) {
   gui = new Gui(window.innerWidth, window.innerHeight, lS, rS);
   // drawGradient();
   initialize_positions_of_vertices(canvas);
   draw_game_board(canvas, false, false);
}

function drawGradient() {
  let canvas = document.getElementById("board-canvas");
  let ctx = canvas.getContext("2d");

  let grd = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, canvas.width / 3, canvas.width / 2, canvas.height / 2, canvas.width / 1.4);
  grd.addColorStop(0, "#0077BE");
  grd.addColorStop(1, "#00008B");

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function handleLeftSidebarButtonClick() {
  if(lS) {
    lS = false;
  } else {
    lS = true;
  }
  gui = new Gui(window.innerWidth, window.innerHeight, lS, rS);
  // drawGradient();
  initialize_positions_of_vertices(canvas);
  draw_game_board(canvas, false, false);
}

function handleRightSidebarButtonClick() {
  if(rS) {
    rS = false;
  } else {
    rS = true;
  }

  gui = new Gui(window.innerWidth, window.innerHeight, lS, rS);
  // drawGradient();
  initialize_positions_of_vertices(canvas);
  draw_game_board(canvas, false, false);
}


function initialize_positions_of_vertices(canvas) {
  var boardCenter = [canvas.width / 2, canvas.height / 2];
  var startX = boardCenter[0] - 2 * Math.sqrt(3) * tileSize;
  var startY = boardCenter[1] - 3 * tileSize;

  var rowWidths = [3, 4, 5, 4, 3];
  var tileCount = 0;

  for(let row = 0; row < 5; row++) {
    var xOffset;
    if(rowWidths[row] === 3) {
      xOffset = startX + Math.sqrt(3) * tileSize;
    } else if(rowWidths[row] === 4) {
      xOffset = startX + (Math.sqrt(3) * tileSize) / 2;
    } else {
      xOffset = startX;
    }

    var yOffset = startY + row * (tileSize * 1.5);

    for(let column = 0; column < rowWidths[row]; column++) {
      let positions = getHexagonVertices({x: xOffset, y: yOffset}, tileSize);
      let tileV = board.tiles[tileCount].vertices;
      for(let i = 0; i < tileV.length; ++i) {
        positionsOfVertices[tileV[i].id] = positions[i];
      }

      xOffset += Math.sqrt(3) * tileSize;
      tileCount++;
    }
  }
}



function draw_game_board(canvas, leftSidebarOpen, rightSidebarOpen) {
  let cxt = canvas.getContext("2d");
  for(let i = 0; i < board.tiles.length; ++i) {
    drawHexagon(cxt, i);
  }
}

function getHexagonVertices(position, radius) {
  var vertices = [];
  for(let i = 0; i < 6; i++) {
    let angle = ((Math.PI / 3) * i) - (Math.PI / 6) * 3;
    vertices.push([position.x + radius * Math.cos(angle), position.y + radius * Math.sin(angle)]);
  }
  return vertices;
};

function drawHexagon(canvas, tileId) {

  var vertices = board.tiles[tileId].vertices;

  canvas.beginPath();
  canvas.fillStyle = tColors[board.tiles[tileId].terrain];
  canvas.lineWidth = 3;
  // console.log(terrain);
  canvas.moveTo(positionsOfVertices[vertices[0].id][0], positionsOfVertices[vertices[0].id][1]);
  for(let index = 1; index < vertices.length; index++) {
    canvas.lineTo(positionsOfVertices[vertices[index].id][0], positionsOfVertices[vertices[index].id][1]);
  }
  canvas.lineTo(positionsOfVertices[vertices[0].id][0], positionsOfVertices[vertices[0].id][1]);
  canvas.fill();
  canvas.stroke();
  canvas.closePath();

  // gameRenderer.beginPath();
  // gameRenderer.fillStyle = "black";
  // gameRenderer.textAlign = "center";
  // gameRenderer.textBaseline = "middle";
  // gameRenderer.font = "20px Arial";
  // gameRenderer.fillText(String(value), vertices[0].x - ((vertices[0].x - vertices[2].x) / 2), vertices[4].y - ((vertices[4].y - vertices[1].y) / 2));
  // gameRenderer.closePath();
}
//---------------------------------------------------------------------------------

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
