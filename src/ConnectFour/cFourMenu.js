// Importing classes
import {Button} from "./modules/buttonClass.js";
import {gameMain} from "./cFourGame.mjs"

// Global Variables
let canvas;
let ctx;
let playTwoPlayer, playOnePlayer;
let isOverTwoPPlayButton = false;
let isOverOnePPlayButton = false;

/**
 * The main setup and handling loop for the main menu
 */
export function main(){
    initializeCanvas();
    addText();
    playTwoPlayer = new Button(ctx, canvas.width/3 - 100, canvas.height*2/3, 100, 200, "TWO PLAYER", "#888888");
    playOnePlayer = new Button(ctx, canvas.width * 2/3 - 100, canvas.height*2/3, 100, 200, "SINGLE PLAYER", "#888888");
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
    // Check if we were over a button when there was a click
    if (isOverTwoPPlayButton){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.removeEventListener("click", handleMouseClick);
        canvas.removeEventListener("mousemove", handleMouseMove);
        gameMain(2);
    }
    if (isOverOnePPlayButton){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.removeEventListener("click", handleMouseClick);
        canvas.removeEventListener("mousemove", handleMouseMove);
        gameMain(1);
    }
}

/**
 * handles mouse move events
 * if the mouse moves over the button, change button color to have an interactive UI
 * @param event
 */
function handleMouseMove(event){
    // check if mouse is hovering over the two player play button
    if (event.clientX > playTwoPlayer.getX() && event.clientX < playTwoPlayer.getX() + playTwoPlayer.getWidth() && event.clientY > playTwoPlayer.getY() && event.clientY < playTwoPlayer.getY() + playTwoPlayer.getHeight()) {
        // check if the mouse was just off the button
        if (!isOverTwoPPlayButton) {
            isOverTwoPPlayButton = true;
            playTwoPlayer.recolor("#d5d5d5");
        }
    }

    // if mouse is not over play button, but it just was over the button
    else if (isOverTwoPPlayButton){
        isOverTwoPPlayButton = false;
        playTwoPlayer.recolor("#888888");
    }

    // check if mouse is hovering over the single player play button
    if (event.clientX > playOnePlayer.getX() && event.clientX < playOnePlayer.getX() + playOnePlayer.getWidth() && event.clientY > playOnePlayer.getY() && event.clientY < playOnePlayer.getY() + playOnePlayer.getHeight()) {
        // check if the mouse was just off the button
        if (!isOverOnePPlayButton) {
            isOverOnePPlayButton = true;
            playOnePlayer.recolor("#d5d5d5");
        }
    }

    // if mouse is not over play button, but it just was over the button
    else if (isOverOnePPlayButton){
        isOverOnePPlayButton = false;
        playOnePlayer.recolor("#888888");
    }
}

// call the main function on start
main(true);