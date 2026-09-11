import express from 'express'
import { connectMongoDB } from './connection.js'
import userRouter from './routes/user.routes.js'
import 'dotenv/config'
import { isLoggedInMiddleware } from './middlewares/auth.middlewares.js'

const app = express()
const PORT = 8000

connectMongoDB(process.env.MONGODB_URI).then(() => {
    console.log('MongoDB connected');
    
}) 

app.use(express.json());
app.use(isLoggedInMiddleware)

app.use('/user',userRouter)

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))