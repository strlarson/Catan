class Gui {
  constructor(contentWidth, contentHeight, leftSidebarOpen, rightSidebarOpen) {
    this.contentWidth = contentWidth;
    this.contentHeight = contentHeight;
    this.leftSidebarOpen = leftSidebarOpen;
    this.rightSidebarOpen = rightSidebarOpen;

    this.remainingWidth = this.contentWidth;

    this.initalize();
  }

  initalize() {
    console.log("---");
    this.initialize_board();
    this.initialize_left_sidebar();
    this.initialize_right_sidebar();


    //test
    this.initialize_left_sidebar_button();

  }

  initialize_board() {
    this.initialize_board_canvas_container();
    this.initialize_board_canvas();
  }

  initialize_board_canvas_container() {
    let hexagonRadius = this.contentHeight / 10;
    let totalWidth =  Math.ceil(6 * (Math.sqrt(3) * hexagonRadius));
    let totalHeight = this.contentHeight;

    let borderSize = Math.ceil(this.contentWidth * 0.0075);
    let contentWidth = Math.ceil(totalWidth - 2 * borderSize);
    let contentHeight = Math.ceil(totalHeight - 2 * borderSize);

    console.log(totalWidth, contentWidth, contentHeight);

    let container = document.getElementById("board-canvas-container");
    container.style.borderWidth = borderSize + "px";
    container.style.width = contentWidth + "px";
    container.style.height = contentHeight + "px";

    this.remainingWidth -= Math.ceil(totalWidth);
    console.log(this.remainingWidth);
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
    if(this.leftSidebarOpen) {
      this.initialize_left_sidebar_container();
      this.initialize_player_info_containers();
    } else {
      let canvasContainer = document.getElementById("board-canvas-container");
      console.log(canvasContainer.style.width);
      console.log(this.remainingWidth);
      canvasContainer.style.width = Math.ceil(parseInt(canvasContainer.style.width, 10) + Math.floor(this.remainingWidth * 0.35)) + "px";
      console.log(canvasContainer.style.width);

      let canvas = document.getElementById("board-canvas");
      canvas.width += Math.ceil(this.remainingWidth * 0.35);

      let sidebar = document.getElementById("left-sidebar-container");
      // console.log(sidebar);
      sidebar.style.display = "none";
    }
  }

  initialize_left_sidebar_container() {
    let totalWidth = Math.floor(this.remainingWidth * 0.35);
    let totalHeight = this.contentHeight;

    let borderSize = Math.floor(this.contentWidth * 0.0025);
    let contentWidth = totalWidth - borderSize;
    let contentHeight = totalHeight - 2 * borderSize;

    let container = document.getElementById("left-sidebar-container");
    container.style.display = "";
    container.style.borderWidth = borderSize + "px";
    container.style.width = contentWidth + "px";
    container.style.height = contentHeight + "px";
  }

  initialize_player_info_containers() {
    let parentContainer = document.getElementById("left-sidebar-container");
    let totalWidth = parentContainer.clientWidth;
    let totalHeight = parentContainer.clientHeight * 0.25;

    let marginSize = this.contentWidth * 0.00625;
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
    if(this.rightSidebarOpen) {
      this.initialize_right_sidebar_container();
      this.initialize_chat_box();
      this.initialize_action_container();
    } else {
      let canvasContainer = document.getElementById("board-canvas-container");
      canvasContainer.style.width = Math.ceil(parseInt(canvasContainer.style.width, 10) + Math.floor(this.remainingWidth * 0.65)) + "px";



      let canvas = document.getElementById("board-canvas");
      canvas.width += Math.ceil(this.remainingWidth * 0.65);

      if(this.leftSidebarOpen) {
        canvasContainer.style.width = Math.ceil(parseInt(canvasContainer.style.width, 10) - 3) + "px";
        canvas.width -= 3;
      }

      let sidebar = document.getElementById("right-sidebar-container");
      // console.log(sidebar);
      sidebar.style.display = "none";
    }
  }

  initialize_right_sidebar_container() {
    let totalWidth = Math.floor(this.remainingWidth * 0.65);
    let totalHeight = this.contentHeight;

    let borderSize = Math.floor(this.contentWidth * 0.0025);
    let contentWidth = totalWidth - borderSize;
    let contentHeight = totalHeight - 2 * borderSize;

    let container = document.getElementById("right-sidebar-container");
    container.style.display = "";
    container.style.borderWidth = borderSize + "px";
    container.style.width = contentWidth + "px";
    container.style.height = contentHeight + "px";
  }

  initialize_chat_box() {
    let parentContainer = document.getElementById("right-sidebar-container");
    let totalWidth = parentContainer.clientWidth;
    let totalHeight = parentContainer.clientHeight * 0.35;

    let borderSize = this.contentWidth * 0.0025;
    let contentWidth = totalWidth;
    let contentHeight = totalHeight - borderSize;

    let container = document.getElementById("chat-box");
    container.style.borderWidth = borderSize + "px";
    container.style.width = contentWidth + "px";
    container.style.height = contentHeight + "px";
  }

  initialize_action_container() {
    let parentContainer = document.getElementById("right-sidebar-container");
    let totalWidth = parentContainer.clientWidth;
    let totalHeight = parentContainer.clientHeight * 0.65;

    let marginSize = this.contentWidth * 0.00625;
    let borderSize = this.contentWidth * 0.0015;
    let contentWidth = totalWidth - 2 * marginSize -  2 * borderSize;
    let contentHeight = totalHeight - 2 * marginSize - 2 * borderSize;

    let container = document.getElementById("action-container");
    container.style.margin = marginSize + "px";
    container.style.borderWidth = borderSize + "px";
    container.style.width = contentWidth + "px";
    container.style.height = contentHeight + "px";
  }

  initialize_left_sidebar_button() {

    let leftSidebar = document.getElementById("left-sidebar-container");
    let canvasContainer = document.getElementById("board-canvas-container");

    let width = this.contentWidth * 0.03;
    let height = width;

    let button = document.getElementById("left-sidebar-button");
    if(this.leftSidebarOpen) {
      button.style.left = leftSidebar.offsetWidth + parseInt(canvasContainer.style.borderLeftWidth, 10) / 3 + "px";
    } else {
      button.style.left = parseInt(canvasContainer.style.borderLeftWidth, 10) / 3 + "px";
    }
    button.style.top = this.contentHeight / 2 - (height / 2);

    button.setAttribute("width", String(width / 2 + 5));
    button.setAttribute("height", String(height + 10));

    let drawing = document.getElementById("left-sidebar-button-drawing");
    drawing.setAttribute("cx", 0);
    drawing.setAttribute("cy", height / 2 + 2);
    drawing.setAttribute("r", width / 2);
  }


}

let lS = false;
let gui = new Gui(window.innerWidth, window.innerHeight, lS, false);
drawGradient();

window.onresize = function(event) {
   gui = new Gui(window.innerWidth, window.innerHeight, lS, true);
   drawGradient();
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
  gui = new Gui(window.innerWidth, window.innerHeight, lS, true);
  drawGradient();
}
