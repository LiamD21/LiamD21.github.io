// importing
import {GameBoard} from "./modules/gameBoardClass.js";
import {NextPiece} from "./modules/nextPieceClass.js";

// create a state enum
const states = {
    READY: Symbol("Ready"),
    SELECTED: Symbol("Selected"),
    PLACED: Symbol("Placed")
}

// global variables
let overNextPiece;
let nextPiece;
let win;
let currentState;

/**
 * The main game loop
 * @param ctx
 * @param canvas
 */
export function gameMain(ctx, canvas){
    win = false;
    currentState = states.PLACED;

    // find what size we should make the board
    let cellSize = canvas.height/8;

    // initialize the game and draw the empty board
    let board = new GameBoard(canvas.width, canvas.height, cellSize, ctx)

    // attach handlers for placing pieces
    canvas.addEventListener("mousedown", handleMousePress);
    canvas.addEventListener("mouseup", handleMouseRelease);
    canvas.addEventListener("mousemove", handleMouseDragged);

    // main gameplay loop
    addNextPiece(canvas.height, ctx, (cellSize/2) - 5);
}

/**
 * Adds the piece to be played next to the corner of the board
 * @param height the height of the canvas
 * @param context the graphics context that we are drawing on
 * @param radius the radius of the circle to draw
 */
function addNextPiece(height, context, radius){
    // if the state is equal to placed, we need to add another piece
    if(currentState === states.PLACED){
        nextPiece = new NextPiece("red", radius, height, context);
    }
}

/**
 * deals with mouse press events
 * If mouse is pressed on the piece to play, select it
 * @param event
 */
function handleMousePress(event) {

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
// function handleMouseDragged(event){
//     // check if mouse is hovering over the piece to drag
//     // if () {
//     //     // check if the mouse was just off the piece
//     //     if (!overNextPiece) {
//     //         overNextPiece = true;
//     //     }
//     // }
//
//     // if mouse is not over next piece, but it just was over the next piece
//     else if (overNextPiece){
//         overNextPiece = false;
//     }
// }