// Global Variables
let canvas;
let ctx;

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

function main(){
    initializeCanvas();
    addText();
}

main();