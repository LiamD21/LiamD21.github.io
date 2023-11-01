export default class Button {
    constructor(ctx, x, y, height, width, text, color) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.text = text;
        this.color = color;
    }

    getCenterXY(){
        return [this.x + (this.width/2), this.y + (this.height/2)];
    }

    draw(){
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = "#000000";
        this.ctx.textAlign = "center";
        this.ctx.font = "10px";
        this.ctx.lineWidth = 10;
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}