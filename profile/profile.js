document.addEventListener('DOMContentLoaded', () => {
    // Function to initialize profile page functionality
    function initializeProfilePage() {
        const shareButton = document.querySelector('.share-btn');

        if (shareButton) {
            shareButton.addEventListener('click', () => {
                // Replaced alert with showToast
                showToast('Share functionality would be implemented here!', 'info'); 
            });
        }
    }

    // Check if we are on the profile page by looking for a unique element
    const profileContainer = document.querySelector('.profile-container');
    if (profileContainer) {
        initializeProfilePage();
    }
}); 