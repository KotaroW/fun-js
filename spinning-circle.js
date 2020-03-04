/******************************
draw a spinning circle
usage: new SpinningCircle ([arg1, [arg2...]]); instance.draw(); SpinningCircle.stop(instance.timer);
******************************/


class SpinningCircle {
    constructor (
        canvasElement,
        startAngle,
        maxAngle,
        angleOffset,
        radius,
        xPos,
        yPos,
        gradientCallback
    ) {
        this.canvasElement = (canvasElement && canvasElement.constructor.name.toLocaleLowerCase() == "htmlcanvaselement") ? canvasElement : this.getCanvasElement();
        this.currentAngle = startAngle ? startAngle : 0;
        this.maxAngle = maxAngle ? maxAngle : 200;
        this.angleOffset = angleOffset ? angleOffset : 180;
        this.radius = radius ? radius : 25;
        this.xPos = xPos ? xPos : 50;
        this.yPos = yPos ? yPos : 50;
        this.context = this.canvasElement.getContext("2d");
        this.gradientCallback = gradientCallback ? gradientCallback : this.doGradient; 
        this.timer = null;
    }
    
    draw (that) {
        if (!that) {
            that = this;
        }
		that.context.clearRect (0, 0, 100, 100);		// 3rd and 4th arguments are arbitrary.
		that.context.beginPath ();

		that.currentAngle = (that.currentAngle == that.maxAngle) ? 0 : ++that.currentAngle;
		that.context.arc(that.xPos, that.yPos, that.radius, Math.PI * (that.currentAngle / 100 ), Math.PI * ( (that.currentAngle + that.angleOffset) / 100 ), false );

		that.gradientCallback();
        that.timer = window.setTimeout (
            function () {
                that.draw(that);
            },
        15);

	}
    
    getCanvasElement() {
        var canvasElement = document.querySelector("canvas");
        
        if (canvasElement) {
            return canvasElement;
        }
        
        canvasElement = document.createElement("canvas");
        document.body.appendChild(canvasElement);
        
        return canvasElement;
    }
    
    doGradient(that) {
        this.context.lineWidth = 2;
		var gradient = this.context.createLinearGradient ( 0, 0, 100, 100 );		// arbitrary values but should be as big as the canvas size
		gradient.addColorStop ( 0, "#369" );
		gradient.addColorStop ( 1, "#f9f" );

		this.context.shadowBlur = 1;
		this.context.shadowColor = "#fff";

		this.context.strokeStyle = gradient;
		this.context.stroke ();
    }
    
    static stop(timer) {
        window.clearTimeout(timer);
    }
    
}
