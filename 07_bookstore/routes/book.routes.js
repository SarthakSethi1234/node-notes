const express = require('express')
const {BOOKS} = require("../db/book.js")
const { customMiddleware } = require("../middlewares/custom.js");

const router = express.Router();

router.get("/", customMiddleware, (req, res) => {
  // route level middleware
  res.setHeader("dev", "Sarthak");
  res.json(BOOKS);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const book = BOOKS.find((e) => e.id == id);
  if (!book) {
    return res.status(404).json({ error: `Book with ${id} doesn't exist` });
  }
  return res.json(BOOKS);
});

router.post("/", (req, res) => {
  const { title, author } = req.body;
  if (!title || title === "")
    return res.status(400).json({ error: "Title is required" });
  if (!author || author === "")
    return res.status(400).json({ error: "Author is required" });

  const book = {
    id: BOOKS.length + 1,
    title,
    author,
  };

  BOOKS.push(book);
  return res
    .status(201)
    .json({ message: `Book ${BOOKS.length} created succesfully` });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  console.log(typeof id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "id should be an integer" });
  }

  const indexToDelete = BOOKS.findIndex((e) => e.id == id);

  if (indexToDelete < 0) {
    return res.status(404).json({ error: "Index not found" });
  }

  BOOKS.splice(indexToDelete, 1);

  return res.status(200).json({ message: "Book deleted!" });
});

module.exports = router;