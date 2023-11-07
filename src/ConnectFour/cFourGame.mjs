// importing
import {GameBoard} from "./modules/gameBoardClass.js";
import {NextPiece} from "./modules/nextPieceClass.js";

// create a state enum
const states = {
    READY: Symbol("Ready"),
    SELECTED: Symbol("Selected"),
}

// global variables
let overNextPiece;
let nextPiece;
let win;
let currentState;
let board;

/**
 * The main game loop
 * @param ctx
 * @param canvas
 */
export function gameMain(ctx, canvas){
    win = false;
    currentState = states.READY;

    // find what size we should make the board
    let cellSize = canvas.height/8;

    // variables for each player's color
    let p1Color = "red"
    let p2Color = "yellow"

    // initialize the game and draw the empty board
    board = new GameBoard(canvas.width, canvas.height, cellSize, ctx, p1Color, p2Color);

    // add the next piece to be dragged in
    addNextPiece(canvas.height, ctx, (cellSize/2) - 5, board, p1Color);

    // attach handlers for placing pieces
    canvas.addEventListener("mousedown", handleMousePress);
    canvas.addEventListener("mouseup", handleMouseRelease);
    canvas.addEventListener("mousemove", handleMouseDragged);
}

/**
 * Adds the piece to be played next to the corner of the board
 * @param height the height of the canvas
 * @param context the graphics context that we are drawing on
 * @param radius the radius of the circle to draw
 * @param board the game board object
 * @param initialColor the string color value for the first color used, player1's color
 */
function addNextPiece(height, context, radius, board, initialColor){
    nextPiece = new NextPiece(initialColor, radius, height, context, board.getLeft(), board.getRight(), board.getTop(), board.getBottom());
}

/**
 * deals with mouse press events
 * If mouse is pressed on the piece to play, select it
 * @param event
 */
function handleMousePress(event) {
    // if the state is ready, and we are over the object, enter selected
    if (currentState === states.READY && overNextPiece){
        currentState = states.SELECTED;
    }
}

/**
 * Handles mouse released events
 * if the item to place is selected, and it is over a col, place it, else, reset it
 * @param event
 */
function handleMouseRelease(event){
    // if the state is currently selected, go back to placed
    if (currentState === states.SELECTED){
        board.nextTurn();
        nextPiece.reset(board.getColor());
        currentState = states.READY;
    }
}

/**
 * handles mouse move events
 * if the item to place is selected, drag it with the mouse
 * @param event
 */
function handleMouseDragged(event){
    // check if state is selected, then we must drag the piece
    if (currentState === states.SELECTED){
        nextPiece.move(event.clientX, event.clientY);
    }

    // check if mouse is hovering over the piece to drag
    if (nextPiece.checkIntersect(event.clientX, event.clientY)) {
        // check if the mouse was just off the piece
        if (!overNextPiece) {
            overNextPiece = true;
        }
    }

    // if mouse is not over next piece, but it just was over the next piece
    else if (overNextPiece){
        overNextPiece = false;
    }
}