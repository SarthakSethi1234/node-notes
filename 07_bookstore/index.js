const express = require('express')

const {loggerMiddleware} = require("./middlewares/logger.js")

const bookRouter = require("./routes/book.routes.js")

const app = express()
const PORT = 8000

app.listen(PORT,() => console.log(`HTTP server is running on PORT:${PORT}`))

// Middlewares (Plugins)

app.use(express.json());
app.use(loggerMiddleware) // global middleware
app.use("/books",bookRouter);

// Routes

