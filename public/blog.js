document.addEventListener('DOMContentLoaded', () => {
    const blogPostsContainer = document.getElementById('blog-posts-container');

    if (!blogPostsContainer) { // Check if the element exists
        console.error("Element with ID 'blog-posts-container' not found.");
        return; // Stop execution
    }

    fetch('/api/posts')
        .then(response => {
            if (!response.ok) { // Check for HTTP errors (404, 500, etc.)
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(posts => {
            posts.forEach(post => {
                const postDiv = document.createElement('div');
                postDiv.innerHTML = `
                    <div class="img-thumbnail my-5" alt="..."><h3 class="text-center">${post.title}</h3>
                    ${post.content}<br><br><figcaption class="blockquote-footer text-end">${post.date}
  </figcaption>
  </div>
                `;
                blogPostsContainer.appendChild(postDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching or displaying blog posts:', error);
            blogPostsContainer.innerHTML = "<p>Error loading blog posts.</p>";
        });
});
