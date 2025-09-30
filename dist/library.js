class BaseItem {
    constructor(title, author) {
        this.title = title;
        this.author = author;
        this.borrowed = false;
    }
    borrow() { this.borrowed = true; }
    isBorrowed() { return this.borrowed; }
}
export class Book extends BaseItem {
    constructor(title, author, pages) {
        super(title, author);
        this.pages = pages;
    }
}
export class Magazine extends BaseItem {
    constructor(title, author, issue) {
        super(title, author);
        this.issue = issue;
    }
}
export class DVD extends BaseItem {
    constructor(title, author, durationMin) {
        super(title, author);
        this.durationMin = durationMin;
    }
}
export class Library {
    constructor() {
        this.items = [];
    }
    addItem(item) { this.items.push(item); }
    findItemByName(name) {
        return this.items.find(i => i.title.toLowerCase() == name.toLowerCase());
    }
    listAvailable() {
        return this.items.filter(i => !i.isBorrowed());
    }
}
export function demoLibrary() {
    console.log(" Task 6: Library ");
    const lib = new Library();
    const b = new Book("Refactoring", "M. Fowler", 450);
    const m = new Magazine("Frontend Weekly", "Editorial Team", 58);
    const d = new DVD("JavaScript Mastery", "Video Academy", 120);
    lib.addItem(b);
    lib.addItem(m);
    lib.addItem(d);
    b.borrow();
    console.log("Available items:");
    for (const it of lib.listAvailable()) {
        console.log(`- ${it.title} by ${it.author}`);
    }
}
//# sourceMappingURL=library.js.map