import {Button} from "./modules/buttonClass.js";
import {main} from "./cFourMenu.js";
import {gameMain} from "./cFourGame.mjs";

// Global variables
let menuButton, playButton;
let overMenuButton, overNewGameButton;
let canvas;
let ctx;

/**
 * the main initializer function for the main win screen loop
 * @param win the integer player number of the winning player
 */
export function winMain(win){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    // get the height and width
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    overMenuButton = false;
    overNewGameButton = false;

    drawPage(win);
    addListeners();
}

/**
 * Initialize the canvas, graphics context, and canvas size elements
 */
function addListeners() {
    canvas.addEventListener("click", handleMouseClick);
    canvas.addEventListener("mousemove", handleMouseMove);
}

/**
 * Draw the page text and the back to main menu button
 * @param win the number of the player who won
 */
function drawPage(win){
    // clear the page to start
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // add text for the winner
    let winText = "Player " + win + " Wins!"

    ctx.font = "100px serif";
    ctx.textAlign = "center";
    ctx.fillStyle = "#330072";
    ctx.fillText(winText, canvas.width/2, canvas.height/4);

    // add a button to the screen
    menuButton = new Button(ctx, canvas.width/3 - 125, canvas.height*2/3, 100, 250, "MAIN MENU", "#888888");
    playButton = new Button(ctx, canvas.width*2/3 - 125, canvas.height*2/3, 100, 250, "PLAY AGAIN", "#888888");
}

/**
 * handles the mouse click events for the button
 * @param event
 */
function handleMouseClick(event){
    // Check if we were over the menu button when there was a click
    if (overMenuButton){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.removeEventListener("click", handleMouseClick);
        canvas.removeEventListener("mousemove", handleMouseMove);
        main();
    }

    // Check if we were over the play again button when there was a click
    if (overNewGameButton){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.removeEventListener("click", handleMouseClick);
        canvas.removeEventListener("mousemove", handleMouseMove);
        gameMain();
    }
}

/**
 * handles the mouse move events to see if we are over the button
 * @param event
 */
function handleMouseMove(event){
    // check if mouse is hovering over the menu button
    if (event.clientX > menuButton.getX() && event.clientX < menuButton.getX() + menuButton.getWidth() && event.clientY > menuButton.getY() && event.clientY < menuButton.getY() + menuButton.getHeight()) {
        // check if the mouse was just off the button
        if (!overMenuButton) {
            overMenuButton = true;
            menuButton.recolor("#d5d5d5");
        }
    }

    // if mouse is not over menu button, but it just was over the button
    else if (overMenuButton){
        overMenuButton = false;
        menuButton.recolor("#888888");
    }

    // check if mouse is hovering over the play again button
    if (event.clientX > playButton.getX() && event.clientX < playButton.getX() + playButton.getWidth() && event.clientY > playButton.getY() && event.clientY < playButton.getY() + playButton.getHeight()) {
        // check if the mouse was just off the button
        if (!overNewGameButton) {
            overNewGameButton = true;
            playButton.recolor("#d5d5d5");
        }
    }

    // if mouse is not over play button, but it just was over the button
    else if (overNewGameButton){
        overNewGameButton = false;
        playButton.recolor("#888888");
    }
}