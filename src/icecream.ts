import promptSync from "prompt-sync";

const prompt = promptSync({ sigint: true });

type Size = "small" | "large";
type Topping = "chocolate" | "caramel" | "berries";

const sizePrice: Record<Size, number> = {
    small: 10,
    large: 25,
};

const toppingPrice: Record<Topping, number> = {
    chocolate: 5,
    caramel: 6,
    berries: 10,
};

function calculateIceCream(): void {
    // 1. Вибір розміру
    let sizeInput = prompt("Оберіть розмір морозива (small/large): ").toLowerCase();
    while (sizeInput !== "small" && sizeInput !== "large") {
        console.log("Помилка: введіть 'small' або 'large'");
        sizeInput = prompt("Оберіть розмір морозива (small/large): ").toLowerCase();
    }
    const size = sizeInput as Size;

    // 2. Вибір начинок
    let toppingsInput = prompt("Введіть начинку(и) через кому (chocolate, caramel, berries): ");
    let toppings = toppingsInput
        .split(",")
        .map(t => t.trim().toLowerCase())
        .filter((t): t is Topping => ["chocolate", "caramel", "berries"].includes(t));

    while (toppings.length === 0) {
        console.log("Помилка: потрібно вибрати хоча б одну правильну начинку!");
        toppingsInput = prompt("Введіть начинку(и) через кому (chocolate, caramel, berries): ");
        toppings = toppingsInput
            .split(",")
            .map(t => t.trim().toLowerCase())
            .filter((t): t is Topping => ["chocolate", "caramel", "berries"].includes(t));
    }

    // 3. Чи додати маршмелоу
    const marshInput = prompt("Додати маршмелоу? (yes/no): ").toLowerCase();
    const marshmallow = marshInput === "yes";
    let total = 0;
    total += sizePrice[size];
    toppings.forEach(t => total += toppingPrice[t]);
    if (marshmallow) total += 5;


    console.log(`Ваше морозиво: ${size} стаканчик`);
    console.log(`Начинки: ${toppings.join(", ")}`);
    console.log(`Маршмелоу: ${marshmallow ? "так" : "ні"}`);
    console.log(`Вартість морозива: ${total} грн`);
}

calculateIceCream();
