const http = require('node:http')
const fs = require('node:fs')

const server = http.createServer((req,res) => {
    const method = req.method;
    const path = req.url;

    const log = `[${Date.now()}]: ${method} ${path}\n`
    fs.appendFileSync('log.txt',log,'utf-8');

    switch(method){
        case 'GET': {
            switch (path) {
              case "/":
                return res.writeHead(200).end("Hello from the server");
              case "/contact-us":
                return res.writeHead(200).end("Contact me at 13sarthaksethi@gmail.com");
              case "/tweet":
                return res.writeHead(200).end("Tweet\n");
            }
        }
        break;
        case 'POST': {
            switch(path){
                case '/tweet':
                    res.writeHead(201).end("Your tweet was created");
                    break
            }
        }
    }

    return res.writeHead(400).end("You're lost")
})

server.listen(8000,()=> {
    console.log("Server is running on PORT: 8000")
})