const express = require('express')

const app = express()

app.get('/',function(req,res){
    res.writeHead(200).end("Homepage");
})

app.get('/contact-us',(req,res) => {
    res.writeHead(200).end("You can contact me at my email address")
})

app.get("/tweets",(req,res) => {
    res.end("Here are your tweets")
})

app.post('/tweets',(req,res)=>{
    res.writeHead(201).end('Tweet created sucessfully')
})

app.listen(8000,()=>{
    console.log("Your server is running on PORT 8000")
})


