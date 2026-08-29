import express from "express";
import {
  getAuthorByID,
  createAuthor,
  //deleteAuthor,
  getAllBooksOfAuthor,
  getAllAuthors,
} from "../controllers/author.controller.js";

const router = express.Router();

router.get("/", getAllAuthors);
router.get("/:id", getAuthorByID);
router.get("/:id/books", getAllBooksOfAuthor);
router.post("/", createAuthor);
// router.delete("/:id", deleteAuthor);

export default router;
