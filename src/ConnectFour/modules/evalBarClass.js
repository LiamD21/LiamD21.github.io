export class evalBar{
    // private class attributes
    #evalScore;
    #width;
    #height;
    #canvas;
    #ctx;

    constructor(canvas, ctx) {
        this.#ctx = ctx;
        this.#canvas = canvas;
        this.#height = this.#canvas.height;
        this.#width = this.#canvas.width;
        this.#evalScore = 0;
    }

    /**
     * sets the eval score
     * @param score the new score
     */
    setEvalScore(score){
        this.#evalScore = score;
    }

    draw(){
        this.#ctx.fillStyle = "red";
        this.#ctx.fillRect(10, this.#height/5, this.#width/15, this.#height*3/5);
        this.#ctx.fillStyle = "yellow";
        let bottomBarY = (this.#height/5 + ((10+this.#evalScore)/20)*(this.#height*3/5));
        this.#ctx.fillRect(10, bottomBarY, this.#width/15 ,this.#height*4/5 - bottomBarY);
    }
}