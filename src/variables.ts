// Змінні різних типів
const username: string = "Іван";
let age: number = 21;
let isStudent: boolean = true;

let someData: any = { foo: "bar" };
someData = 42; // any дозволяє змінювати типи

console.log("username:", username);
console.log("age:", age);
console.log("isStudent:", isStudent);
console.log("someData:", someData);

const users: string[] = ["Іван", "Оля", "Петро"];
const numbers: number[] = [1, 2, 3, 42];

console.log("users:", users);
console.log("numbers:", numbers);
