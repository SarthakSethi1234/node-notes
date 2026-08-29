import express from 'express';
import 'dotenv/config';

import { loggerMiddleware } from "./middlewares/logger.js";
import bookRouter from "./routes/book.routes.js";
import authorRouter from "./routes/author.routes.js"

const app = express()
const PORT = 8000

app.listen(PORT,() => console.log(`HTTP server is running on PORT:${PORT}`))

// Middlewares (Plugins)

app.use(express.json());
app.use(loggerMiddleware) // global middleware
app.use("/books",bookRouter);
app.use("/author",authorRouter);

// Routes

