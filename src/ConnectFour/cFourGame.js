// global variables
let ctx, canvas;

/**
 * Draws a game board on the canvas
 */
function drawBoard(cellSize){
    let boardTop = cellSize;
    let boardLeft = canvas.width/2-(cellSize*3.5);

    // draw the main blue square for the board
    ctx.fillStyle = "#1138f6"
    ctx.fillRect(boardLeft, boardTop, cellSize*7, cellSize*6);

    // draw all the cells
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 6; j++) {
            drawCircle("white", boardLeft + (i * cellSize) + cellSize / 2, boardTop + (j * cellSize) + cellSize / 2, cellSize / 2 - 5);
        }
    }
}

function drawCircle(color, x, y, rad){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, Math.PI*2, false);
    ctx.fill();
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