import db from "../db/index.js";
import { userSessions, usersTable } from "../db/schema.js";
import { eq } from "drizzle-orm";

export const authMiddleware = async (req,res,next) => {
    const sessionId = req.headers["session-id"];
    if (!sessionId) {
        return next();
    }

    const [data] = await db
      .select({
        id: userSessions.id,
        userId: userSessions.userId,
        name: usersTable.name,
        email: usersTable.email,
      })
      .from(userSessions)
      .innerJoin(usersTable, eq(usersTable.id, userSessions.userId))
      .where(eq(userSessions.id, sessionId));

    if (!data) {
        return next();
    }

    req.user = data;
    next();
}
