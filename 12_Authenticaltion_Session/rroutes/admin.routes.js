import express from "express";
import db from "../db/index.js";
import { userSessions, usersTable } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { randomBytes, createHmac } from "node:crypto";

const router = express.Router();

router.get("/users", async (req,res) => {

    if(!req.user) {
        return res.status(401).json({error: `You must be authticated to access this`})
    }
    const users = await db.select({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email
    }).from(usersTable);
    return res.status(200).json(users);
})

export default router;
