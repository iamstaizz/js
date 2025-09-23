"use strict";
// Функція з параметром за замовчуванням
function greet(username, times = 1) {
    let result = "";
    for (let i = 0; i < times; i++) {
        result += `Привіт, ${username}! `;
    }
    return result;
}
// Виклики функції
console.log(greet("Оля")); // times не передано => 1
console.log(greet("Петро", 3)); // times = 3
//# sourceMappingURL=functions.js.map