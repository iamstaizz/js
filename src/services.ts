// services.ts
// Сервіс для Bootstrap-сповіщень

export class NotificationService {
    private containerSelector: string;

    constructor(containerSelector: string = '#notification-area') {
        this.containerSelector = containerSelector;
    }

    show(message: string, type: 'success' | 'danger' | 'info' = 'info'): void {
        const container = document.querySelector(this.containerSelector);
        if (!container) return;

        const div = document.createElement('div');
        div.className = `alert alert-${type} alert-dismissible fade show`;
        div.setAttribute('role', 'alert');
        div.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

        container.appendChild(div);

        // Автоматичне зникнення через 4 секунди
        setTimeout(() => {
            div.classList.remove('show');
            div.classList.add('hide');
            div.remove();
        }, 4000);
    }
}
