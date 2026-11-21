
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    // Display the home page
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <h1>Welcome to My Web Application</h1>
            <p>Please log in to continue.</p>
            <a href="/login">Login</a>
        `);
    }

    // Display the login form
    else if (req.method === 'GET' && req.url === '/login') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <h2>User Login</h2>
            <form method="POST" action="/login">
                <label>Username:</label>
                <input type="text" name="username" required>
                <br><br>
                <label>Password:</label>
                <input type="password" name="password" required>
                <br><br>
                <button type="submit">Login</button>
            </form>
        `);
    }

    // Process login information
    else if (req.method === 'POST' && req.url === '/login') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const formData = new URLSearchParams(body);
            const username = formData.get('username');
            const password = formData.get('password');

            if (username === 'student' && password === '12345') {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end('<h1>Login Successful!</h1><p>Welcome, student.</p>');
            } else {
                res.writeHead(401, { 'Content-Type': 'text/html' });
                res.end('<h1>Login Failed!</h1><p>Invalid username or password.</p><a href="/login">Try again</a>');
            }
        });
    }

    // Handle unknown routes
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page Not Found');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
