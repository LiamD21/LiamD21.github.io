// Importing classes
import {Button} from "./modules/buttonClass.js";
import {gameMain} from "./cFourGame.mjs"

// Global Variables
let canvas;
let ctx;
let onePlayerButton;
let twoPlayerButton;
let isOverOnePlayButton = false;
let isOverTwoPlayButton = false;

/**
 * The main setup and handling loop for the main menu
 */
export function main(){
    initializeCanvas();
    addText();
    onePlayerButton = new Button(ctx, canvas.width/3 - 112.5, canvas.height*3/5, 100, 225, "1 Player", "#888888");
    twoPlayerButton = new Button(ctx, canvas.width*2/3 - 112.5, canvas.height*3/5, 100, 225, "2 Players", "#888888");
}

/**
 * Initialize the canvas, graphics context, and canvas size elements
 */
function initializeCanvas() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    // get the height and width
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    // attach listeners
    canvas.addEventListener("click", handleMouseClick);
    canvas.addEventListener("mousemove", handleMouseMove);
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
 * if there is a mouseclick event, check location and deal with accordingly
 * @param event
 */
function handleMouseClick(event){
    // Check if we were over the play button when there was a click
    if (isOverOnePlayButton){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.removeEventListener("click", handleMouseClick);
        canvas.removeEventListener("mousemove", handleMouseMove);
        gameMain(true);
    }
    if (isOverTwoPlayButton){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.removeEventListener("click", handleMouseClick);
        canvas.removeEventListener("mousemove", handleMouseMove);
        gameMain(false);
    }
}

/**
 * handles mouse move events
 * if the mouse moves over the button, change button color to have an interactive UI
 * @param event
 */
function handleMouseMove(event){
    // check if mouse is hovering over a play button
    if (event.clientX > onePlayerButton.getX() && event.clientX < onePlayerButton.getX() + onePlayerButton.getWidth() && event.clientY > onePlayerButton.getY() && event.clientY < onePlayerButton.getY() + onePlayerButton.getHeight()) {
        // check if the mouse was just off the button
        if (!isOverOnePlayButton) {
            isOverOnePlayButton = true;
            onePlayerButton.recolor("#d5d5d5");
        }
    }

    // if mouse is not over play button, but it just was over the button
    else if (isOverOnePlayButton){
        isOverOnePlayButton = false;
        onePlayerButton.recolor("#888888");
    }

    if (event.clientX > twoPlayerButton.getX() && event.clientX < twoPlayerButton.getX() + twoPlayerButton.getWidth() && event.clientY > twoPlayerButton.getY() && event.clientY < twoPlayerButton.getY() + twoPlayerButton.getHeight()) {
        // check if the mouse was just off the button
        if (!isOverTwoPlayButton) {
            isOverTwoPlayButton = true;
            twoPlayerButton.recolor("#d5d5d5");
        }
    }

    // if mouse is not over play button, but it just was over the button
    else if (isOverTwoPlayButton){
        isOverTwoPlayButton = false;
        twoPlayerButton.recolor("#888888");
    }
}

// call the main function on start
main(true);