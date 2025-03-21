const express = require("express");
const {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
} = require("./book.controller");
const verifyAdminToken = require("../middleware/verifyAdminToken");
const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getSingleBook);
router.post("/create", verifyAdminToken, createBook);
router.put("/update/:id", verifyAdminToken, updateBook);
router.delete("/:id", verifyAdminToken, deleteBook);

module.exports = router;
