const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const fs = require('fs'); // For JSON file reading (replace with DB later)




router.get('/login', (req, res) => {
    res.status(200)
  res.render('login');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Read user data from JSON (replace with DB query later)
  const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));

  const user = users.find(u => u.username === 'admin');

  if (user) {
    bcrypt.compare(password, user.password, (err, result) => {
      if (result && username=="admin") { // Password match
      res.status(202);
        req.session.user = user; // Store user in session
        res.redirect('/console'); // Redirect to console
      } else {
          res.status(401);
        res.render('login', { error: 'Incorrect password' });
      }
    });
  } else {
      res.status(406)
    res.render('login', { error: 'User not found' });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/auth/login');
});

module.exports = router;
