const http = require("node:http")
const  PORT = 8000

const server = http.createServer((req,res) => {
    console.log(`Incoming request at [${Date.now()}]`)
    console.log(req.method)
    console.log(req.url)

    res.writeHead(200);
    res.end(`OK!`)
});

server.listen(PORT, ()=>{
    console.log(`Server is running on PORT:${PORT}`)
})