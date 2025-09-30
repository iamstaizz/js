export class Circle {
    constructor(radius) {
        this.radius = radius;
    }
    getArea() { return Math.PI * this.radius * this.radius; }
    getPerimeter() { return 2 * Math.PI * this.radius; }
    scale(factor) { this.radius *= factor; }
}
export class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    getArea() { return this.width * this.height; }
    getPerimeter() { return 2 * (this.width + this.height); }
    scale(factor) { this.width *= factor; this.height *= factor; }
}
export class Triangle {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
    getPerimeter() { return this.a + this.b + this.c; }
    getArea() {
        const p = this.getPerimeter() / 2;
        return Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c));
    }
    scale(factor) { this.a *= factor; this.b *= factor; this.c *= factor; }
}
export function demoShapes() {
    console.log("Task 2: Shapes");
    const shapes = [
        new Circle(5),
        new Rectangle(4, 6),
        new Triangle(3, 4, 5),
    ];
    shapes[0].scale(1.2);
    const totalArea = shapes.reduce((sum, s) => sum + s.getArea(), 0);
    const totalPerimeter = shapes.reduce((sum, s) => sum + s.getPerimeter(), 0);
    console.log("Total area =", totalArea.toFixed(2));
    console.log("Total perimeter =", totalPerimeter.toFixed(2));
}
//# sourceMappingURL=shapes.js.map