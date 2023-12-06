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

    checkWin(){
        // go through all rows looking for 4 in a row
        for (let row = 0; row < 6; row++){
            let rowCount = 1;
            let rowItem = 0;
            for (let col = 0; col < 7; col++){
                if (this.#gameState[row][col] !== 0){
                    if (rowItem === this.#gameState[row][col]){
                        rowCount += 1;
                        if (rowCount === 4){
                            return rowItem;
                        }
                    }
                    else {
                        rowItem = this.#gameState[row][col];
                        rowCount = 1;
                    }
                }
                else {
                    rowCount = 1;
                    rowItem = 0;
                }
            }
        }

        // go through the cols looking for 4 in a row
        for (let col = 0; col < 7; col++){
            let rowCount = 1;
            let rowItem = 0;
            for (let row = 0; row < 6; row++){
                if (this.#gameState[row][col] !== 0){
                    if (rowItem === this.#gameState[row][col]){
                        rowCount += 1;
                        if (rowCount === 4){
                            return rowItem;
                        }
                    }
                    else {
                        rowItem = this.#gameState[row][col];
                        rowCount = 1;
                    }
                }
                else {
                    rowCount = 1;
                    rowItem = 0;
                }
            }
        }

        // go through diagonals to find 4 in a row
        // go through down-right diagonals first
        for (let row = 2; row >= 1; row--){
            let rowCount = 1;
            let rowItem = 0;
            let moveRow = row;
            let moveCol = 0;
            while (moveRow <= 5){
                if (this.#gameState[moveRow][moveCol] !== 0){
                    if (rowItem === this.#gameState[moveRow][moveCol]){
                        rowCount += 1;
                        if (rowCount === 4){
                            return rowItem;
                        }
                    }
                    else {
                        rowItem = this.#gameState[moveRow][moveCol];
                        rowCount = 1;
                    }
                }
                else {
                    rowCount = 1;
                    rowItem = 0;
                }
                moveRow ++;
                moveCol ++;
            }
        }
        for (let col = 0; col < 4; col++){
            let rowCount = 1;
            let rowItem = 0;
            let moveRow = 0;
            let moveCol = col;
            while (moveRow <= 5){
                if (this.#gameState[moveRow][moveCol] !== 0){
                    if (rowItem === this.#gameState[moveRow][moveCol]){
                        rowCount += 1;
                        if (rowCount === 4){
                            return rowItem;
                        }
                    }
                    else {
                        rowItem = this.#gameState[moveRow][moveCol];
                        rowCount = 1;
                    }
                }
                else {
                    rowCount = 1;
                    rowItem = 0;
                }
                moveRow ++;
                moveCol ++;
            }
        }

        // go through down-left diagonals first
        for (let row = 2; row >= 1; row--){
            let rowCount = 1;
            let rowItem = 0;
            let moveRow = row;
            let moveCol = 6;
            while (moveRow <= 5){
                if (this.#gameState[moveRow][moveCol] !== 0){
                    if (rowItem === this.#gameState[moveRow][moveCol]){
                        rowCount += 1;
                        if (rowCount === 4){
                            return rowItem;
                        }
                    }
                    else {
                        rowItem = this.#gameState[moveRow][moveCol];
                        rowCount = 1;
                    }
                }
                else {
                    rowCount = 1;
                    rowItem = 0;
                }
                moveRow ++;
                moveCol --;
            }
        }
        for (let col = 6; col >= 3; col--){
            let rowCount = 1;
            let rowItem = 0;
            let moveRow = 0;
            let moveCol = col;
            while (moveRow <= 5){
                if (this.#gameState[moveRow][moveCol] !== 0){
                    if (rowItem === this.#gameState[moveRow][moveCol]){
                        rowCount += 1;
                        if (rowCount === 4){
                            return rowItem;
                        }
                    }
                    else {
                        rowItem = this.#gameState[moveRow][moveCol];
                        rowCount = 1;
                    }
                }
                else {
                    rowCount = 1;
                    rowItem = 0;
                }
                moveRow ++;
                moveCol --;
            }
        }

        return 0;
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
}