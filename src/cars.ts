export abstract class Car {
  public brand: string;
  public model: string;

  protected year: number;

  #vin: string;

  constructor(brand: string, model: string, year: number, vin: string) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.#vin = vin;
  }

  getVinMasked(): string {
    return this.#vin.slice(0, 3) + "***********";
  }

  abstract describe(): string;
}

export class BMW extends Car {
  constructor(model: string, year: number, vin: string, private packageName: string = "M Sport") {
    super("BMW", model, year, vin);
  }
  describe(): string {
    return `[BMW] ${this.model} (${this.year}) – package: ${this.packageName}, vin: ${this.getVinMasked()}`;
  }
}

export class Audi extends Car {
  constructor(model: string, year: number, vin: string, protected quattro: boolean = true) {
    super("Audi", model, year, vin);
  }
  describe(): string {
    return `[Audi] ${this.model} (${this.year}) – quattro=${this.quattro}, vin: ${this.getVinMasked()}`;
  }
}

export class Toyota extends Car {
  constructor(model: string, year: number, vin: string, public hybrid: boolean = false) {
    super("Toyota", model, year, vin);
  }
  describe(): string {
    return `[Toyota] ${this.model} (${this.year}) – hybrid=${this.hybrid}, vin: ${this.getVinMasked()}`;
  }
}

export function demoCars(): void {
  console.log("Task 3: Cars");
  const cars: Car[] = [
    new BMW("M5", 2022, "BM1234UA", "Competition"),
    new BMW("X7", 2023, "BM5678UA"),
    new Audi("A8", 2021, "AU4321DE", true),
    new Audi("Q7", 2020, "AU8765DE", false),
    new Toyota("Corolla", 2019, "TY1122JP", true),
    new Toyota("Highlander", 2024, "TY9988JP", false),
  ];

  for (const c of cars) console.log(c.describe());
}
