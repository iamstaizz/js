// Функція з параметром за замовчуванням
function greet(username: string, times: number = 1): string {
    let result = "";
    for (let i = 0; i < times; i++) {
        result += `Привіт, ${username}! `;
    }
    return result;
}


console.log(greet("Оля"));        // times не передано => 1
console.log(greet("Петро", 3));   // times = 3
