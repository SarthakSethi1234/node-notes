import { authorTable } from "../models/author.model.js";
import { booksTable } from "../models/books.model.js";
import db from "../db/index.js";
import { eq, ilike, sql } from "drizzle-orm";

export const getAllAuthors = async (req,res) => {
    const authors = await db.select().from(authorTable);
    return res.status(200).json(authors);
}

export const getAuthorByID = async (req,res) => {
    const { id } = req.params;
    const [author] = await db.select().from(authorTable).where(eq(authorTable.id,id))

    if(!author){
        return res.status(404).json({error:`Author with ID ${id} doesn't exist`})
    }
    return res.status(200).json(author);
}

export const createAuthor = async (req,res) => {
    const {firstName, lastName, email} = req.body;

    if(!firstName || !email){
        return res.status(400).json({error: `Please give the firstname/email of the author`})
    }

    const [author] = await db.insert(authorTable).values({
        firstName,
        lastName,
        email
    }).returning({
        id: authorTable.id
    })

    return res.status(200).json({message: `Author has been created`, id: author.id})
}

export const getAllBooksOfAuthor = async (req,res) => {
    const authorId = req.params.id;
    const books = await db.select().from(booksTable).where(eq(authorId,booksTable.authorId));

    if(!books){
        return res.status(404).json({error: "The author doenst exist or he has no books"});
    }

    return res.status(200).json(books);
}

