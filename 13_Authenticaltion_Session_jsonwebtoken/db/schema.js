import { uuid ,text, pgTable, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum('user_role',['USER','ADMIN'])

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  role: userRoleEnum().notNull().default('USER'),
  password: text().notNull(),
  salt: text().notNull(),
});

// never store passwords as plain text always hash them - use salth hashing

export const userSessions = pgTable("users_sessions", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid().references(() => usersTable.id).notNull(),
  createdAt: timestamp().defaultNow().notNull()                    // if used unique() one user can have only one session
})