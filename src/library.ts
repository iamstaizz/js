export interface LibraryItem {
  title: string;
  author: string;
  borrow(): void;
  isBorrowed(): boolean;
}

abstract class BaseItem implements LibraryItem {
  private borrowed = false;
  constructor(public title: string, public author: string) {}
  borrow(): void { this.borrowed = true; }
  isBorrowed(): boolean { return this.borrowed; }
}

export class Book extends BaseItem {
  constructor(title: string, author: string, public pages: number) { super(title, author); }
}

export class Magazine extends BaseItem {
  constructor(title: string, author: string, public issue: number) { super(title, author); }
}

export class DVD extends BaseItem {
  constructor(title: string, author: string, public durationMin: number) { super(title, author); }
}

export class Library {
  private items: LibraryItem[] = [];
  addItem(item: LibraryItem): void { this.items.push(item); }
  findItemByName(name: string): LibraryItem | undefined {
    return this.items.find(i => i.title.toLowerCase() == name.toLowerCase());
  }
  listAvailable(): LibraryItem[] {
    return this.items.filter(i => !i.isBorrowed());
  }
}

export function demoLibrary(): void {
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
