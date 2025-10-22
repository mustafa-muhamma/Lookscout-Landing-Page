if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/service-worker.js')
            .then((reg) => console.log('✅ Service Worker registered:', reg.scope))
            .catch((err) => console.error('❌ Service Worker failed:', err));
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const notifyBtn = document.getElementById('notifyBtn');

    if (notifyBtn && 'Notification' in window) {
        notifyBtn.addEventListener('click', async () => {
            const permission = await Notification.requestPermission();

            if (permission === 'granted') {
                new Notification('Welcome back!', {
                    body: 'Thanks for visiting our PWA 🎉',
                    icon: '/assets/images/Company Logo.png',
                });
            } else {
                alert('Notification permission denied.');
            }
        });
    }
});