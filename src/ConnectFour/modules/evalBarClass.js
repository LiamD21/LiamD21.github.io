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
        this.#draw();
    }

    #draw(){
        // draw the bar itself
        this.#ctx.fillStyle = "red";
        this.#ctx.fillRect(this.#width*19/20 - 15, this.#height/6, this.#width/20, this.#height*4/6);
        this.#ctx.fillStyle = "yellow";
        let bottomBarY = (this.#height/6 + ((10+this.#evalScore)/20)*(this.#height*4/6));
        this.#ctx.fillRect(this.#width*19/20 - 15, bottomBarY, this.#width/20 ,this.#height*5/6 - bottomBarY);

        // add score text to the bar
        this.#ctx.fillStyle = "black";
        this.#ctx.font = "20px sans-serif";
        this.#ctx.textAlign = "center";

        if (this.#evalScore === 0) {
            this.#ctx.fillText("0", this.#width - 15 - this.#width / 40, this.#height / 6 + 25);
            this.#ctx.fillText("0", this.#width - 15 - this.#width / 40, this.#height * 5 / 6 - 25);
        }
        else if (this.#evalScore > 0){
            this.#ctx.fillText(this.#evalScore, this.#width - 15 - this.#width / 40, this.#height / 6 + 25);
        }
        else {
            let num = this.#evalScore * -1;
            this.#ctx.fillText(num.toString(), this.#width - 15 - this.#width / 40, this.#height * 5 / 6 - 25);
        }
    }
}