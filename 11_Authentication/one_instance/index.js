import express from 'express'

const app = express()
const PORT = 8000

app.use(express.json())

const DIARY = {}
const EMAIL = new Set();

// Hey. here is my car - Please part it and give me back a token
// email => unique car number

app.post("/signup",(req,res) => {
    const { name,email,password } = req.body
    if(EMAIL.has(email)){
        return res.status(400).json({ error: `Email already taken`})
    }

    // create a token for user
    const token = `${Date.now()}`

    // Do a entry in the diary
    DIARY[token] = {name,email,password}
    EMAIL.add(email);

    res.json({status: 'sucess', token});

});

app.get("/me",(req,res) => {
    const {token} = req.body;
    if(!token){
        return res.status(400).json({error: "Missing token"});
    }

    if(!(token in DIARY)){
        return res.status(400).json({ error: "Invalid Token" });
    }

    return res.status(200).json({data: DIARY[token]});
})

app.listen(8000,() => console.log(`Server started on PORT ${PORT}`)) 