import express from 'express'
import userRouter from "./rroutes/user.routes.js"
import adminRouter from "./rroutes/admin.routes.js"
import db from "./db/index.js"
import { userSessions ,usersTable } from "./db/schema.js"
import { eq } from 'drizzle-orm'
import { authMiddleware } from './middlewares/auth.middleware.js'

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(authMiddleware);

app.get('/',(req,res) => {
    return res.status(200).json({status: `Server is up and running`})
})


app.use('/user',userRouter)
app.use("/admin",adminRouter)

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
    
})