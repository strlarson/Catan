





let players = [];

function generatePlayers() {
  for(let i = 0; i < 4; i++) {
    if(i === 1) {
      let player = new Player(i);
      players.push(player);
    } else {
      let player = new Computer(i);
      players.push(player);
    }
  }
}


class Player {
  constructor(turnPosition) {
    this.turnPosition = turnPosition;
  }
}

class Computer {
  constructor(turnPosition) {
    this.turnPosition = turnPosition;
  }
}

generatePlayers();
