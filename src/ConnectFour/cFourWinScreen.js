/**
 * the main initializer function for the main win screen loop
 * @param canvas the canvas object
 * @param ctx the graphics context to use to draw
 * @param win the integer player number of the winning player
 */
export function winMain(canvas, ctx, win){
    drawPage(canvas, ctx);
    addListeners(canvas);
}

/**
 * Initialize the canvas, graphics context, and canvas size elements
 * @param canvas the canvas to draw on
 */
function addListeners(canvas) {
    canvas.addEventListener("click", handleMouseClick);
    canvas.addEventListener("mousemove", handleMouseMove);
}

function drawPage(canvas, ctx){
    // clear the page to start
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function handleMouseClick(event){

}

function handleMouseMove(event){

}