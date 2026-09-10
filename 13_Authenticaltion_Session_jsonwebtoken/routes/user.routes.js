import express from 'express'
import db from '../db/index.js'
import { userSessions, usersTable } from '../db/schema.js'
import { eq } from 'drizzle-orm'
import { randomBytes, createHmac } from 'node:crypto'
import jwt from 'jsonwebtoken'
import { ensureAuthenticated } from '../middlewares/auth.middlewares.js'
 
const router = express.Router();

router.get("/",ensureAuthenticated, async (req,res) => {
    const user = req.user;
    return res.status(200).json({user})
})

router.patch("/",ensureAuthenticated, async (req,res) => {
    const user = req.user;

    const name = req.body.name;

    await db.update(usersTable).set({name}).where(eq(usersTable.id, user.userId))

    return res.status(200).json({status: 'sucess'})

})

router.post('/signup', async (req,res) => {
    const { name, email, password } = req.body;

    const [existingUser] = await db.select({ email: usersTable.email }).from(usersTable).where(eq(usersTable.email,email));

    if(existingUser){
        return res.status(400).json({message: `User with email: ${email} already exists!`});
    }

    const salt = randomBytes(256).toString('hex');
    const hashedPassword = createHmac('sha256',salt).update(password).digest('hex');

    const [user] = await db.insert(usersTable).values({
        name,
        email,
        password: hashedPassword,
        salt
    }).returning({id: usersTable.id})
    
    return res.status(201).json({ "status" : `Sucess`, data: { userId: user.id }});
});

router.post('/login', async (req,res) => {
    const { email, password } = req.body;

    const [existingUser] = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        name: usersTable.name,
        salt: usersTable.salt,
        password: usersTable.password,
        role: usersTable.role
      })
      .from(usersTable)
      .where(eq(usersTable.email, email));
    
      
    if(!existingUser){
        return res.status(404).json({message: `User with this email doesn't exist`});
    }
        
    const salt = existingUser.salt;
    const existingHash = existingUser.password;

    const newHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    
    if(newHash !== existingHash){
        return res.status(400).json({ error: `Incorrect password` });
    }

    const payload = {
        userId: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        role: existingUser.role
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET)

    return res.status(200).json({message: `User logged in`, token});

});

export default router;