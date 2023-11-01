// Importing classes
import Button from "./modules/buttonClass.js";

// Global Variables
let canvas;
let ctx;
let menuButton;

function initializeCanvas() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.onclick = handleMouseClick;
}

function addText(){
    ctx.font = "100px serif";
    ctx.textAlign = "center";
    ctx.fillStyle = "#330072";
    ctx.fillText("Connect Four", canvas.width/2, canvas.height/4);
}

function drawMenuButtons(){
    menuButton = new Button(ctx, canvas.width/2 - 100, canvas.height*2/3, 100, 200, "PLAY", "#888888");
    menuButton.draw();
}

function handleMouseClick(event){
    let clickX = event.clientX;
    let clickY = event.clientY;

    if (clickX > menuButton.x && clickX < menuButton.x + menuButton.width && clickY > menuButton.y && clickY < menuButton.y + menuButton.height){

    }
}

function main(){
    initializeCanvas();
    addText();
    drawMenuButtons();
}

main();