import express from 'express';
import { customMiddleware } from "../middlewares/custom.js";
import { getBookByID, createBook, deleteBook, getAllBooks } from '../controllers/book.controller.js';

const router = express.Router();

router.get('/', getAllBooks);
router.get("/:id", getBookByID);
router.post("/", createBook);
router.delete("/:id", deleteBook);

export default router;