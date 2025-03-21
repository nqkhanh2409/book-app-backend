const Book = require("./book.model");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).send(books);
  } catch (error) {
    console.log("Error fetching books", error);
    res.status(500).send({ message: "Error fetching books" });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send({ message: "Book not found!" });
    }
    res.status(200).send(book);
  } catch (error) {
    console.log("Error fetching book", error);
    res.status(500).send({ message: "Error fetching book" });
  }
};

const createBook = async (req, res) => {
  try {
    const newBook = await Book({ ...req.body });
    await newBook.save();
    res.status(200).send({
      message: "Book created successfully!",
      book: newBook,
    });
  } catch (error) {
    console.log("Error creating book", error);
    res.status(500).send({ message: "Error creating book" });
  }
};

const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send({ message: "Book updated successfully!", book: updatedBook });
  } catch (error) {
    console.log("Error updating book", error);
    res.status(500).send({ message: "Error updating book" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).send({ message: "Book not found!" });
    }
    res.status(200).send({ message: "Book deleted successfully!" });
  } catch (error) {
    console.log("Error deleting book", error);
    res.status(500).send({ message: "Error deleting book" });
  }
};

module.exports = { getAllBooks, getSingleBook, createBook, updateBook, deleteBook };
