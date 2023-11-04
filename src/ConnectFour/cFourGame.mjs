// importing
import {GameBoard} from "./modules/gameBoardClass.js";

// create a state enum
const states = {
    READY: Symbol("Ready"),
    SELECTED: Symbol("Selected")
}

/**
 * deals with mouse press events
 * If mouse is pressed on the piece to play, select it
 * @param event
 */
function handleMousePress(event) {
    let clickX = event.clientX;
    let clickY = event.clientY;

    // check if the event was on the board
    //if ()
}

/**
 * Handles mouse released events
 * if the item to place is selected, and it is over a col, place it, else, reset it
 * @param event
 */
function handleMouseRelease(event){

}

/**
 * handles mouse move events
 * if the item to place is selected, drag it with the mouse
 * @param event
 */
function handleMouseDragged(event){

}

/**
 * The main game loop
 * @param ctx
 * @param canvas
 */
export function gameMain(ctx, canvas){

    // find what size we should make the board
    let cellSize = canvas.height/8;

    // initialize the game and draw the empty board
    let board = new GameBoard(canvas.width, canvas.height, cellSize, ctx)

    // attach handlers for placing pieces
    canvas.addEventListener("mousedown", handleMousePress);
    canvas.addEventListener("mouseup", handleMouseRelease);
    canvas.addEventListener("mousemove", handleMouseDragged);
}