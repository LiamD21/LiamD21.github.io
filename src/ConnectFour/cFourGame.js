// global variables
let ctx, canvas;

/**
 * Draws a game board on the canvas
 */
function drawBoard(cellSize){
    // draw the main blue square for the board
    ctx.fillStyle = "#1138f6"
    ctx.fillRect(canvas.width/2-(cellSize*3.5), cellSize, cellSize*7, cellSize*6);
}

/**
 * The main game loop
 * @param context the graphics context object for the canvas that we are drawing on
 * @param mainCanvas the main canvas that we draw on
 */
export function gameMain(context, mainCanvas){
    ctx = context;
    canvas = mainCanvas;

    // find what size we should make the board
    let cellSize = canvas.height/8;

    // draw the initial game
    drawBoard(cellSize);
}