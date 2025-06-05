const fs = require('fs');
const https = require("https");
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

const app = express();
const port = 9999;
app.set('view engine','ejs');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({secret: 'susbus',resave: false, saveUninitialized: false}));
const apiRoutes = require('./routes/api')
const authRoutes = require('./routes/auth');
const consoleRoutes = require('./routes/console')
app.use('/api',apiRoutes)
app.use('/auth',authRoutes);
app.use('/console',consoleRoutes);

app.use(cors({ origin: false }));

app.get('*', (req, res, next) => {
    if (req.path.endsWith('/main') && req.path.length > 1) {
        return res.redirect(308, req.path.slice(0, -4));
    }
    if (req.path.endsWith('/') && req.path.length > 1) {
        return res.redirect(301, req.path.slice(0, -1));
    }
    if (!path.extname(req.path)) {
        
        const htmlCandidate = path.join(__dirname, 'public', req.path + '.html');
        fs.stat(htmlCandidate, (err, stat) => {
            if (!err && stat.isFile()) {
                console.log(`[${req.ip}] got ${req.path ? req.path : '/'} from ${req.hostname}`);
                res.status(200);
                return res.sendFile(htmlCandidate);
            } else {
                console.log(`[${req.ip}] got ${req.path ? req.path : '/'} from ${req.hostname}, which doesn't exist.`);
                res.status(404);
                return res.sendFile(path.join(__dirname, 'public', 'error.html'));
            }
        });
    } else {
        fs.stat(path.join(__dirname, 'public', req.path), (err, stat) => {
            if (err || !stat.isFile()) {
                console.log(`[${req.ip}] got ${req.path ? req.path : '/'} from ${req.hostname}, which doesn't exist.`);
                res.status(404);
                return res.sendFile(path.join(__dirname, 'public', 'error.html'));
            } else {
                console.log(`[${req.ip}] got ${req.path ? req.path : '/'} from ${req.hostname} which was a full path.`);
                res.status(200);
                next();
            }
        });
    }
});


app.use((err, req, res, next) => {
    if (err.code === 'ECONNRESET') {
        console.log(`Proxy error: ${err.message}`);
        console.log("502 Bad Gateway")
        return res.status(502).send('Bad Gateway');
    } else if (err.code === 'EHOSTUNREACH' || err.code === 'ENOTFOUND') {
        console.log(`Same service error: ${err.message}`);
        console.log("503 Service Unavailable")
        return res.status(503).send('Service Unavailable');
    } else {
        next(err);
    }
});

app.listen(port, () => {
    console.log(`yo, the link finna be at http://localhost:${port}/`);
});
