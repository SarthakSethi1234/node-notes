import { index, pgTable, varchar, uuid, text } from "drizzle-orm/pg-core";
import { sql } from 'drizzle-orm';
import { authorTable } from "./author.model.js";

export const booksTable = pgTable(
  "books",
  {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 255 }).notNull(),
    description: text(),
    authorId: uuid()
      .references(() => authorTable.id)
      .notNull(),
  },
  (table) => ({
    searchIndexOnTitle: index("search_index_on_title").using(
      "gin",
      sql`to_tsvector('english',${table.title})`
    ),
  })
);
