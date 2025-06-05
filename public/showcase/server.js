const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const cors = require('cors');



// Disable CORS

const server = http.createServer((req, res) => {
    // Get the file path from the request URL
    
    const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
            return;
        }

        // Read the file and send it as the response
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal server error');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});