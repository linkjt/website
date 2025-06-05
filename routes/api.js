const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');


const dependPath = path.join(__dirname, '..','package.json');
const blogPostsPath = path.join(__dirname, '..', 'data', 'blog_posts.json');
const transitPath = path.join(__dirname, '..', 'data', 'transit.json');
function readPosts() {
  try {
    const rawData = fs.readFileSync(blogPostsPath, 'utf8');
    const parsedlist = JSON.parse(rawData);
    console.log(typeof parsedlist);
    return parsedlist
  } catch (error) {
    return []; // Return empty array on error, or handle as needed
  }
}

// Function to write posts to the file
function writePosts(posts,pathz) {
  fs.writeFileSync(pathz, JSON.stringify(posts, null, 2), 'utf8');
}
router.get('/posts', (req, res) => {
    fs.readFile(blogPostsPath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading blog posts file:", err);
            return res.status(500).json({ error: "Error loading posts." }); // Send JSON error
        }

        try {
            const posts = JSON.parse(data);
            res.json(posts); // Send the posts as JSON
        } catch (parseError) {
            console.error("Error parsing blog posts JSON:", parseError);
            return res.status(500).json({ error: "Error loading posts." }); // Send JSON error
        }
        res.status(100)
    });
});
router.get('/depend', (req, res) => {
    fs.readFile(dependPath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading blog posts file:", err);
            return res.status(500).json({ error: "Error loading posts." }); // Send JSON error
        }

        try {
            const posts = JSON.parse(data);
            res.json(posts); // Send the posts as JSON
        } catch (parseError) {
            console.error("Error parsing blog posts JSON:", parseError);
            return res.status(500).json({ error: "Error loading posts." }); // Send JSON error
        }
        res.status(100)
    });
});

router.post('/posts', (req, res) => {
    const newPost = req.body; // Expect a *single* new post object

    if (!newPost.title || !newPost.content) {
        return res.status(400).json({ error: "Title and content are required" }); // 400 Bad Request
    }

    const postToAdd = {
        ...newPost,
        author: "Linkjt9", // Or get from the logged-in user
        date: new Date().toLocaleDateString()
    };

    try {
        const existingPosts = readPosts(); // Read from file
        const updatedPosts = [...existingPosts, postToAdd]; // Add the new post
        writePosts(updatedPosts,blogPostsPath); // Write to file
        res.status(201).json(postToAdd); // Send back the *newly created* post
    } catch (error) {
        console.error("Error creating post:", error);
        return res.status(500).json({ error: "Failed to create post" });
    }
});

router.get('/transit', (req, res) => {
    fs.readFile(transitPath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading blog posts file:", err);
            return res.status(500).json({ error: "Error loading posts." }); // Send JSON error
        }

        try {
            const posts = JSON.parse(data);
            res.json(posts); // Send the posts as JSON
        } catch (parseError) {
            console.error("Error parsing blog posts JSON:", parseError);
            return res.status(500).json({ error: "Error loading posts." }); // Send JSON error
        }
        res.status(100)
    });
});

// Add a route to get a single post by ID (optional but good practice)
router.get('/posts/:id', (req, res) => {
    const postId = req.params.id; // Get the ID from the URL

    fs.readFile(blogPostsPath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading blog posts file:", err);
            return res.status(500).json({ error: "Error loading posts." }); // Send JSON error
        }

        try {
            const posts = JSON.parse(data);
            const post = posts.find(p => p.id === postId); // Find the post by ID

            if (post) {
                res.json(post);
                res.status(202).json("Post Succesful");
            } else {
                res.status(404).json({ error: "Post not found." }); // 404 if not found
            }
        } catch (parseError) {
            console.error("Error parsing blog posts JSON:", parseError);
            return res.status(500).json({ error: "Error loading posts." }); // Send JSON error
        }
    });
});

module.exports = router;

