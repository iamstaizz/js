// validation.ts
// Окремий модуль для перевірки правильності введених даних (валідації)

export namespace Validation {
    export function validateBook(data: any): string[] {
        const errors: string[] = [];

        if (!data.id || !data.title || !data.author || !data.year) {
            errors.push('Усі поля книги обов’язкові!');
        }

        if (data.year && !/^[0-9]{4}$/.test(data.year)) {
            errors.push('Поле "Рік видання" повинно бути у форматі YYYY!');
        }

        return errors;
    }

    export function validateUser(data: any): string[] {
        const errors: string[] = [];

        if (!data.id || !data.name || !data.email) {
            errors.push('Усі поля користувача обов’язкові!');
        }

        if (data.id && !/^[0-9]+$/.test(data.id)) {
            errors.push('ID користувача повинен містити лише цифри!');
        }

        if (data.email && !/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(data.email)) {
            errors.push('Email має невірний формат!');
        }

        return errors;
    }
}
