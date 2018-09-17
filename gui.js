var width = window.innerWidth;
var height = window.innerHeight;


let containerTotalWidth = width * .15;
let containerTotalHeight = height;
console.log(containerTotalWidth, containerTotalHeight / 4);
let paddingHor = containerTotalWidth * .05;
let contentWidth = containerTotalWidth * .90;
let contentHeight = containerTotalHeight - 2 * paddingHor;

let container = document.getElementById("player_container");
container.style.width = contentWidth + "px";
container.style.height = contentHeight + "px";
container.style.padding = paddingHor + "px";

let player = document.getElementsByClassName("player_box");

for(let i = 0; i < player.length; i++) {
  let box = player[i];
  let totalWidth = box.parentNode.clientWidth - parseInt(box.parentNode.style.padding, 10) * 2;
  let totalHeight = (box.parentNode.clientHeight - (parseInt(box.parentNode.style.padding, 10) * 2)) * .25;
  let border = totalWidth * .05;
  let contentWidth = totalWidth * .9;
  let contentHeight = totalHeight - 2 * border;

  box.style.width = contentWidth + "px";
  box.style.height = contentHeight + "px";
  box.style.border = border + "px" + " solid";
}
