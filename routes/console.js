const express = require('express');
const router = express.Router();
const fs = require('fs'); // For JSON file reading and writing
const path = require('path')
const multer = require('multer');


const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            // Specify the directory where files will be saved
            cb(null, path.join(__dirname,"..","public","profilepics")); 
        },
        filename: function (req, file, cb) {
            // Define the filename for the uploaded file
           cb(null, file.originalname);
        }
    });

    const upload = multer({ storage: storage });


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


router.post('/buyartwork', (req, res) => { 
    
    console.log(req.body)
    const { name,email, sty, specifications } = req.body;
    
    
    
    const buyInfo = {name , sty, specifications};
    const newPost = { email: email,  orders: [buyInfo]}; // Send *only* the new post
    console.log(newPost)
    fetch('https://freshbeets.dev/api/art', {
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
        res.redirect('https://freshbeets.dev/steven/'); // Redirect *after* successful API call.
    })
    .catch(error => {
        console.error('Error creating post:', error);
        // Handle the error (show message to user, etc.)
        res.status(500).send("Failed to create post."); // Important: Send error to client.
    });
});

router.post('/addpin',upload.single('image'),(req, res) => { 
    let starttime = new Date();
    let endtime = new Date();
    const { name,description,lat,long,hrtime,bring,dur,imgName} = req.body;
    endtime.setHours(parseInt(hrtime.slice(0,2))+parseInt(dur),parseInt(hrtime.slice(3)))
    starttime.setHours(parseInt(hrtime.slice(0,2)),parseInt(hrtime.slice(3)))
    console.log(imgName)
    const beachInfo = {description,lat,long,starttime,endtime,bring,deleted: false};
    const newPin = { name: name, image: imgName,  beachInfo: [beachInfo]}; // Send *only* the new post
    console.log(newPin)
    fetch('https://freshbeets.dev/api/beach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPin)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errData => { // Parse JSON error message
                throw new Error(`HTTP error! Status: ${response.status}, Details: ${JSON.stringify(errData)}`);
            });
        }
        return response.json(); // Expect the *new* post back
    })
    .then(createdPin => {
        console.log('Post created successfully:', createdPin);
        // Potentially update the UI (e.g., add the new post to the list)
        res.redirect('https://freshbeets.dev/beach/'); // Redirect *after* successful API call.
    })
    .catch(error => {
        console.error('Error creating post:', error);
        // Handle the error (show message to user, etc.)
        res.status(500).send("Failed to create post."); // Important: Send error to client.
    });
});


router.post('/emailsignup', (req, res) => { 
    
    console.log(req.body)
    const {email} = req.body;
    const newPost = { email: email,  orders: []};
    
    

    console.log(newPost)
    fetch('https://freshbeets.dev/api/art', {
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
        res.redirect('https://freshbeets.dev/steven/'); // Redirect *after* successful API call.
    })
    .catch(error => {
        console.error('Error creating post:', error);
        // Handle the error (show message to user, etc.)
        res.status(500).send("Failed to create post."); // Important: Send error to client.
    });
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
