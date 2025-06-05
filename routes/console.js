const express = require('express');
const router = express.Router();
const fs = require('fs'); // For JSON file reading and writing
const path = require('path')


const blogPostsPath = path.join(__dirname,'data','blog_posts.json')
const packagepath = path.join(__dirname,'package.json')

// Middleware to check if user is logged in
const isLoggedIn = (req, res, next) => {
  if (req.session.user) {
    next(); // User is logged in, proceed
  } else {
      res.status(401);
    res.redirect('/auth/login'); // Redirect to login
  }
};

router.get('/', isLoggedIn, (req, res) => {
    res.status(200)
  res.render('console');
});

router.post('/create_post', isLoggedIn, (req, res) => {
    const { title, content } = req.body;
    const newPost = { title, content }; // Send *only* the new post

    fetch('https://freshbeets.dev/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errData => { // Parse JSON error message
                throw new Error(`HTTP error! Status: ${response.status}, Details: ${JSON.stringify(errData)}`);
            });
        }
        return response.json(); // Expect the *new* post back
    })
    .then(createdPost => {
        console.log('Post created successfully:', createdPost);
        // Potentially update the UI (e.g., add the new post to the list)
        res.redirect('/console'); // Redirect *after* successful API call.
    })
    .catch(error => {
        console.error('Error creating post:', error);
        // Handle the error (show message to user, etc.)
        res.status(500).send("Failed to create post."); // Important: Send error to client.
    });
});



router.post('/show_depend', isLoggedIn, (req, res) => {
      fetch('https://freshbeets.dev/api/depend')
        .then(response => {
            if (!response.ok) { // Check for HTTP errors (404, 500, etc.)
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const depContainer = document.getElementById('depend');
            data.dependencies.forEach(dep => {
                const depEle = document.createElement('div');
                depEle.innerHTML = `
                    ${dep}<br>
                `;
                depContainer.appendChild(depEle);
            });
        })
        .catch(error => {
            console.error('Error fetching or displaying blog posts:', error);
            depContainer.innerHTML = "<p>Error loading Dependancies info</p>";
        });
});


module.exports = router;
