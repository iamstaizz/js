// storage.ts
// Простий wrapper поверх localStorage для збереження/завантаження об'єктів.
// Використовуємо префікс для ключів, щоб не перетинатись з іншими даними.

export class Storage {
    private prefix: string;

    constructor(prefix: string = 'lab3') {
        this.prefix = prefix;
    }

    private fullKey(key: string): string {
        return `${this.prefix}:${key}`;
    }

    save<T>(key: string, data: T): void {
        try {
            const json = JSON.stringify(data);
            localStorage.setItem(this.fullKey(key), json);
        } catch (e) {
            console.error('Storage.save error', e);
            throw e;
        }
    }

    load<T>(key: string): T | null {
        const raw = localStorage.getItem(this.fullKey(key));
        if (!raw) return null;
        try {
            return JSON.parse(raw) as T;
        } catch (e) {
            console.error('Storage.load parse error', e);
            return null;
        }
    }

    remove(key: string): void {
        localStorage.removeItem(this.fullKey(key));
    }

    // Очищає всі ключі з префіксом (обережно)
    clearAll(): void {
        const prefix = this.prefix + ':';
        const toRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k && k.startsWith(prefix)) toRemove.push(k);
        }
        toRemove.forEach(k => localStorage.removeItem(k));
    }

    // Допоміжні: отримати всі ключі з префіксом
    keysWithPrefix(): string[] {
        const prefix = this.prefix + ':';
        const keys: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k && k.startsWith(prefix)) keys.push(k.substring(prefix.length));
        }
        return keys;
    }
}
