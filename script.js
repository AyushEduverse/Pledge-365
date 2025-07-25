// Dark Mode Toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const body = document.body;

// Check for saved dark mode preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    darkModeToggle.classList.add('active');
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    darkModeToggle.classList.toggle('active');

    // Save the preference
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Bottom Navigation Active State
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');

    // Function to set the active nav item
    const setActiveNavItem = () => {
        const currentPath = window.location.pathname;

        navItems.forEach(item => {
            // Remove active class from all items initially
            item.classList.remove('active');

            // Special handling for the 'Add' button as it's a button, not an anchor
            const isAddButton = item.tagName === 'BUTTON' && item.classList.contains('create-post-btn');
            const targetHref = item.getAttribute('href');
            const isCreatePostPage = currentPath.includes('post/create-post.html');

            if (isAddButton && isCreatePostPage) {
                item.classList.add('active');
            } else if (!isAddButton && targetHref && currentPath.includes(targetHref.replace('../', ''))) {
                item.classList.add('active');
            }

            // Special handling for the home page '/'
            if (currentPath === '/' || currentPath.endsWith('index.html')) {
                document.querySelector('a[href="index.html"]').classList.add('active');
            }
        });
    };

    // Set active item on page load
    setActiveNavItem();

    // Add click listener for smooth transition (optional, if using full page reloads)
    navItems.forEach(item => {
        item.addEventListener('click', (event) => {
            // Prevent default anchor behavior if it's just for active state handling, 
            // but allow navigation for actual links
            const targetHref = item.getAttribute('href');
            if (item.tagName === 'A' && targetHref && targetHref !== '#') {
                // Let the browser handle navigation
            } else {
                event.preventDefault(); // Prevent default for buttons or # links
            }
            
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // For demonstration, if not a real navigation
            // setTimeout(() => { alert(`Navigated to ${item.textContent.trim()} (simulated)`); }, 100);
        });
    });
}); 