"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)({ sigint: true });
const sizePrice = {
    small: 10,
    large: 25,
};
const toppingPrice = {
    chocolate: 5,
    caramel: 6,
    berries: 10,
};
function calculateIceCream() {
    // 1. Вибір розміру
    let sizeInput = prompt("Оберіть розмір морозива (small/large): ").toLowerCase();
    while (sizeInput !== "small" && sizeInput !== "large") {
        console.log("Помилка: введіть 'small' або 'large'");
        sizeInput = prompt("Оберіть розмір морозива (small/large): ").toLowerCase();
    }
    const size = sizeInput;
    // 2. Вибір начинок
    let toppingsInput = prompt("Введіть начинку(и) через кому (chocolate, caramel, berries): ");
    let toppings = toppingsInput
        .split(",")
        .map(t => t.trim().toLowerCase())
        .filter((t) => ["chocolate", "caramel", "berries"].includes(t));
    while (toppings.length === 0) {
        console.log("Помилка: потрібно вибрати хоча б одну правильну начинку!");
        toppingsInput = prompt("Введіть начинку(и) через кому (chocolate, caramel, berries): ");
        toppings = toppingsInput
            .split(",")
            .map(t => t.trim().toLowerCase())
            .filter((t) => ["chocolate", "caramel", "berries"].includes(t));
    }
    // 3. Чи додати маршмелоу
    const marshInput = prompt("Додати маршмелоу? (yes/no): ").toLowerCase();
    const marshmallow = marshInput === "yes";
    // 4. Обчислення ціни
    let total = 0;
    total += sizePrice[size];
    toppings.forEach(t => total += toppingPrice[t]);
    if (marshmallow)
        total += 5;
    // 5. Вивід
    console.log(`Ваше морозиво: ${size} стаканчик`);
    console.log(`Начинки: ${toppings.join(", ")}`);
    console.log(`Маршмелоу: ${marshmallow ? "так" : "ні"}`);
    console.log(`Вартість морозива: ${total} грн`);
}
calculateIceCream();
//# sourceMappingURL=icecream.js.map