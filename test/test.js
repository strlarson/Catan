
let c1 = document.getElementById("c1");
let ctx1 = c1.getContext("2d");

ctx1.fillStyle = "blue";
ctx1.beginPath();
ctx1.rect(0, 0, c1.width, c1.height);
ctx1.closePath();
ctx1.fill();


let c2 = document.getElementById("c2");
let ctx2 = c2.getContext("2d");

ctx2.fillStyle = "rgba(100, 50, 200, 0.5)";
ctx2.beginPath();
ctx2.rect(0, 0, 100, 100);
ctx2.closePath();
ctx2.fill();


ctx2.fillStyle = "rgba(100, 50, 200, 1)";
ctx2.beginPath();
ctx2.rect(100, 100, 100, 100);
ctx2.closePath();
ctx2.fill();
