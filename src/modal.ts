// modal.ts
// Простий контролер для модальних вікон Bootstrap
// (використовується при підтвердженні дій або показі повідомлень)

export class ModalManager {
    private modalElement: HTMLElement | null = null;
    private modalInstance: any = null;

    constructor(modalId: string) {
        this.modalElement = document.getElementById(modalId);
        if (this.modalElement) {
            // @ts-ignore
            this.modalInstance = new bootstrap.Modal(this.modalElement);
        }
    }

    open(): void {
        if (this.modalInstance) {
            this.modalInstance.show();
        }
    }

    close(): void {
        if (this.modalInstance) {
            this.modalInstance.hide();
        }
    }

    // Динамічне оновлення контенту в модалі (текст заголовка + повідомлення)
    setContent(title: string, body: string): void {
        if (!this.modalElement) return;
        const titleEl = this.modalElement.querySelector('.modal-title');
        const bodyEl = this.modalElement.querySelector('.modal-body');
        if (titleEl) titleEl.textContent = title;
        if (bodyEl) bodyEl.textContent = body;
    }

    // Виконати колбек при підтвердженні дії
    onConfirm(callback: () => void): void {
        if (!this.modalElement) return;
        const btn = this.modalElement.querySelector<HTMLButtonElement>('#modalConfirmBtn');
        if (!btn) return;

        btn.onclick = () => {
            callback();
            this.close();
        };
    }
}
