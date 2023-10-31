// Global Variables
let canvas;
let ctx;
let overStartButton;

function initializeCanvas() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
}

function addText(){
    ctx.font = "50px Comic Sans MS";
    ctx.textAlign = "center";
    ctx.fillStyle = "#7b00ff"
    ctx.fillText("Connect Four", canvas.width/2, canvas.height/4);
}

function drawMenuButtons(){
    ctx.fillStyle = "#888888";
    ctx.fillRect(canvas.width/2 - 100, canvas.height*2/3, 200, 100);
    ctx.strokeRect(canvas.width/2 - 100, canvas.height*2/3, 200, 100);
}

function main(){
    initializeCanvas();
    addText();
    drawMenuButtons();
}

main();