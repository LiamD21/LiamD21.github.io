export class NextPiece{
    #centerX
    #centerY
    #radius
    #color
    #context
    #initialCenterX
    #initialCenterY
    #boardTop
    #boardBottom
    #boardLeft
    #boardRight
    #prevSide

    constructor(color, radius, height, ctx, boardLeft, boardRight, boardTop, boardBottom) {
        this.#color = color;
        this.#radius = radius;
        this.#context = ctx;
        this.#centerX = 3 * this.#radius;
        this.#centerY = height - (3 * this.#radius);
        this.#boardBottom = boardBottom;
        this.#boardRight = boardRight;
        this.#boardTop = boardTop;
        this.#boardLeft = boardLeft;

        this.#initialCenterX = this.#centerX;
        this.#initialCenterY = this.#centerY;

        this.#draw(this.#centerX, this.#centerY);
    }

    /**
     * draws a circle at the class's coordinates and radius
     */
    #draw(x, y){
        this.#context.fillStyle = this.#color;
        this.#context.beginPath();
        this.#context.arc(x, y, this.#radius, 0, Math.PI*2, false);
        this.#context.fill();
    }

    /**
     * moves a piece around the board
     * @param newX the new x coordinates of the piece
     * @param newY the new y coordinates of the piece
     */
    move(newX, newY){
        // clear old spot
        this.#context.clearRect(this.#centerX - this.#radius - 5, this.#centerY - this.#radius - 5, this.#radius*2 + 10, this.#radius*2 + 10);

        // check if the object is being dragged inside the board
        let inBoard = newX + this.#radius + 6 > this.#boardLeft && newX - this.#radius - 6 < this.#boardRight && newY + this.#radius + 6 > this.#boardTop && newY - this.#radius - 6 < this.#boardBottom;

        if (newX < this.#boardLeft && !inBoard){
            this.#prevSide = "left";
        }
        else if (newX > this.#boardRight && !inBoard){
            this.#prevSide = "right"
        }
        else if (newY < this.#boardTop && !inBoard){
            this.#prevSide = "top";
        }
        else if (newY > this.#boardBottom && !inBoard){
            this.#prevSide = "bottom";
        }

        // prevent dragging over the board - must go around
        if (inBoard){
            switch (this.#prevSide){
                case "left":
                    newX = this.#boardLeft - this.#radius - 6;
                    break;
                case "right":
                    newX = this.#boardRight + this.#radius + 6;
                    break;
                case "top":
                    newY = this.#boardTop - this.#radius - 6;
                    break;
                case "bottom":
                    newY = this.#boardBottom + this.#radius + 6;
            }
        }

        this.#draw(newX, newY);
        this.#centerY = newY;
        this.#centerX = newX;
    }

    /**
     * Resets the piece from its current location to its original location
     */
    reset(){
        this.#context.clearRect(this.#centerX - this.#radius, this.#centerY - this.#radius, this.#radius*2 + 5, this.#radius*2 + 5);
        this.#centerY = this.#initialCenterY;
        this.#centerX = this.#initialCenterX;
        this.#draw(this.#centerX, this.#centerY);
    }

    /**
     * checks to see if a given pair of points is inside or outside the circle
     * @param x the given x coordinate
     * @param y the given y coordinate
     * @return {boolean} true if the given x, y is inside the circle
     */
    checkIntersect(x, y){
        let dx = this.#centerX - x;
        let dy = this.#centerY - y;

        let hyp = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

        return hyp <= this.#radius;
    }
}