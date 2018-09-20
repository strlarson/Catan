class Gui {
  constructor(contentWidth, contentHeight) {
    this.contentWidth = contentWidth;
    this.contentHeight = contentHeight;

    this.remainingWidth = this.contentWidth;

    this.initalize();
  }

  initalize() {
    this.initialize_board();
    this.initialize_left_sidebar();
    this.initialize_right_sidebar();

  }

  initialize_board() {
    this.initialize_board_canvas_container();
    this.initialize_board_canvas();
  }

  initialize_board_canvas_container() {
    let hexagonRadius = this.contentHeight / 10;
    let totalWidth =  6 * (Math.sqrt(3) * hexagonRadius);
    let totalHeight = this.contentHeight;

    let borderSize = this.contentWidth * 0.003;
    let contentWidth = totalWidth - 2 * borderSize;
    let contentHeight = totalHeight - 2 * borderSize;

    let container = document.getElementById("board-canvas-container");
    container.style.borderWidth = borderSize + "px";
    container.style.width = contentWidth + "px";
    container.style.height = contentHeight + "px";

    this.remainingWidth -= totalWidth;
  }

  initialize_board_canvas() {
    let parentContainer = document.getElementById("board-canvas-container");
    let width =  parentContainer.clientWidth;
    let height = parentContainer.clientHeight;

    let canvas = document.getElementById("board-canvas");
    canvas.width = width;
    canvas.height = height;
  }

  initialize_left_sidebar() {
    this.initialize_left_sidebar_container();
    this.initialize_player_info_containers();
  }

  initialize_left_sidebar_container() {
    let totalWidth = this.remainingWidth * 0.35;
    let totalHeight = this.contentHeight;

    let borderSize = this.contentWidth * 0.003;
    let contentWidth = totalWidth - borderSize;
    let contentHeight = totalHeight - 2 * borderSize;

    let container = document.getElementById("left-sidebar-container");
    container.style.borderWidth = borderSize + "px";
    container.style.width = contentWidth + "px";
    container.style.height = contentHeight + "px";
  }

  initialize_player_info_containers() {
    let parentContainer = document.getElementById("left-sidebar-container");
    let totalWidth = parentContainer.clientWidth;
    let totalHeight = parentContainer.clientHeight * 0.25;

    let marginSize = this.contentWidth * 0.006;
    let borderSize = this.contentWidth * 0.0015;
    let contentWidth = totalWidth - 2 * marginSize -  2 * borderSize;
    let contentHeight = totalHeight - 2 * marginSize + 0.25 * (3 * marginSize) - 2 * borderSize;

    let containers = document.getElementsByClassName("player-info-container");
    for(let i = 0; i < containers.length; ++i) {
      let container = containers[i];
      container.style.margin = marginSize + "px";
      container.style.borderWidth = borderSize + "px";
      container.style.width = contentWidth + "px";
      container.style.height = contentHeight + "px";

      if(i !== 3) {
        container.style.marginBottom = "0px";
      }
    }
  }

  initialize_right_sidebar() {
    this.initialize_right_sidebar_container();
  }

  initialize_right_sidebar_container() {
    let totalWidth = this.remainingWidth * 0.65;
    let totalHeight = this.contentHeight;

    let borderSize = this.contentWidth * 0.003;
    let contentWidth = totalWidth - borderSize;
    let contentHeight = totalHeight - 2 * borderSize;

    let container = document.getElementById("right-sidebar-container");
    container.style.borderWidth = borderSize + "px";
    container.style.width = contentWidth + "px";
    container.style.height = contentHeight + "px";
  }

  // initialize_chat_box() {
  //
  // }
}

let gui = new Gui(window.innerWidth, window.innerHeight);

window.onresize = function(event) {
   gui = new Gui(window.innerWidth, window.innerHeight);
}
