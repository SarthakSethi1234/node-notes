const http = require('http')


const server = http.createServer((req,res) => {
    console.log('I got an incoming request');
    res.writeHead(200);
    res.end("Thanks for visiting my server")
});

server.listen(8000,() => {
    console.log("Server is up and running on port 8000")
});