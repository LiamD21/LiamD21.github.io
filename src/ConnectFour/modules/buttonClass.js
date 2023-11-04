export class Button {
    // defining private class attributes
    #context
    #left
    #top
    #height
    #width
    #color
    #text

    constructor(ctx, x, y, height, width, text, color) {
        this.#context = ctx;
        this.#left = x;
        this.#top = y;
        this.#height = height;
        this.#width = width;
        this.#text = text;
        this.#color = color;

        this.drawNew();
    }

    /**
     * calculate and return the center coordinates of the button
     * @returns {*[]} represents coordinates [x,y]
     * @private only for internal use when drawing
     */
    #getCenterXY(){
        return [this.#left + (this.#width/2), this.#top + (this.#height/2)];
    }

    /**
     * Draws a button on the canvas given the attributes for the class
     * @private
     */
    #draw(fillColor){
        // drawing the rectangle
        this.#context.fillStyle = fillColor;
        this.#context.fillRect(this.#left, this.#top, this.#width, this.#height);

        // drawing the button text
        this.#context.fillStyle = "#000000";
        this.#context.textAlign = "center";
        this.#context.font = "50px sans-serif";
        this.#context.fillText(this.#text, this.#getCenterXY()[0], this.#getCenterXY()[1] + this.#height/6, this.#width);

        // Drawing the button outline
        this.#context.lineWidth = 10;
        this.#context.strokeRect(this.#left, this.#top, this.#width, this.#height);
    }

    /**
     * redraws an existing button with a new fill color. Useful for interactive UIs
     * @param newColor the string value of the new color to use for the button
     * uses draw() method
     */
    recolor(newColor){
        this.#draw(newColor);
    }

    /**
     * draws a newly created button on the canvas using the given specifications and the original color
     * uses draw() method
     */
    drawNew(){
        this.#draw(this.#color);
    }

    /**
     * getter method for the button's width attribute
     * @returns {*} the integer width of the button
     */
    getWidth(){
        return this.#width;
    }

    /**
     * getter method for the button's height attribute
     * @returns {*} the integer height of the button
     */
    getHeight(){
        return this.#height;
    }

    /**
     * getter method for the button's left attribute
     * @returns {*} the integer x coordinates of the button top left
     */
    getX(){
        return this.#left;
    }

    /**
     * getter method for the button's top attribute
     * @returns {*} the integer y coordinates of the button top left
     */
    getY(){
        return this.#top;
    }
}