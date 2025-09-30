export interface Payable {
  pay(): void;
}

export abstract class Employee {
  constructor(
      public name: string,
      public age: number,
      protected salary: number,
  ) {}
  abstract getAnnualBonus(): number;
}

export class Developer extends Employee implements Payable {
  getAnnualBonus(): number { return this.salary * 0.10; } // 10%
  pay(): void { console.log(`Paying salary to Developer ${this.name}`); }
}

export class Manager extends Employee implements Payable {
  getAnnualBonus(): number { return this.salary * 0.20; } // 20%
  pay(): void { console.log(`Paying salary to Manager ${this.name}`); }
}

// Демо
export function demoEmployees(): void {
  console.log("Task 4: Employees ");
  const staff: Employee[] = [
    new Developer("Valentyn", 28, 3000),
    new Developer("Oleh", 31, 3500),
    new Manager("Svitlana", 35, 5000),
  ];

  let totalBonus = 0;
  for (const e of staff) {
    totalBonus += e.getAnnualBonus();
  }
  console.log("Total annual bonus =", totalBonus);

  for (const e of staff) {
    if ("pay" in e && typeof (e as any).pay === "function") (e as any).pay();
  }
}

