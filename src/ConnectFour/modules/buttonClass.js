export class Button {
    constructor(ctx, x, y, height, width, text, color) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.text = text;
        this.color = color;
    }

    /**
     * calculate and return the center coordinates of the button
     * @returns {*[]} represents coordinates [x,y]
     */
    getCenterXY(){
        return [this.x + (this.width/2), this.y + (this.height/2)];
    }

    /**
     * Draws a button on the canvas given the attributes for the class
     */
    draw(){
        // drawing the rectangle
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);

        // drawing the button text
        this.ctx.fillStyle = "#000000";
        this.ctx.textAlign = "center";
        this.ctx.font = "50px sans-serif";
        this.ctx.fillText(this.text, this.getCenterXY()[0], this.getCenterXY()[1] + this.height/6, this.width);

        // Drawing the button outline
        this.ctx.lineWidth = 10;
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}