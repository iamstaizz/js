// library.ts
// Generic-клас для керування колекціями (книг, користувачів тощо).
// Використовує Storage для персистентності.

import { Storage } from './storage';

export interface Identifiable { id: string }

export class Library<T extends Identifiable> {
    private items: T[] = [];
    private storage: Storage;
    private storageKey: string;

    constructor(storage: Storage, storageKey: string) {
        this.storage = storage;
        this.storageKey = storageKey;
        this.loadFromStorage();
    }

    private loadFromStorage() {
        const loaded = this.storage.load<T[]>(this.storageKey);
        if (Array.isArray(loaded)) {
            this.items = loaded;
        } else {
            this.items = [];
        }
    }

    private persist() {
        this.storage.save<T[]>(this.storageKey, this.items);
    }

    add(item: T): void {
        // простий guard: уникаємо дублювання id
        if (this.items.find(i => i.id === item.id)) {
            throw new Error(`Item with id=${item.id} already exists`);
        }
        this.items.push(item);
        this.persist();
    }

    update(item: T): boolean {
        const idx = this.items.findIndex(i => i.id === item.id);
        if (idx === -1) return false;
        this.items[idx] = item;
        this.persist();
        return true;
    }

    remove(id: string): boolean {
        const idx = this.items.findIndex(i => i.id === id);
        if (idx === -1) return false;
        this.items.splice(idx, 1);
        this.persist();
        return true;
    }

    getAll(): T[] {
        // повертаємо копію масиву
        return [...this.items];
    }

    findById(id: string): T | undefined {
        return this.items.find(i => i.id === id);
    }

    find(predicate: (item: T) => boolean): T[] {
        return this.items.filter(predicate);
    }

    clear(): void {
        this.items = [];
        this.persist();
    }

    // Пагінація (1-based page)
    paginate(page: number = 1, pageSize: number = 10): { data: T[]; total: number; page: number; pageSize: number } {
        const total = this.items.length;
        const start = (page - 1) * pageSize;
        const data = this.items.slice(start, start + pageSize);
        return { data, total, page, pageSize };
    }
}
