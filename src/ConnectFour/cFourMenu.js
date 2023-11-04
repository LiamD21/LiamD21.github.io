// Importing classes
import {Button} from "./modules/buttonClass.js";
import {gameMain} from "./cFourGame.js"

// Global Variables
let canvas;
let ctx;
let menuButton;

/**
 * Initialize the canvas, graphics context, and canvas size elements
 */
function initializeCanvas() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    // attach handler
    canvas.onclick = handleMouseClick;
    canvas.onmousemove = handleMouseMove;
}

/**
 * Add the Main menu text to the canvas
 */
function addText(){
    ctx.font = "100px serif";
    ctx.textAlign = "center";
    ctx.fillStyle = "#330072";
    ctx.fillText("Connect Four", canvas.width/2, canvas.height/4);
}

/**
 * Draw the main menu button onto the canvas
 */
function drawMenuButtons(){
    menuButton = new Button(ctx, canvas.width/2 - 100, canvas.height*2/3, 100, 200, "PLAY", "#888888");
    menuButton.drawNew();
}

/**
 * if there is a mouseclick event, check location and deal with accordingly
 * @param event the mouse click event
 */
function handleMouseClick(event){
    let clickX = event.clientX;
    let clickY = event.clientY;

    // Check if we clicked on the play button
    if (clickX > menuButton.x && clickX < menuButton.x + menuButton.width && clickY > menuButton.y && clickY < menuButton.y + menuButton.height){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        gameMain(ctx, canvas);
    }
}

function handleMouseMove(event){
    // check if mouse is hovering over the play button
    if (event.clientX > menuButton.x && event.clientX < menuButton.x + menuButton.width && event.clientY > menuButton.y && event.clientY < menuButton.y + menuButton.height) {
        menuButton.recolor("#d5d5d5");
    }

    else {
        menuButton.recolor("#888888");
    }
}

/**
 * The main setup and handling loop for the main menu
 */
function main(){
    initializeCanvas();
    addText();
    drawMenuButtons();
}

// call the main function on start
main();