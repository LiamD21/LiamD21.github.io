// importing
import {Piece} from "./objectClasses/pieceClass";
import {GameBoard} from "./objectClasses/gameBoardClass";

function handleMouseClick(event) {
    let clickX = event.clientX;
    let clickY = event.clientY;

    // check if the event was on the board
    //if ()
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
    board.drawBoard();

    // attach handlers for placing pieces
    canvas.addEventListener("click", handleMouseClick);
}