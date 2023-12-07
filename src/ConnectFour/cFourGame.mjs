// importing
import {GameBoard} from "./modules/gameBoardClass.js";
import {NextPiece} from "./modules/nextPieceClass.js";
import {winMain} from "./cFourWinScreen.mjs";
import {updateGameBoard} from "./modules/cFourEvaluator.js";
import {getEvalScore} from "./modules/cFourEvaluator.js";
import {evalBar} from "./modules/evalBarClass.js";

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
let board, evBar;
let canvas, ctx;

/**
 * The main game loop
 */
export function gameMain(){
    win = false;
    currentState = states.READY;
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    // get the height and width
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    // find what size we should make the board
    let cellSize = canvas.height/8;

    // variables for each player's color
    let p1Color = "red"
    let p2Color = "yellow"

    // initialize the game and draw the empty board
    board = new GameBoard(canvas.width, canvas.height, cellSize, ctx, p1Color, p2Color);

    // Initialize the evaluator and draw the eval bar
    updateGameBoard(board.getGameState());
    evBar = new evalBar(canvas, ctx);
    evBar.setEvalScore(getEvalScore());
    evBar.draw();

    // add the next piece to be dragged in
    addNextPiece(canvas.height, (cellSize/2) - 5, board, p1Color);

    // attach handlers for placing pieces
    canvas.addEventListener("mousedown", handleMousePress);
    canvas.addEventListener("mouseup", function(){
        handleMouseRelease(event, canvas, ctx);
    });
    canvas.addEventListener("mousemove", handleMouseDragged);
}

/**
 * Adds the piece to be played next to the corner of the board
 * @param height the height of the canvas
 * @param radius the radius of the circle to draw
 * @param board the game board object
 * @param initialColor the string color value for the first color used, player1's color
 */
function addNextPiece(height, radius, board, initialColor){
    nextPiece = new NextPiece(initialColor, radius, height, ctx, board.getLeft(), board.getRight(), board.getTop(), board.getBottom());
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
        let nextCol = nextPiece.checkAboveCol();

        // if we are above a col, drop it in if the col is not already full, then check for a win
        if (nextCol !== -1 && !board.isColFull(nextCol-1)){
            board.playPiece(nextCol-1);
            board.nextTurn();
            updateGameBoard(board.getGameState());

            // check for a win
            let win = board.checkWin();
            // check if there are any remaining places
            let done = board.checkDone();

            if (win !== 0 || done){
                canvas.removeEventListener("mousedown", handleMousePress);
                canvas.removeEventListener("mouseup", handleMouseRelease);
                canvas.removeEventListener("mousemove", handleMouseDragged);
                if (win !== 0) {
                    winMain(win);
                }
                else {
                    winMain(-1);
                }
            }
            else {
                nextPiece.reset(board.getColor());
                currentState = states.READY;
            }
        }
        else {
            nextPiece.reset(board.getColor());
            currentState = states.READY;
        }
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