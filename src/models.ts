// models.ts
// Інтерфейси та класи (Book, User).
// Використовуємо namespace Models для демонстрації простору імен + експортуємо інтерфейси як модулі.

export interface IBook {
    id: string;               // унікальний ідентифікатор (рядок)
    title: string;
    author: string;
    year: number;             // рік видання (number)
    isbn?: string;
    isBorrowed: boolean;
    borrowerId?: string | null;
}

export interface IUser {
    id: string;               // тільки цифри (валідувати окремо)
    name: string;
    email: string;
    borrowedBooks: string[];  // список id книг
}

/**
 * Namespace для реалізацій класів (щоб продемонструвати використання namespace + модулей)
 * Ви також можете імпортувати класи напряму: import { Models } from './models';
 */
export namespace Models {
    export class Book implements IBook {
        private _id: string;
        private _title: string;
        private _author: string;
        private _year: number;
        private _isbn?: string;
        private _isBorrowed: boolean;
        private _borrowerId?: string | null;

        constructor(data: IBook) {
            this._id = data.id;
            this._title = data.title;
            this._author = data.author;
            this._year = data.year;
            this._isbn = data.isbn;
            this._isBorrowed = data.isBorrowed ?? false;
            this._borrowerId = data.borrowerId ?? null;
        }

        // Геттери (доступ до властивостей через метод)
        get id() { return this._id; }
        get title() { return this._title; }
        get author() { return this._author; }
        get year() { return this._year; }
        get isbn() { return this._isbn; }
        get isBorrowed() { return this._isBorrowed; }
        get borrowerId() { return this._borrowerId ?? null; }

        // Сеттер (тільки для певних полів, інші краще змінювати через спеціальні методи)
        set title(v: string) { this._title = v; }
        set author(v: string) { this._author = v; }
        set isbn(v: string|undefined) { this._isbn = v; }

        // Операції з книгою
        borrow(userId: string): boolean {
            if (this._isBorrowed) return false;
            this._isBorrowed = true;
            this._borrowerId = userId;
            return true;
        }

        giveBack(): boolean {
            if (!this._isBorrowed) return false;
            this._isBorrowed = false;
            this._borrowerId = null;
            return true;
        }

        toJSON(): IBook {
            return {
                id: this._id,
                title: this._title,
                author: this._author,
                year: this._year,
                isbn: this._isbn,
                isBorrowed: this._isBorrowed,
                borrowerId: this._borrowerId ?? null
            };
        }
    }

    export class User implements IUser {
        private _id: string;
        private _name: string;
        private _email: string;
        private _borrowedBooks: string[] = [];

        constructor(data: IUser) {
            this._id = data.id;
            this._name = data.name;
            this._email = data.email;
            this._borrowedBooks = data.borrowedBooks ?? [];
        }

        get id() { return this._id; }
        get name() { return this._name; }
        get email() { return this._email; }
        get borrowedBooks() { return [...this._borrowedBooks]; } // копія

        // Додаємо та видаляємо книгу в списку позичених (повертаємо true/false)
        borrowBook(bookId: string): boolean {
            if (this._borrowedBooks.includes(bookId)) return false;
            if (this._borrowedBooks.length >= 3) return false; // правило: не більше 3-х книг
            this._borrowedBooks.push(bookId);
            return true;
        }

        returnBook(bookId: string): boolean {
            const idx = this._borrowedBooks.indexOf(bookId);
            if (idx === -1) return false;
            this._borrowedBooks.splice(idx, 1);
            return true;
        }

        toJSON(): IUser {
            return {
                id: this._id,
                name: this._name,
                email: this._email,
                borrowedBooks: [...this._borrowedBooks]
            };
        }
    }
}
