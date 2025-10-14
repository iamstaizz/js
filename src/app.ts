// app.ts
import { Models } from './models';
import { Library } from './library';
import { Storage } from './storage';
import { NotificationService } from './services';
import { Validation } from './validation';
import { ModalManager } from './modal';

// Ініціалізація
const storage = new Storage();
const bookLibrary = new Library<Models.Book>(storage, 'books');
const userLibrary = new Library<Models.User>(storage, 'users');
const notifier = new NotificationService();

// Якщо є модальне вікно підтвердження — ініціалізуємо
let confirmModal: ModalManager | null = null;
const modalEl = document.getElementById('confirmModal');
if (modalEl) confirmModal = new ModalManager('confirmModal');

// Оновлення таблиць
function refreshBookTable(): void {
    const tbody = document.querySelector<HTMLTableSectionElement>('#books-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    bookLibrary.getAll().forEach(book => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td>${book.id}</td>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.year}</td>
      <td>${book.isBorrowed ? '📕 Позичена' : '📗 Вільна'}</td>
      <td>
        ${book.isBorrowed
            ? `<button class="btn btn-warning btn-sm" data-action="return" data-id="${book.id}">Повернути</button>`
            : `<button class="btn btn-success btn-sm" data-action="borrow" data-id="${book.id}">Позичити</button>`}
      </td>
    `;
        tbody.appendChild(tr);
    });
}

function refreshUserTable(): void {
    const tbody = document.querySelector<HTMLTableSectionElement>('#users-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    userLibrary.getAll().forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.borrowedBooks.length}</td>
    `;
        tbody.appendChild(tr);
    });
}

// 🟢 Додавання книги
const bookForm = document.querySelector<HTMLFormElement>('#book-form');
bookForm?.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(bookForm);
    const data = {
        id: String(formData.get('bookId')),
        title: String(formData.get('bookTitle')),
        author: String(formData.get('bookAuthor')),
        year: Number(formData.get('bookYear')),
        isBorrowed: false
    };

    const errors = Validation.validateBook(data);
    if (errors.length > 0) {
        errors.forEach(err => notifier.show(err, 'danger'));
        return;
    }

    const newBook = new Models.Book(data);
    try {
        bookLibrary.add(newBook);
        notifier.show('Книгу успішно додано!', 'success');
        bookForm.reset();
        refreshBookTable();
    } catch {
        notifier.show('Помилка: така книга вже існує.', 'danger');
    }
});

// 🟢 Додавання користувача
const userForm = document.querySelector<HTMLFormElement>('#user-form');
userForm?.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(userForm);
    const data = {
        id: String(formData.get('userId')),
        name: String(formData.get('userName')),
        email: String(formData.get('userEmail')),
        borrowedBooks: []
    };

    const errors = Validation.validateUser(data);
    if (errors.length > 0) {
        errors.forEach(err => notifier.show(err, 'danger'));
        return;
    }

    const newUser = new Models.User(data);
    try {
        userLibrary.add(newUser);
        notifier.show('Користувача успішно додано!', 'success');
        userForm.reset();
        refreshUserTable();
    } catch {
        notifier.show('Помилка: такий користувач вже існує.', 'danger');
    }
});

// 🟡 Позичити / повернути книгу
document.addEventListener('click', e => {
    const target = e.target as HTMLElement;
    if (target.tagName !== 'BUTTON') return;

    const action = target.getAttribute('data-action');
    const bookId = target.getAttribute('data-id');
    if (!action || !bookId) return;

    const book = bookLibrary.findById(bookId);
    if (!book) return;

    if (action === 'borrow') {
        const userId = prompt('Введіть ID користувача:');
        if (!userId) return;

        const user = userLibrary.findById(userId);
        if (!user) {
            notifier.show('Користувача з таким ID не знайдено!', 'danger');
            return;
        }

        if (user.borrowedBooks.length >= 3) {
            notifier.show('Цей користувач уже має 3 книги!', 'danger');
            return;
        }

        if (book.isBorrowed) {
            notifier.show('Книга вже позичена!', 'danger');
            return;
        }

        // Якщо хочеш підтвердження через модальне вікно:
        if (confirmModal) {
            confirmModal.setContent('Підтвердження', `Позичити книгу "${book.title}" користувачу ${user.name}?`);
            confirmModal.onConfirm(() => {
                user.borrowBook(book.id);
                book.borrow(user.id);
                userLibrary.update(user);
                bookLibrary.update(book);
                notifier.show('Книга успішно позичена!', 'success');
                refreshBookTable();
                refreshUserTable();
            });
            confirmModal.open();
            return;
        }

        // Якщо без модального — одразу позичаємо
        user.borrowBook(book.id);
        book.borrow(user.id);
        userLibrary.update(user);
        bookLibrary.update(book);
        notifier.show('Книга успішно позичена!', 'success');
    }

    if (action === 'return') {
        const userId = book.borrowerId;
        if (!userId) {
            notifier.show('Цю книгу ніхто не позичав!', 'danger');
            return;
        }

        const user = userLibrary.findById(userId);
        if (user && user.returnBook(book.id)) {
            book.giveBack();
            userLibrary.update(user);
            bookLibrary.update(book);
            notifier.show('Книгу повернуто!', 'info');
        } else {
            notifier.show('Помилка при поверненні книги!', 'danger');
        }
    }

    refreshBookTable();
    refreshUserTable();
});

// 🔄 Завантаження списків при старті
window.addEventListener('DOMContentLoaded', () => {
    refreshBookTable();
    refreshUserTable();
});
