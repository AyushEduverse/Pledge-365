document.addEventListener('DOMContentLoaded', () => {
    // Like Button Functionality
    document.querySelectorAll('.like-btn').forEach(button => {
        button.addEventListener('click', () => {
            const likeCountSpan = button.querySelector('.like-count');
            let currentLikes = parseInt(likeCountSpan.textContent);

            if (button.classList.contains('liked')) {
                currentLikes--;
                button.classList.remove('liked');
                button.querySelector('i').classList.remove('fas');
                button.querySelector('i').classList.add('far');
            } else {
                currentLikes++;
                button.classList.add('liked');
                button.querySelector('i').classList.remove('far');
                button.querySelector('i').classList.add('fas');
            }
            likeCountSpan.textContent = currentLikes;
        });
    });

    // Comment Button Functionality
    document.querySelectorAll('.comment-btn').forEach(button => {
        button.addEventListener('click', () => {
            const postCard = button.closest('.post-card');
            const postCommentsDiv = postCard.querySelector('.post-comments');

            // Toggle comment input area
            if (postCommentsDiv.querySelector('.comment-input-area')) {
                postCommentsDiv.innerHTML = ''; // Remove if already exists
            } else {
                postCommentsDiv.innerHTML = `
                    <div class="comment-input-area">
                        <input type="text" placeholder="Write a comment...">
                        <button class="submit-comment-btn">Post</button>
                    </div>
                `;

                // Add event listener for the new submit comment button
                postCommentsDiv.querySelector('.submit-comment-btn').addEventListener('click', (event) => {
                    const commentInput = event.target.previousElementSibling;
                    const commentText = commentInput.value.trim();

                    if (commentText) {
                        const newComment = document.createElement('p');
                        newComment.classList.add('comment-item');
                        newComment.innerHTML = `<strong>You:</strong> ${commentText}`;
                        postCommentsDiv.insertBefore(newComment, commentInput.closest('.comment-input-area'));
                        commentInput.value = ''; // Clear input
                        showToast('Comment posted!', 'success'); // Replaced alert
                    } else {
                        showToast('Comment cannot be empty.', 'error'); // New error toast
                    }
                });
            }
        });
    });
}); 