/**
 * Global Toast Notification System
 *
 * Usage:
 *   - Call `showToast('Your message here', 'success');`
 *   - Types: 'success', 'error', 'info' (default is info if not specified)
 *
 * Toasts will appear at the bottom center of the screen.
 */

(function() {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    /**
     * Displays a toast notification.
     * @param {string} message The message to display in the toast.
     * @param {'success' | 'error' | 'info'} [type='info'] The type of toast (success, error, info).
     * @param {number} [duration=3000] The duration (in milliseconds) before the toast hides.
     */
    window.showToast = function(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.classList.add('toast', type);
        toast.textContent = message;

        toastContainer.appendChild(toast);

        // Force reflow to enable transition
        void toast.offsetWidth;

        toast.classList.add('show');

        // Auto-hide after duration
        setTimeout(() => {
            toast.classList.remove('show');
            toast.classList.add('hide');

            // Remove toast from DOM after transition
            toast.addEventListener('transitionend', () => {
                toast.remove();
            }, { once: true });
        }, duration);
    };
})(); 