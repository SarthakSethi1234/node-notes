import { pgTable, varchar, uuid } from "drizzle-orm/pg-core";

export const authorTable = pgTable("authors", {
  id: uuid().primaryKey().defaultRandom(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }),
  email: varchar({length: 255}).notNull().unique(),
});
