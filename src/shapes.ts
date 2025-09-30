export interface Shape {
  getArea(): number;
  getPerimeter(): number;
  scale(factor: number): void;
}

export class Circle implements Shape {
  constructor(public radius: number) {}
  getArea(): number { return Math.PI * this.radius * this.radius; }
  getPerimeter(): number { return 2 * Math.PI * this.radius; }
  scale(factor: number): void { this.radius *= factor; }
}

export class Rectangle implements Shape {
  constructor(public width: number, public height: number) {}
  getArea(): number { return this.width * this.height; }
  getPerimeter(): number { return 2 * (this.width + this.height); }
  scale(factor: number): void { this.width *= factor; this.height *= factor; }
}

export class Triangle implements Shape {
  constructor(public a: number, public b: number, public c: number) {}
  getPerimeter(): number { return this.a + this.b + this.c; }
  getArea(): number {
    const p = this.getPerimeter() / 2;
    return Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c));
  }
  scale(factor: number): void { this.a *= factor; this.b *= factor; this.c *= factor; }
}

export function demoShapes(): void {
  console.log("Task 2: Shapes");
  const shapes: Shape[] = [
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
