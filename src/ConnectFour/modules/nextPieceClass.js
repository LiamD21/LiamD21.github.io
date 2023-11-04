export class NextPiece{
    #centerX
    #centerY
    #radius
    #color
    #context

    constructor(color, radius, height, ctx) {
        this.#color = color;
        this.#radius = radius;
        this.#context = ctx;
        this.#centerX = 3 * this.#radius;
        this.#centerY = height - (3 * this.#radius);

        this.#draw();
    }

    /**
     * draws a circle at the class's coordinates and radius
     */
    #draw(){
        this.#context.fillStyle = this.#color;
        this.#context.beginPath();
        this.#context.arc(this.#centerX, this.#centerY, this.#radius, 0, Math.PI*2, false);
        this.#context.fill();
    }

    move(){

    }
}