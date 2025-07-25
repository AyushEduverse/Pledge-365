document.addEventListener('DOMContentLoaded', () => {
    // Get the modal elements
    const editProfileModal = document.getElementById('editProfileModal');
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    const closeButton = document.querySelector('.close-button');
    const cancelEditBtn = document.querySelector('.cancel-edit-btn');
    const editProfileForm = document.getElementById('editProfileForm');

    // Get profile display elements
    const profilePicture = document.querySelector('.profile-picture');
    const profileName = document.querySelector('.profile-name');
    const profileRole = document.querySelector('.profile-role');
    const profileBio = document.querySelector('.profile-bio');

    // Get modal input elements
    const editProfilePictureInput = document.getElementById('editProfilePicture');
    const editProfilePicturePreview = document.getElementById('editProfilePicturePreview');
    const editProfileNameInput = document.getElementById('editProfileName');
    const editProfileRoleInput = document.getElementById('editProfileRole');
    const editProfileBioInput = document.getElementById('editProfileBio');

    // Add event listener to profile picture for click to upload
    profilePicture.addEventListener('click', () => {
        editProfilePictureInput.click(); // Trigger click on hidden file input
    });

    editProfilePicturePreview.addEventListener('click', () => {
        editProfilePictureInput.click(); // Trigger click on hidden file input
    });

    // --- Initial Mock Data (will be replaced by Firebase later) ---
    let currentProfileData = {
        name: 'Ayush Gupta',
        role: '[User Role]',
        bio: '[User Bio/Description]',
        picture: '../assets/user-pic.png'
    };

    // Function to populate modal with current profile data
    function populateModal() {
        editProfileNameInput.value = currentProfileData.name;
        editProfileRoleInput.value = currentProfileData.role;
        editProfileBioInput.value = currentProfileData.bio;
        editProfilePicturePreview.src = currentProfileData.picture;
        editProfilePicturePreview.style.display = 'block';
    }

    // Function to update profile display
    function updateProfileDisplay() {
        profilePicture.src = currentProfileData.picture;
        profileName.textContent = currentProfileData.name;
        profileRole.textContent = currentProfileData.role;
        profileBio.textContent = currentProfileData.bio;
    }

    // --- Event Listeners ---

    // Open the modal
    editProfileBtn.addEventListener('click', () => {
        populateModal(); // Load current data into modal
        editProfileModal.style.display = 'flex';
    });

    // Close the modal (X button)
    closeButton.addEventListener('click', () => {
        editProfileModal.style.display = 'none';
    });

    // Close the modal (Cancel button)
    cancelEditBtn.addEventListener('click', () => {
        editProfileModal.style.display = 'none';
    });

    // Close the modal if clicked outside
    window.addEventListener('click', (event) => {
        if (event.target == editProfileModal) {
            editProfileModal.style.display = 'none';
        }
    });

    // Image preview for modal input
    editProfilePictureInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                editProfilePicturePreview.src = e.target.result;
                editProfilePicturePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            // If no file is selected (e.g., user cancels file dialog), revert to the currently displayed profile picture
            editProfilePicturePreview.src = profilePicture.src;
            editProfilePicturePreview.style.display = 'block';
        }
    });

    // Handle form submission (Save Changes)
    editProfileForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        // Update currentProfileData with new values from modal inputs
        currentProfileData.name = editProfileNameInput.value;
        currentProfileData.role = editProfileRoleInput.value;
        currentProfileData.bio = editProfileBioInput.value;

        // Update picture only if a new one was selected in the modal
        if (editProfilePictureInput.files && editProfilePictureInput.files[0]) {
            currentProfileData.picture = editProfilePicturePreview.src; // Use the preview's src as it's the new image data
        }

        updateProfileDisplay(); // Update the main profile display
        editProfileModal.style.display = 'none'; // Close the modal
        alert('Profile updated successfully (frontend only)!');

        // TODO: In a real application, this is where you would send data to Firebase Firestore
    });

    // Initial display of profile data when page loads
    updateProfileDisplay();
}); 