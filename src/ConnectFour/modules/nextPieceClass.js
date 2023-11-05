export class NextPiece{
    #centerX
    #centerY
    #radius
    #color
    #context
    #initialCenterX
    #initialCenterY

    constructor(color, radius, height, ctx) {
        this.#color = color;
        this.#radius = radius;
        this.#context = ctx;
        this.#centerX = 3 * this.#radius;
        this.#centerY = height - (3 * this.#radius);

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

    move(newX, newY){
        this.#context.clearRect(this.#centerX - this.#radius, this.#centerY - this.#radius, this.#radius*2, this.#radius*2);
        this.#draw(newX, newY);
        this.#centerY = newY;
        this.#centerX = newX;
    }

    reset(){

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