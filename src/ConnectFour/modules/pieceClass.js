export class Piece {
    constructor(color, gameX, gameY, boardLeft, boardTop, cellSize){
        this.boardLeft = boardLeft;
        this.boardTop = boardTop;
        this.color = color;
        this.cellsize = cellSize;
        this.x = this.boardLeft + (gameX * this.cellsize) + this.cellsize / 2;
        this.y = this.boardTop + (gameY * this.cellsize) + this.cellsize / 2;
        this.radius = (this.cellsize/2) - 5;
    }
}