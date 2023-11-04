export class GameBoard{
    // defining private class attributes
    #context;
    #width;
    #height;
    #cellSize;
    #gameState;
    #turn;

    constructor(width, height, cellSize, ctx){
        this.#context = ctx;
        this.#width = width;
        this.#height = height;
        this.#cellSize = cellSize;
        this.#gameState = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]];
        this.#turn = 1;

        this.#drawBoard();
    }

    /**
     * Draws the full game board with all pieces in the correct places according to the game state
     * @private
     */
    #drawBoard(){
        let boardTop = this.#cellSize;
        let boardLeft = this.#width/2-(this.#cellSize*3.5);

        // draw the main blue square for the board
        this.#context.fillStyle = "#1138f6"
        this.#context.fillRect(boardLeft, boardTop, this.#cellSize*7, this.#cellSize*6);

        // draw all the cells
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 6; j++) {

                // pick the correct color to draw
                let color;
                if (this.#gameState[j][i] === 1){
                    color = "red";
                }
                else if (this.#gameState[j][i] === 2){
                    color = "yellow";
                }
                else {
                    color = "white"
                }

                // draw a circle on the correct cell
                this.#drawCircle(color, boardLeft + (i * this.#cellSize) + this.#cellSize / 2, boardTop + (j * this.#cellSize) + this.#cellSize / 2, this.#cellSize / 2 - 5);
            }
        }
    }

    /**
     * Draws a circle on the canvas at a given location to use for a piece in the board
     * @param color the string value for color of the circle
     * @param x the x coordinates of the circle center
     * @param y the y coordinates of the circle center
     * @param rad the radius of the circle
     * @private
     */
    #drawCircle(color, x, y, rad){
        this.#context.fillStyle = color;
        this.#context.beginPath();
        this.#context.arc(x, y, rad, 0, Math.PI*2, false);
        this.#context.fill();
    }

    /**
     * Play a piece onto the board and add it to the game state before redrawing the fresh new board
     * @param pieceCol which column the piece is being player into
     */
    playPiece(pieceCol){

        // for each row in the given col, check from bottom up to add the piece to the lowest spot possible
        let colIndex = 5;
        while (colIndex >= 0){
            if (this.#gameState[colIndex][pieceCol] === 0){
                this.#gameState[colIndex][pieceCol] = this.#turn;
                colIndex = -1;
            }
            else{
                colIndex -=1;
            }
        }

        this.#drawBoard();
    }
}