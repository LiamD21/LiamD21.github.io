export class GameBoard{
    constructor(width, height, cellSize, ctx){
        this.context = ctx;
        this.width = width;
        this.height = height;
        this.cellsize = cellSize;
        this.gameState = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]];
        this.turn = 1;

        this.drawBoard();
    }

    drawBoard(){
        let boardTop = this.cellsize;
        let boardLeft = this.width/2-(this.cellsize*3.5);

        // draw the main blue square for the board
        this.context.fillStyle = "#1138f6"
        this.context.fillRect(boardLeft, boardTop, this.cellsize*7, this.cellsize*6);

        // draw all the cells
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 6; j++) {

                // pick the correct color to draw
                let color;
                if (this.gameState[j][i] === 1){
                    color = "red";
                }
                else if (this.gameState[j][i] === 2){
                    color = "yellow";
                }
                else {
                    color = "white"
                }

                // draw a circle on the correct cell
                this.drawCircle(color, boardLeft + (i * this.cellsize) + this.cellsize / 2, boardTop + (j * this.cellsize) + this.cellsize / 2, this.cellsize / 2 - 5);
            }
        }
    }

    drawCircle(color, x, y, rad){
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.arc(x, y, rad, 0, Math.PI*2, false);
        this.context.fill();
    }

    playPiece(player, pieceCol){
        let piece = 0;
        if (player === 1){
            piece = 1;
        }
        else if (player === 2){
            piece = 2;
        }

        let colIndex = 5;
        while (colIndex >= 0){
            if (this.gameState[colIndex][pieceCol] === 0){
                this.gameState[colIndex][pieceCol] = piece;
                colIndex = -1;
            }
            else{
                colIndex -=1;
            }
        }

        this.drawBoard();
    }
}