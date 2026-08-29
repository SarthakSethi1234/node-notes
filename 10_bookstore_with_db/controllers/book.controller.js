import { booksTable } from '../models/books.model.js';
import { authorTable } from '../models/author.model.js';
import db from '../db/index.js';
import { eq, ilike,sql } from 'drizzle-orm';

export const getAllBooks = async (req, res) => {
    const search = req.query.search;

    if (search) {
        const books = await db.select().from(booksTable).where(sql`to_tsvector('english', ${booksTable.title}) @@ plainto_tsquery('english', ${search})`);
        return res.json(books);
    }

    const books = await db.select().from(booksTable);
    return res.json(books);
};

export const getBookByID = async (req, res) => {
  const id = req.params.id;
  const book = await db.select().from(booksTable).where(eq(booksTable.id, id)).leftJoin(authorTable,eq(booksTable.authorId,authorTable.id)).limit(1);
  if (!book || book.length === 0) {
    return res.status(404).json({ error: `Book with id ${id} doesn't exist` });
  }

  return res.status(200).json(book[0]);
};

export const createBook = async (req, res) => {
  const { title, authorId, description } = req.body;
  if (!title || title === "")
    return res.status(400).json({ error: "Title is required" });

  const [result] = await db.insert(booksTable).values({
    title,
    authorId,
    description
  }).returning({
    id: booksTable.id
  });

  return res
    .status(201)
    .json({ message: `Book with ID: ${result.id} created succesfully` });
};

export const deleteBook = async (req, res) => {
  const id = req.params.id;

  await db.delete(booksTable).where(eq(booksTable.id, id));

  return res.status(200).json({ message: "Book deleted!" });
};