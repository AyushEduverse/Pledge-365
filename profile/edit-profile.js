document.addEventListener('DOMContentLoaded', () => {
    // Elements from the edit profile form
    const editProfilePictureInput = document.getElementById('editProfilePicture');
    const editProfilePicturePreview = document.getElementById('editProfilePicturePreview');
    const editProfileNameInput = document.getElementById('editProfileName');
    const editProfileRoleInput = document.getElementById('editProfileRole');
    const editProfileBioInput = document.getElementById('editProfileBio');
    const editProfileForm = document.getElementById('editProfileForm');
    const cancelEditBtn = document.querySelector('.cancel-edit-btn');

    // Mock data (will be replaced by actual data from backend/local storage)
    let currentProfileData = {
        name: 'Ayush Gupta',
        role: '[User Role]',
        bio: '[User Bio/Description]',
        picture: '../assets/user-pic.png'
    };

    // Function to populate the form with current profile data
    function populateEditForm() {
        if (editProfileNameInput) editProfileNameInput.value = currentProfileData.name;
        if (editProfileRoleInput) editProfileRoleInput.value = currentProfileData.role;
        if (editProfileBioInput) editProfileBioInput.value = currentProfileData.bio;
        if (editProfilePicturePreview) editProfilePicturePreview.src = currentProfileData.picture;
    }

    // Handle image file selection for preview
    if (editProfilePictureInput) {
        editProfilePictureInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    if (editProfilePicturePreview) {
                        editProfilePicturePreview.src = e.target.result;
                    }
                };
                reader.readAsDataURL(file);
            } else {
                // If no file is selected (e.g., user cancels file dialog), revert to current picture
                if (editProfilePicturePreview) {
                    editProfilePicturePreview.src = currentProfileData.picture;
                }
            }
        });
    }

    // Handle form submission
    if (editProfileForm) {
        editProfileForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission

            // Update mock data with new values from form
            if (editProfileNameInput) currentProfileData.name = editProfileNameInput.value;
            if (editProfileRoleInput) currentProfileData.role = editProfileRoleInput.value;
            if (editProfileBioInput) currentProfileData.bio = editProfileBioInput.value;
            
            // Only update picture if a new one was selected
            if (editProfilePictureInput && editProfilePictureInput.files && editProfilePictureInput.files[0]) {
                if (editProfilePicturePreview) {
                    currentProfileData.picture = editProfilePicturePreview.src;
                }
            }

            showToast('Profile updated successfully!', 'success'); // Replaced alert
            // In a real application, you would send this data to a backend (e.g., Firebase)
            
            // Navigate back to profile page after saving
            window.location.href = 'profile.html';
        });
    }

    // Handle cancel button click
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', () => {
            window.location.href = 'profile.html'; // Navigate back to profile page
        });
    }

    // Initial population of the form when the page loads
    populateEditForm();

    // Enable clicking on the image preview to upload a new image
    if (editProfilePicturePreview && editProfilePictureInput) {
        editProfilePicturePreview.addEventListener('click', () => {
            editProfilePictureInput.click();
        });
    }
}); 