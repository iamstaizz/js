export interface IAnimal {
  name: string;
  age?: number;
  habitat?: string;
  move(): string;
}

export class Cat implements IAnimal {
  constructor(public name: string, public age?: number, public habitat: string = "house") {}
  move(): string { return "walks"; }
  meow(): string { return "meow"; }
}

export class Bird implements IAnimal {
  constructor(public name: string, public age?: number, public habitat: string = "air") {}
  move(): string { return "flies"; }
  chirp(): string { return "tweet"; }
}

export class Fish implements IAnimal {
  constructor(public name: string, public age?: number, public habitat: string = "water") {}
  move(): string { return "swims"; }
  bubble(): string { return "bloop"; }
}

export function demoAnimals(): void {
  console.log("Task 1: Animals");
  const zoo: IAnimal[] = [
    new Cat("Val", 2),
    new Bird("Sunny"),
    new Fish("Coral", 1, "ocean"),
  ];
  for (const a of zoo) {
    console.log(`${a.name} ${a.age ?? "?"}y/o – ${a.move()} in ${a.habitat ?? "?"}`);
  }
}
