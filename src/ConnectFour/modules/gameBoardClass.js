export class GameBoard{
    // defining private class attributes
    #context;
    #width;
    #height;
    #cellSize;
    #gameState;
    #turn;
    #color1;
    #color2;

    constructor(width, height, cellSize, ctx, color1, color2){
        this.#context = ctx;
        this.#width = width;
        this.#height = height;
        this.#cellSize = cellSize;
        this.#gameState = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]];
        this.#turn = 1;
        this.#color1 = color1;
        this.#color2 = color2;

        this.#drawBoard();
    }

    /**
     * Creates a copy of the game board for use during search
     * @return {GameBoard}
     */
    copyBoard(){
        let copyBoard = new GameBoard(this.#width, this.#height, this.#cellSize, this.#context, this.#color1, this.#color2);
        copyBoard.setStateTurnForCopy(this.#gameState, this.#turn);
        return copyBoard;
    }

    /**
     * Draws the full game board with all pieces in the correct places according to the game state
     * @private
     */
    #drawBoard(){
        let boardTop = 1.5 * this.#cellSize;
        let boardLeft = this.#width/2-(this.#cellSize*3.5);

        // draw the main blue square for the board
        this.#context.fillStyle = "#1138f6";
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
                    color = "white";
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

    /**
     * Checks if all spaces are full
     * @return {boolean}
     */
    checkDone(){
        for (let row = 0; row < 6; row++){
            for (let col = 0; col < 7; col++){
                if (this.#gameState[row][col] === 0){
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Checks if a col is already full
     * @param pieceCol the number col to check
     * @return {boolean}
     **/
    isColFull(pieceCol){
        for (let i = 0; i < 6; i++){
            if (this.#gameState[i][pieceCol] === 0){
                return false;
            }
        }
        return true;
    }

    /**
     * gets the coordinates of the top of the board
     * @return {number}
     */
    getTop(){
        return this.#cellSize * 1.5;
    }

    /**
     * gets the coordinates of the bottom of the board
     * @return {number}
     */
    getBottom(){
        return this.#height - (0.5 * this.#cellSize);
    }

    /**
     * gets the coordinates of the left side of the board
     * @return {number}
     */
    getLeft(){
        return this.#width/2-(this.#cellSize*3.5);
    }

    /**
     * gets the coordinates of the right side of the board
     * @return {number}
     */
    getRight(){
        return this.#width - this.getLeft();
    }

    /**
     * gets the string value of the current player's color
     * @return {*}
     */
    getColor(){
        if (this.#turn === 1) {
            return this.#color1;
        }
        else {
            return this.#color2;
        }
    }

    /**
     * Changes turn variable to the next value
     */
    nextTurn(){
        if (this.#turn === 1){
            this.#turn = 2;
        }
        else {
            this.#turn = 1;
        }
    }

    /**
     * gets the current game state
     * @return {*}
     */
    getGameState(){
        return this.#gameState;
    }

    /**
     * sets the game state and turn in the event that you need to copy a different board into this one during search
     * @param state the game board array to copy here
     * @param turn the turn to copy here
     */
    setStateTurnForCopy(state, turn){
        this.#gameState = state;
        this.#turn = turn;
    }

    /**
     * gets which players turn it currently is
     * @return {*}
     */
    getTurn(){
        return this.#turn;
    }
}