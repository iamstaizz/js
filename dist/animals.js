export class Cat {
    constructor(name, age, habitat = "house") {
        this.name = name;
        this.age = age;
        this.habitat = habitat;
    }
    move() { return "walks"; }
    meow() { return "meow"; }
}
export class Bird {
    constructor(name, age, habitat = "air") {
        this.name = name;
        this.age = age;
        this.habitat = habitat;
    }
    move() { return "flies"; }
    chirp() { return "tweet"; }
}
export class Fish {
    constructor(name, age, habitat = "water") {
        this.name = name;
        this.age = age;
        this.habitat = habitat;
    }
    move() { return "swims"; }
    bubble() { return "bloop"; }
}
export function demoAnimals() {
    console.log("Task 1: Animals");
    const zoo = [
        new Cat("Val", 2),
        new Bird("Sunny"),
        new Fish("Coral", 1, "ocean"),
    ];
    for (const a of zoo) {
        console.log(`${a.name} ${a.age ?? "?"}y/o – ${a.move()} in ${a.habitat ?? "?"}`);
    }
}
//# sourceMappingURL=animals.js.map